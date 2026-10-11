# NexoFoco — front-end

Salas de estudo colaborativo com ciclos de foco e pausa. Projeto da disciplina INF321 (UFV).

Grupo: Otávio Silva Bitencourt · Mateus José Dias · Lucas Carvalho de Góes

Front-end feito só com **HTML, CSS e JavaScript**, como nas aulas da Unidade 2. Não tem servidor, framework,
instalação nem etapa de build.

## Como abrir

Dê dois cliques em `index.html`. Para pular o login, use **Explorar demonstração**.

## Arquivos

```
index.html          Acesso: entrar ou criar conta
dashboard.html      Visão geral: atalhos, estatísticas, salas e sessões recentes
salas.html          Minhas salas, com filtro e busca
criar.html          Criar sala: nome, tema, tempos e ciclos, com prévia
entrar.html         Entrar em uma sala pelo código
sala.html           Sala: lobby (metas e "Estou pronto") e sessão ao vivo com o cronômetro
resumo.html         Resumo de uma sessão encerrada
historico.html      Histórico de sessões, com busca e filtro por período
estatisticas.html   Estatísticas de foco
configuracoes.html  Perfil e preferências

css/style.css       Uma folha de estilos para todas as páginas
js/comum.js         Menu no celular, janela de ajuda e funções de formatação (todas as páginas internas)
js/<página>.js      Comportamento de cada página (acesso.js é o da index.html)
assets/             Ilustração e ícone da aba
```

Cada página carrega seus scripts no fim do `<body>`: primeiro `comum.js`, depois o script da página.

## Como as páginas trocam dados

Como não há back-end, os dados passam de uma página para outra pelos **formulários**:

| De | Para | Como |
|---|---|---|
| Acesso | `dashboard.html` | `<form method="post">`: só é enviado se a validação passar |
| Entrar com código | `sala.html?codigo=NX4K7Q` | `<form method="get">` |
| Criar sala | `sala.html?nome=...&foco=...&ciclos=...` | `<form method="get">` com os campos da sala |
| Encerrar sessão | `resumo.html?nome=...&foco=...` | `<form method="get">` com campos `hidden` preenchidos pelo JS |
| Histórico | `resumo.html?...` | links com os dados de cada sessão |

`sala.js` e `resumo.js` leem esses dados da URL com `URLSearchParams`. Na versão com Phoenix, quem vai receber
esses formulários é o servidor.

## O que é simulado

- Salas, sessões, participantes e estatísticas são dados de exemplo escritos no HTML.
- Otávio e Mateus aparecem sempre presentes e prontos. A presença em tempo real depende do back-end (Phoenix).
- Contas, salas novas e mudanças no perfil não ficam salvas: valem só enquanto a página estiver aberta.
- Códigos que funcionam em "Entrar com código": `NX4K7Q`, `ED5B9T` e `LC2W8M`.
- Para ver a troca de fases sem esperar 25 minutos, crie uma sala com 1 minuto de foco e 1 de intervalo.

## Conteúdo das aulas usado

- **HTML:** estrutura semântica (`header`, `nav`, `main`, `section`, `aside`), formulários com `label`, `action`
  e `method`, listas, imagens com `alt`, `lang="pt-BR"`, `meta viewport` e favicon.
- **CSS:** arquivo externo, seletores de classe, id e descendente, box model, `flex`, `grid`, pseudo-classes
  (`:hover`, `:focus`, `:checked`, `:disabled`) e `@media` para celular.
- **JavaScript:** `const`/`let`, `if`/`else`, `for`, funções, `querySelector`/`querySelectorAll`, `textContent`,
  `innerHTML`, `classList` (`add`, `remove`, `toggle`, `contains`), `style`, eventos (`click`, `submit`, `keyup`,
  `change`, `input`), `preventDefault`, `.value`, `createElement` + `append`, `forEach` e `filter`.

Coisas que não apareceram nos slides, mas foram necessárias:

- `setInterval` / `clearInterval`: rodam o cronômetro a cada segundo (parecido com o `setTimeout` da Atividade 3).
- `URLSearchParams`: lê os dados que os formulários GET colocam na URL.
- `Math.floor` (arredondar minutos), `Math.random` (sortear o código da sala nova), `push` (acrescentar uma meta
  à lista), `toUpperCase` e `prepend` (como o `append`, mas coloca o item no começo).
- Ícones em SVG escritos direto no HTML. Arquivos `.svg` externos com `<use>` não carregam quando a página é
  aberta por duplo clique.
