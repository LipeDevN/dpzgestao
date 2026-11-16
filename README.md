# PH Corretora

Clone estático de https://phcorretora.com.br/, capturado em 16/11/2026.
HTML, CSS e JavaScript originais, com imagens e fontes hospedadas localmente em `dist/assets`.

## Executar

Requer Node.js 18 ou mais recente. Não precisa instalar dependências para abrir o site.

```sh
npm.cmd start
```

Acesse http://localhost:4173. Para outra porta, defina a variável `PORT`.

## Estrutura

- `dist/index.html`: página completa, seções, simulador e formulário.
- `dist/shared.css`: estilos e responsividade originais.
- `dist/script.js`: simulador, navegação, FAQ, animações e formulário.
- `dist/assets/`: imagens e fontes locais.
- `assets-manifest.json`: origem dos recursos baixados.
- `scripts/serve.mjs`: servidor local sem dependências.

Os links de WhatsApp e redes sociais mantêm os destinos do site original. O formulário abre uma mensagem preenchida no WhatsApp. O envio automático para o CRM privado original foi removido: esta cópia não inclui o backend nem afirma ter registrado uma proposta no CRM.

## Verificar

```sh
npm.cmd run check
```

`scripts/verify.mjs` usa Playwright e o Chrome instalado para verificar desktop, celular e interações. Execute `npm.cmd install`, inicie o servidor e rode `node scripts/verify.mjs`. Capturas e relatório são salvos em `artifacts/`.

O menu mobile recebeu uma correção de empilhamento para que o cabeçalho não cubra o botão de fechar.
