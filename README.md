# DPZ Gestão Integrada — pronto para Railway

HTML, CSS, JavaScript, imagens e fontes separados. O servidor Node.js não precisa de dependências externas. O Dockerfile inclui apenas o servidor e a pasta `dist`.

## Subir no Railway

1. Envie o conteúdo desta pasta (`ph-corretora-clone`) para um repositório seu no GitHub. `Dockerfile`, `railway.json`, `dist/` e `scripts/` devem estar na raiz do repositório.
2. No Railway, escolha **New Project → Deploy from GitHub repo** e selecione o repositório.
3. Aguarde o deploy. O Dockerfile define a inicialização; o servidor usa automaticamente a variável `PORT` fornecida pelo Railway.
4. Em **Settings → Networking → Public Networking**, clique em **Generate Domain** para acessar o site.

Não precisa configurar banco, volume, segredos, comando de build ou comando de start. O `railway.json` configura o healthcheck em `/` e a reinicialização em caso de falha.

Se o repositório contiver a pasta `ph-corretora-clone` dentro dele, configure o **Root Directory** do serviço como `/ph-corretora-clone` e o caminho de configuração como `/ph-corretora-clone/railway.json`.

## Rodar localmente

Na pasta do projeto, com Node.js instalado:

```sh
node scripts/serve.mjs
```

Abra http://localhost:4173. Também pode usar `npm start` (`npm.cmd start` no PowerShell com scripts bloqueados). Não é necessário instalar dependências para executar o site.

Abra o endereço servido acima para visualizar o projeto completo. `reference.html`, na pasta superior, é um arquivo separado e não faz parte do deploy.

## Estrutura

- `dist/index.html`: página principal.
- `dist/termos-de-uso.html`: termos de uso, acessíveis pelo rodapé.
- `dist/termos.css`: apresentação da página de termos.
- `dist/shared.css`: estilos e layout responsivo.
- `dist/dpz.css`: identidade visual e ajustes da DPZ.
- `dist/script.js`: seletor de serviços, menu e FAQ.
- `dist/assets/`: imagens e fontes locais.
- `scripts/serve.mjs`: servidor HTTP.
- `Dockerfile` e `railway.json`: configuração de deploy.

O conteúdo usa os dados cadastrais fornecidos para a DPZ. Não há e-mail, telefone ou WhatsApp cadastrados: a seção de contato apresenta o endereço da sede e o link para o mapa. Nenhum dado de visitante é coletado.

A identificação DPZ é uma composição tipográfica para este site, não um logotipo oficial fornecido pela empresa. A fotografia é ilustrativa, não representa a equipe da DPZ. Origem: [Unsplash](https://unsplash.com/pt-br/fotografias/um-grupo-de-pessoas-sentadas-ao-redor-de-uma-mesa-com-laptops-2S7YTrRngAU).

## Validação

`npm run check` verifica a sintaxe do JavaScript. O teste visual opcional `scripts/verify.mjs` requer `npm install`, Chrome instalado. Execute `node scripts/verify.mjs`; o teste inicia e encerra seu próprio servidor, valida desktop e celular e salva capturas em `artifacts/`.

Referências: [Dockerfile no Railway](https://docs.railway.com/builds/dockerfiles), [healthchecks](https://docs.railway.com/deployments/healthchecks) e [configuração em código](https://docs.railway.com/config-as-code/reference).

## Termos de uso

A página de termos foi adaptada ao site institucional atual, sem cadastros ou formulários, e usa a sede como endereço para correspondência. A navegação não solicita aceite nem consentimento para marketing. O texto deve passar por revisão jurídica e operacional antes da publicação, especialmente quanto ao tratamento efetivo de dados pela hospedagem e ao recebimento de solicitações.

Referência visual: https://lgpd.phng.com.br/. O conteúdo não reproduz as autorizações de crédito ou os contatos da PH. Orientações sobre titulares: https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados.
