// Resumo da sessão.
// Os dados chegam pela URL: do formulário de encerrar a sessão (sala.html) ou dos links do histórico.
// Sem dados na URL, a página continua mostrando o exemplo escrito no HTML.

const ICONE_CHECK = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
const ICONE_ALVO = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>';

// Otávio e Mateus têm uma meta cada, ainda não concluída
const METAS_DOS_OUTROS = 2;

const parametros = new URLSearchParams(window.location.search);

// Cria a linha de uma meta: check verde se foi concluída, alvo cinza se não foi
function criarItemMeta(titulo, feita) {
    const item = document.createElement("p");

    if (feita) {
        item.classList.add("finished-goal");
        item.innerHTML = ICONE_CHECK;
    } else {
        item.innerHTML = ICONE_ALVO;
    }

    const texto = document.createElement("span");
    texto.textContent = titulo;
    item.append(texto);

    return item;
}

if (parametros.get("nome") !== null) {
    document.querySelector("#resumo-nome").textContent = parametros.get("nome");
    document.querySelector("#resumo-data").textContent = parametros.get("data");

    const motivo = document.querySelector("#resumo-motivo");

    if (parametros.get("motivo") === "concluida") {
        motivo.textContent = "Sessão concluída";
    } else {
        motivo.textContent = "Sessão encerrada pelo anfitrião";
    }

    document.querySelector("#resumo-foco").textContent = formatarDuracao(Number(parametros.get("foco")));
    document.querySelector("#resumo-ciclos").textContent = parametros.get("ciclos");
    document.querySelector("#resumo-planejados").textContent = " / " + parametros.get("planejados");
    document.querySelector("#resumo-duracao").textContent = formatarDuracao(Number(parametros.get("duracao")));
    document.querySelector("#resumo-puladas").textContent = parametros.get("puladas");

    // Minhas metas: cada meta vem em um parâmetro meta_feita ou meta_pendente
    const metasFeitas = parametros.getAll("meta_feita");
    const metasPendentes = parametros.getAll("meta_pendente");
    const totalMinhasMetas = metasFeitas.length + metasPendentes.length;
    const listaMinhasMetas = document.querySelector("#minhas-metas");

    listaMinhasMetas.innerHTML = "";

    metasFeitas.forEach(function (titulo) {
        listaMinhasMetas.append(criarItemMeta(titulo, true));
    });

    metasPendentes.forEach(function (titulo) {
        listaMinhasMetas.append(criarItemMeta(titulo, false));
    });

    if (totalMinhasMetas === 0) {
        const aviso = document.createElement("p");
        aviso.classList.add("muted");
        aviso.textContent = "Nenhuma meta registrada.";
        listaMinhasMetas.append(aviso);
    }

    document.querySelector("#contagem-minhas-metas").textContent = metasFeitas.length + "/" + totalMinhasMetas;
    document.querySelector("#resumo-metas").textContent = metasFeitas.length;
    document.querySelector("#resumo-metas-total").textContent = " / " + (totalMinhasMetas + METAS_DOS_OUTROS);
}
