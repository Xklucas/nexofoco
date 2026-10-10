// Histórico: busca pelo nome da sala e filtro por período.

const campoBusca = document.querySelector("#busca-sessao");
const campoPeriodo = document.querySelector("#periodo");
const sessoes = document.querySelectorAll(".session-row");
const contagemSessoes = document.querySelector("#contagem-sessoes");
const avisoVazio = document.querySelector("#historico-vazio");

function filtrarSessoes() {
    const termo = campoBusca.value.toLowerCase();
    const periodo = campoPeriodo.value; // "todas", "ultimos-7" ou "ultimos-30"
    let visiveis = 0;

    sessoes.forEach(function (sessao) {
        const nome = sessao.querySelector(".session-info strong").textContent.toLowerCase();

        const passaNaBusca = nome.includes(termo);
        const passaNoPeriodo = periodo === "todas" || sessao.classList.contains(periodo);

        if (passaNaBusca && passaNoPeriodo) {
            sessao.classList.remove("escondido");
            visiveis++;
        } else {
            sessao.classList.add("escondido");
        }
    });

    if (visiveis === 1) {
        contagemSessoes.textContent = "1 sessão";
    } else {
        contagemSessoes.textContent = visiveis + " sessões";
    }

    if (visiveis === 0) {
        avisoVazio.classList.remove("escondido");
    } else {
        avisoVazio.classList.add("escondido");
    }
}

campoBusca.addEventListener("keyup", filtrarSessoes);
campoPeriodo.addEventListener("change", filtrarSessoes);
