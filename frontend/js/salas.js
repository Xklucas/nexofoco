// Minhas salas: filtro por situação e busca por nome ou tema.

const botoesFiltro = document.querySelectorAll(".filter-tabs button");
const campoBusca = document.querySelector("#busca-sala");
const cartoes = document.querySelectorAll(".room-card");
const avisoVazio = document.querySelector("#salas-vazio");

// Classe que o cartão precisa ter para aparecer ("todas" mostra qualquer cartão)
let filtro = "todas";

function filtrarSalas() {
    const termo = campoBusca.value.toLowerCase();
    let visiveis = 0;

    cartoes.forEach(function (cartao) {
        const nome = cartao.querySelector("h3").textContent.toLowerCase();
        const tema = cartao.querySelector(".room-subject").textContent.toLowerCase();

        const passaNaBusca = nome.includes(termo) || tema.includes(termo);
        const passaNoFiltro = filtro === "todas" || cartao.classList.contains(filtro);

        if (passaNaBusca && passaNoFiltro) {
            cartao.classList.remove("escondido");
            visiveis++;
        } else {
            cartao.classList.add("escondido");
        }
    });

    if (visiveis === 0) {
        avisoVazio.classList.remove("escondido");
    } else {
        avisoVazio.classList.add("escondido");
    }
}

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        botoesFiltro.forEach(function (outro) {
            outro.classList.remove("selected");
        });
        botao.classList.add("selected");

        filtro = botao.value;
        filtrarSalas();
    });
});

campoBusca.addEventListener("keyup", filtrarSalas);
