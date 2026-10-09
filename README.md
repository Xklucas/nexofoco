# NexoFoco

Salas de estudo colaborativo com ciclos de foco e pausa sincronizados em tempo real.

Projeto acadêmico da disciplina **INF321**, definido na entrega **F0 - Definição do Tema do Sistema Web**. Este repositório inicia o versionamento do projeto com a documentação do escopo; a implementação será desenvolvida nas próximas etapas.

## Problema e objetivo

Grupos que estudam remotamente costumam depender de cronômetros individuais e mensagens dispersas. Isso dificulta acompanhar quem está presente, em qual fase a sessão está e como as metas de cada participante estão avançando.

O NexoFoco oferecerá um ambiente web em que o grupo compartilha o mesmo ciclo de foco e pausa. O servidor será a fonte de verdade do relógio e do estado da sala: quem entrar ou se reconectar deverá receber a fase, o ciclo e o tempo restante corretos.

O público principal é formado por estudantes do ensino médio, técnico e superior. A proposta também contempla grupos de preparação para concursos, monitorias e outras equipes de estudo a distância.

## Funcionalidades previstas

1. **Cadastro e autenticação:** criação de conta, acesso seguro e identificação dos participantes.
2. **Dashboard:** salas recentes, sessões anteriores, estatísticas básicas e atalhos para criar ou acessar salas.
3. **Criação de sala:** nome, duração do foco e do intervalo, quantidade de ciclos e geração de código de acesso.
4. **Entrada por código:** acesso à sala pelo código compartilhado pelo anfitrião.
5. **Lobby:** participantes conectados, metas individuais e indicação de quem está pronto para começar.
6. **Sessão sincronizada:** mesma fase, ciclo e tempo restante para todos os participantes.
7. **Presença em tempo real:** atualização de entradas, saídas e reconexões sem recarregar a página.
8. **Metas e progresso:** registro de metas individuais e acompanhamento durante a sessão.
9. **Recuperação de conexão:** retorno ao estado atual da sala, sem reiniciar o cronômetro.
10. **Resumo e histórico:** ciclos concluídos, metas alcançadas, participantes e duração da sessão.
11. **Estatísticas:** tempo total de foco, quantidade de sessões e resultados por usuário ou sala.
12. **Isolamento de falhas:** tratamento independente das salas para preservar as demais sessões ativas.

## Telas e fluxo principal

| Tela | Finalidade |
| --- | --- |
| Acesso | Cadastrar ou autenticar o usuário. |
| Dashboard | Consultar salas, histórico e estatísticas e acessar os fluxos principais. |
| Criar ou entrar | Configurar uma nova sala ou informar um código de acesso. |
| Lobby | Definir metas, acompanhar participantes e aguardar o início pelo anfitrião. |
| Sala ao vivo | Acompanhar fase, tempo restante, ciclo, presença, metas e progresso. |
| Resumo | Consultar duração, ciclos concluídos e metas atingidas e acessar o histórico. |

**Fluxo:** acesso → dashboard → criar sala ou entrar por código → lobby → sessão sincronizada → resumo e histórico.

## Tecnologias previstas

| Camada | Tecnologias | Papel |
| --- | --- | --- |
| Interface web | Phoenix LiveView, HTML, CSS e JavaScript | Páginas e atualização da interface sem recarregamento completo. |
| Back end | Elixir e Phoenix | Autenticação, validações, permissões e regras de negócio. |
| Tempo real | Phoenix PubSub e Presence | Eventos das sessões e presença dos participantes. |
| Concorrência | GenServer, Registry e DynamicSupervisor | Processo por sala, localização e supervisão das sessões ativas. |
| Persistência | Ecto e PostgreSQL | Usuários, salas, configurações, sessões, metas, resultados e histórico. |
| Testes | ExUnit e Playwright | Regras do sistema e fluxo principal no navegador. |
| Versionamento | Git e GitHub | Código compartilhado, revisão e registro das alterações. |

## Organização do estado

Cada sala ativa será coordenada por um processo próprio. O estado vivo manterá os horários de início e término de cada fase, o ciclo e a presença dos participantes. O tempo restante será calculado pelo servidor a partir desse estado.

Os dados que precisam sobreviver ao encerramento da sessão serão persistidos no PostgreSQL. Ao concluir a sessão, seus resultados alimentarão o resumo, o histórico e as estatísticas.

## Limites do MVP

A primeira versão será centrada nas sessões coletivas sincronizadas. Áudio, vídeo, chat completo, aplicativo móvel e integrações externas ficam fora do núcleo desta entrega.

O fluxo principal deverá permitir criar uma sala, reunir participantes, executar ciclos sincronizados, recuperar uma conexão e consultar o resumo da sessão.

## Equipe

- Otávio Silva Bitencourt
- Mateus José Dias
- Lucas Carvalho de Góes

## Desenvolvimento

As instruções de instalação e execução serão adicionadas quando a aplicação Phoenix for iniciada.
