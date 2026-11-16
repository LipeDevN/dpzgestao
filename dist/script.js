const nav = document.getElementById('mainNav');
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('mobileMenu');
const close = document.getElementById('mobileClose');
const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 50);
window.addEventListener('scroll', updateNav, {passive:true});
updateNav();
function setMenu(open) {
  menu.inert = !open;
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) close.focus();
  else toggle.focus({preventScroll:true});
}
toggle.addEventListener('click', () => setMenu(true));
close.addEventListener('click', () => setMenu(false));
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown', event=>{
  if (!menu.classList.contains('open')) return;
  if(event.key==='Escape') setMenu(false);
  if(event.key==='Tab') {
    const focusable=[...menu.querySelectorAll('a,button')];
    const first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }
});
window.addEventListener('resize',()=>{if(innerWidth>1024&&menu.classList.contains('open'))setMenu(false)});
const reveals=document.querySelectorAll('.ph-reveal');
if ('IntersectionObserver' in window) {
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:0.08});
  reveals.forEach(el=>observer.observe(el));
} else reveals.forEach(el=>el.classList.add('visible'));
const services={
  rh:{label:'PESSOAS NO CENTRO DA OPERAÇÃO',title:'Gestão de recursos humanos',name:'Recursos humanos',focus:'Pessoas e operação',description:'Fornecimento e gestão de recursos humanos para terceiros, conectando as necessidades da empresa à organização de sua operação.',items:['Fornecimento de recursos humanos','Gestão de profissionais para terceiros','Apoio à organização da operação']},
  administrativo:{label:'ORGANIZAÇÃO NO DIA A DIA',title:'Apoio administrativo',name:'Administrativo',focus:'Documentos e rotinas',description:'Preparação de documentos e serviços administrativos para apoiar a organização das atividades da empresa.',items:['Preparação de documentos','Serviços de apoio administrativo','Organização de rotinas e informações']},
  consultoria:{label:'INFORMAÇÕES QUE APOIAM A GESTÃO',title:'Consultoria e auditoria',name:'Consultoria',focus:'Contábil e tributário',description:'Consultoria e auditoria contábil e tributária como frentes de apoio à análise e à organização das informações do negócio.',items:['Consultoria contábil','Consultoria tributária','Auditoria contábil e tributária']}
};
const tabs=[...document.querySelectorAll('[data-service]')];
function selectService(tab) {
  const service=services[tab.dataset.service];
  tabs.forEach(el=>{const selected=el===tab;el.classList.toggle('active',selected);el.setAttribute('aria-selected',String(selected));el.tabIndex=selected?0:-1});
  document.getElementById('servicePanel').setAttribute('aria-labelledby',tab.id);
  for(const [id,value] of Object.entries({serviceLabel:service.label,serviceTitle:service.title,serviceDescription:service.description,selectedService:service.name,selectedFocus:service.focus}))document.getElementById(id).textContent=value;
  document.getElementById('serviceItems').replaceChildren(...service.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectService(tab));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();tabs[next].focus();selectService(tabs[next])}
  });
});
document.querySelectorAll('.ph-faq-question').forEach(button=>button.addEventListener('click',()=>{
  const shouldOpen=button.getAttribute('aria-expanded')!=='true';
  document.querySelectorAll('.ph-faq-question').forEach(other=>{
    const open=other===button&&shouldOpen;
    other.setAttribute('aria-expanded',String(open));
    const answer=document.getElementById(other.getAttribute('aria-controls'));
    answer.inert=!open;
    answer.style.maxHeight=open?answer.scrollHeight+'px':'0';
    other.closest('.ph-faq-item').classList.toggle('active',open);
  });
}));
window.addEventListener('resize',()=>document.querySelectorAll('.ph-faq-item.active .ph-faq-answer').forEach(answer=>answer.style.maxHeight=answer.scrollHeight+'px'));
