// Sala de estudo: lobby (antes de começar) e sessão ao vivo com o cronômetro de foco e intervalo.

// Desenhos (SVG) dos ícones que o JavaScript cria. São os mesmos usados no HTML.
const ICONE_CHECK = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
const ICONE_LIXEIRA = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M8 6V3h8v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/></svg>';

// Parte 1 - Qual sala abrir

// Salas de exemplo (as mesmas dos cartões em salas.html)
const salas = [
    { codigo: "NX4K7Q", nome: "Revisão de Cálculo II", tema: "Matemática", foco: 25, intervalo: 5, ciclos: 4, meta: "Resolver a lista de integrais" },
    { codigo: "ED5B9T", nome: "Estruturas de Dados", tema: "Computação", foco: 50, intervalo: 10, ciclos: 3, meta: "Revisar árvores e grafos" },
    { codigo: "LC2W8M", nome: "Leitura & café", tema: "Leitura", foco: 45, intervalo: 10, ciclos: 2, meta: "Ler 20 páginas" }
];

// Os dados da sala chegam pela URL, enviados pelos formulários com method="get":
//   sala.html?codigo=NX4K7Q                                    → "Entrar com código" ou cartão de uma sala
//   sala.html?nome=...&tema=...&foco=...&intervalo=...&ciclos=... → formulário "Criar sala"
const parametros = new URLSearchParams(window.location.search);

let sala = salas[0];

salas.forEach(function (salaDaLista) {
    if (salaDaLista.codigo === parametros.get("codigo")) {
        sala = salaDaLista;
    }
});

if (parametros.get("nome") !== null) {
    sala = {
        codigo: gerarCodigo(),
        nome: parametros.get("nome"),
        tema: parametros.get("tema"),
        foco: Number(parametros.get("foco")),
        intervalo: Number(parametros.get("intervalo")),
        ciclos: Number(parametros.get("ciclos")),
        meta: ""
    };
}

// Código de convite: 6 letras ou números sorteados (sem I, O, 0 e 1, que se confundem)
function gerarCodigo() {
    const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let codigo = "";

    for (let i = 0; i < 6; i++) {
        const posicao = Math.floor(Math.random() * caracteres.length);
        codigo = codigo + caracteres[posicao];
    }

    return codigo;
}

document.querySelector("#nome-sala").textContent = sala.nome;
document.querySelector("#tema-sala").textContent = sala.tema;
document.querySelector("#codigo-sala").textContent = sala.codigo;
document.querySelector("#codigo-convite").textContent = sala.codigo;
document.querySelector("#config-foco").textContent = sala.foco + " min";
document.querySelector("#config-intervalo").textContent = sala.intervalo + " min";
document.querySelector("#config-ciclos").textContent = sala.ciclos;

// Parte 2 - Minhas metas (a mesma lista aparece no lobby e na sessão ao vivo)

let metas = [];

if (sala.meta !== "") {
    metas.push({ titulo: sala.meta, feita: false });
}

// Otávio e Mateus têm uma meta cada, ainda não concluída
const METAS_DOS_OUTROS = 2;

const listaMetasLobby = document.querySelector("#metas-lobby");
const listaMetasAoVivo = document.querySelector("#metas-ao-vivo");
const contagensMetas = document.querySelectorAll(".contagem-metas");
const barraMetas = document.querySelector("#barra-metas");
const legendaMetas = document.querySelector("#legenda-metas");
const meuPapel = document.querySelector("#meu-papel");
const metasGrupo = document.querySelector("#metas-grupo");

// Cria a linha de uma meta: caixa de marcar, título e (no lobby) botão de remover
function criarLinhaMeta(meta, podeRemover) {
    const linha = document.createElement("div");
    linha.classList.add("goal-row");

    if (meta.feita) {
        linha.classList.add("done");
    }

    const rotulo = document.createElement("label");
    const caixa = document.createElement("input");
    caixa.type = "checkbox";
    caixa.checked = meta.feita;

    const titulo = document.createElement("span");
    titulo.textContent = meta.titulo;

    rotulo.append(caixa);
    rotulo.append(titulo);
    linha.append(rotulo);

    caixa.addEventListener("change", function () {
        meta.feita = caixa.checked;

        // Só aparece no quadro "Atividade" se a sessão já tiver começado
        if (meta.feita && cronometro !== null) {
            registrarAtividade("Lucas Góes concluiu uma meta.");
        }

        mostrarMetas();
    });

    if (podeRemover) {
        const botaoRemover = document.createElement("button");
        botaoRemover.classList.add("icon-btn");
        botaoRemover.setAttribute("aria-label", "Remover meta");
        botaoRemover.innerHTML = ICONE_LIXEIRA;

        botaoRemover.addEventListener("click", function () {
            metas = metas.filter(function (outraMeta) {
                return outraMeta !== meta;
            });
            mostrarMetas();
        });

        linha.append(botaoRemover);
    }

    return linha;
}

function criarAvisoSemMetas() {
    const aviso = document.createElement("p");
    aviso.classList.add("goals-empty");
    aviso.textContent = "Nenhuma meta ainda.";
    return aviso;
}

// Desenha as duas listas de metas e atualiza os contadores
function mostrarMetas() {
    listaMetasLobby.innerHTML = "";
    listaMetasAoVivo.innerHTML = "";

    let feitas = 0;

    metas.forEach(function (meta) {
        if (meta.feita) {
            feitas++;
        }
        listaMetasLobby.append(criarLinhaMeta(meta, true));
        listaMetasAoVivo.append(criarLinhaMeta(meta, false));
    });

    if (metas.length === 0) {
        listaMetasLobby.append(criarAvisoSemMetas());
        listaMetasAoVivo.append(criarAvisoSemMetas());
    }

    contagensMetas.forEach(function (contagem) {
        contagem.textContent = feitas + "/" + metas.length;
    });

    if (metas.length > 0) {
        barraMetas.style.width = (feitas / metas.length * 100) + "%";
    } else {
        barraMetas.style.width = "0%";
    }

    legendaMetas.textContent = feitas + " de " + metas.length + " metas concluídas";
    meuPapel.textContent = "Anfitrião · " + feitas + "/" + metas.length + " metas";
    metasGrupo.textContent = feitas + " / " + (metas.length + METAS_DOS_OUTROS);
}

// Formulários "Adicionar uma meta" (um no lobby e outro na sessão ao vivo)
function prepararFormularioMeta(formulario, campo, erro) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        if (campo.value === "") {
            erro.textContent = "Escreva a meta antes de adicionar.";
            campo.classList.add("invalido");
            return;
        }

        erro.textContent = "";
        campo.classList.remove("invalido");
        metas.push({ titulo: campo.value, feita: false });
        campo.value = "";
        mostrarMetas();
    });
}

prepararFormularioMeta(document.querySelector("#form-meta-lobby"), document.querySelector("#nova-meta-lobby"), document.querySelector("#erro-meta-lobby"));
prepararFormularioMeta(document.querySelector("#form-meta-ao-vivo"), document.querySelector("#nova-meta-ao-vivo"), document.querySelector("#erro-meta-ao-vivo"));

mostrarMetas();

// Parte 3 - "Estou pronto": o anfitrião só pode começar quando todos estiverem prontos

const botaoPronto = document.querySelector("#botao-pronto");
const textoPronto = document.querySelector("#texto-pronto");
const meuStatus = document.querySelector("#meu-status");
const contagemProntos = document.querySelector("#contagem-prontos");
const botaoComecar = document.querySelector("#botao-comecar");

let estouPronto = false;

botaoPronto.addEventListener("click", function () {
    estouPronto = !estouPronto;

    botaoPronto.classList.toggle("btn-primary");
    botaoPronto.classList.toggle("btn-soft");
    meuStatus.classList.toggle("peach");
    meuStatus.classList.toggle("green");

    if (estouPronto) {
        textoPronto.textContent = "Pronto";
        meuStatus.textContent = "Pronto";
        contagemProntos.textContent = "3 de 3 pessoas prontas";
        botaoComecar.disabled = false;
    } else {
        textoPronto.textContent = "Estou pronto";
        meuStatus.textContent = "Preparando";
        contagemProntos.textContent = "2 de 3 pessoas prontas";
        botaoComecar.disabled = true;
    }
});

// Parte 4 - Cronômetro da sessão

const telaLobby = document.querySelector("#tela-lobby");
const rodapeLobby = document.querySelector("#rodape-lobby");
const telaAoVivo = document.querySelector("#tela-ao-vivo");
const rodapeAoVivo = document.querySelector("#rodape-ao-vivo");

const relogio = document.querySelector("#relogio");
const anel = document.querySelector("#anel");
const faseRelogio = document.querySelector("#fase-relogio");
const textoFase = document.querySelector("#texto-fase");
const iconeFoco = document.querySelector("#icone-foco");
const iconeIntervalo = document.querySelector("#icone-intervalo");
const textoCiclo = document.querySelector("#texto-ciclo");
const bolinhasCiclos = document.querySelector("#bolinhas-ciclos");
const controles = document.querySelector("#controles");
const listaAtividades = document.querySelector("#lista-atividades");

// Comprimento da borda do anel (2 × 3,14 × raio 143). É usado para "esvaziar" o anel com o tempo.
const CIRCUNFERENCIA = 898.5;

let fase = "foco"; // "foco" ou "intervalo"
let cicloAtual = 1;
let segundosRestantes = sala.foco * 60;
let pausado = false;
let cronometro = null;

// Números guardados para o resumo da sessão
let segundosDeFoco = 0;
let segundosDeSessao = 0;
let ciclosConcluidos = 0;
let fasesPuladas = 0;

function duracaoDaFase() {
    if (fase === "foco") {
        return sala.foco * 60;
    }
    return sala.intervalo * 60;
}

// 1500 segundos → "25:00"
function formatarRelogio(segundos) {
    const minutos = Math.floor(segundos / 60);
    return doisDigitos(minutos) + ":" + doisDigitos(segundos % 60);
}

function mostrarRelogio() {
    relogio.textContent = formatarRelogio(segundosRestantes);

    const parteQueFalta = segundosRestantes / duracaoDaFase();
    anel.style.strokeDashoffset = CIRCUNFERENCIA * (1 - parteQueFalta);
}

// Atualiza cores, textos e bolinhas de acordo com a fase e o ciclo atuais
function mostrarFase() {
    if (fase === "foco") {
        telaAoVivo.classList.remove("on-break");
        iconeFoco.classList.remove("escondido");
        iconeIntervalo.classList.add("escondido");
        faseRelogio.textContent = "FOCO";
        textoFase.textContent = "Foco";
    } else {
        telaAoVivo.classList.add("on-break");
        iconeFoco.classList.add("escondido");
        iconeIntervalo.classList.remove("escondido");
        faseRelogio.textContent = "PAUSA";
        textoFase.textContent = "Intervalo";
    }

    if (pausado) {
        textoFase.textContent = "Pausado";
    }

    textoCiclo.textContent = "Ciclo " + cicloAtual + " de " + sala.ciclos;

    // Uma bolinha por ciclo: concluída (com check), atual ou futura
    bolinhasCiclos.innerHTML = "";

    for (let i = 1; i <= sala.ciclos; i++) {
        const bolinha = document.createElement("span");

        if (i < cicloAtual) {
            bolinha.classList.add("complete");
            bolinha.innerHTML = ICONE_CHECK;
        } else {
            bolinha.textContent = i;
        }

        if (i === cicloAtual) {
            bolinha.classList.add("current");
        }

        bolinhasCiclos.append(bolinha);
    }
}

// Coloca um acontecimento no topo do quadro "Atividade"
function registrarAtividade(mensagem) {
    const item = document.createElement("p");

    const ponto = document.createElement("i");
    ponto.classList.add("dot", "green");

    const texto = document.createElement("span");
    texto.textContent = mensagem;

    const momento = document.createElement("small");
    momento.textContent = "aos " + formatarRelogio(segundosDeSessao) + " de sessão";

    texto.append(momento);
    item.append(ponto);
    item.append(texto);
    listaAtividades.prepend(item);
}

// Passa para a próxima fase: foco → intervalo → foco do próximo ciclo...
function avancarFase() {
    if (fase === "foco" && cicloAtual === sala.ciclos) {
        concluirSessao();
        return;
    }

    if (fase === "foco") {
        fase = "intervalo";
        registrarAtividade("Intervalo iniciado.");
    } else {
        fase = "foco";
        cicloAtual++;
        registrarAtividade("Ciclo " + cicloAtual + " iniciado.");
    }

    segundosRestantes = duracaoDaFase();
    mostrarFase();
    mostrarRelogio();
}

// Executada a cada 1 segundo pelo setInterval
function contarSegundo() {
    segundosDeSessao++;

    if (pausado) {
        return;
    }

    segundosRestantes--;

    if (fase === "foco") {
        segundosDeFoco++;
    }

    if (segundosRestantes === 0) {
        if (fase === "foco") {
            ciclosConcluidos++;
        }
        avancarFase();
    } else {
        mostrarRelogio();
    }
}

// "Começar a sessão": troca o lobby pela sessão ao vivo e liga o cronômetro
botaoComecar.addEventListener("click", function () {
    telaLobby.classList.add("escondido");
    rodapeLobby.classList.add("escondido");
    telaAoVivo.classList.remove("escondido");
    rodapeAoVivo.classList.remove("escondido");

    registrarAtividade("Sessão iniciada.");
    mostrarFase();
    mostrarRelogio();
    cronometro = setInterval(contarSegundo, 1000);
});

// Parte 5 - Pausar, pular fase e encerrar

const botaoPausar = document.querySelector("#botao-pausar");
const iconePausar = document.querySelector("#icone-pausar");
const iconeRetomar = document.querySelector("#icone-retomar");
const textoPausar = document.querySelector("#texto-pausar");

botaoPausar.addEventListener("click", function () {
    pausado = !pausado;

    iconePausar.classList.toggle("escondido");
    iconeRetomar.classList.toggle("escondido");

    if (pausado) {
        textoPausar.textContent = "Retomar";
        registrarAtividade("Relógio pausado.");
    } else {
        textoPausar.textContent = "Pausar";
        registrarAtividade("Relógio retomado.");
    }

    mostrarFase();
});

const janelaPular = document.querySelector("#modal-pular");

document.querySelector("#botao-pular").addEventListener("click", function () {
    abrirJanela(janelaPular);
});

document.querySelector("#confirmar-pular").addEventListener("click", function () {
    fecharJanelas();
    fasesPuladas++;
    avancarFase();
});

const janelaEncerrar = document.querySelector("#modal-encerrar");
const formResumo = document.querySelector("#form-resumo");

document.querySelector("#botao-encerrar").addEventListener("click", function () {
    abrirJanela(janelaEncerrar);
});

// Quando todos os ciclos terminam, o cronômetro para e a janela de encerrar aparece sozinha
function concluirSessao() {
    clearInterval(cronometro);
    segundosRestantes = 0;
    mostrarRelogio();

    textoFase.textContent = "Concluída";
    controles.classList.add("escondido");
    registrarAtividade("Ciclos concluídos.");

    document.querySelector("#resumo-motivo").value = "concluida";
    document.querySelector("#titulo-encerrar").textContent = "Sessão concluída!";
    document.querySelector("#texto-encerrar").textContent = "Todos os ciclos terminaram. Salve o resultado no histórico do grupo.";
    abrirJanela(janelaEncerrar);
}

// Antes de ir para resumo.html, os campos invisíveis do formulário recebem os resultados
formResumo.addEventListener("submit", function () {
    clearInterval(cronometro);

    document.querySelector("#resumo-nome").value = sala.nome;
    document.querySelector("#resumo-foco").value = segundosDeFoco;
    document.querySelector("#resumo-duracao").value = segundosDeSessao;
    document.querySelector("#resumo-ciclos").value = ciclosConcluidos;
    document.querySelector("#resumo-planejados").value = sala.ciclos;
    document.querySelector("#resumo-puladas").value = fasesPuladas;

    // Uma meta = um campo invisível. O nome do campo diz se ela foi concluída.
    metas.forEach(function (meta) {
        const campo = document.createElement("input");
        campo.type = "hidden";
        campo.value = meta.titulo;

        if (meta.feita) {
            campo.name = "meta_feita";
        } else {
            campo.name = "meta_pendente";
        }

        formResumo.append(campo);
    });
});

// Parte 6 - Sair da sala

const janelaSair = document.querySelector("#modal-sair");
const botoesSair = document.querySelectorAll(".botao-sair");

botoesSair.forEach(function (botao) {
    botao.addEventListener("click", function () {
        abrirJanela(janelaSair);
    });
});
