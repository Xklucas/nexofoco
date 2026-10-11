// Comportamentos comuns a todas as páginas que têm a barra lateral.
// Este arquivo é carregado antes do script próprio de cada página.

// Menu da barra lateral no celular

const barraLateral = document.querySelector("#sidebar");
const botaoMenu = document.querySelector("#botao-menu");
const conteudo = document.querySelector("main");

botaoMenu.addEventListener("click", function () {
    barraLateral.classList.toggle("open");
});

// Clicar no conteúdo da página fecha o menu
conteudo.addEventListener("click", function () {
    barraLateral.classList.remove("open");
});

// Janelas (modais): aparecem ao remover a classe "escondido"

const janelas = document.querySelectorAll(".modal");
const botoesFechar = document.querySelectorAll(".fechar-modal");

function abrirJanela(janela) {
    janela.classList.remove("escondido");
}

function fecharJanelas() {
    janelas.forEach(function (janela) {
        janela.classList.add("escondido");
    });
}

botoesFechar.forEach(function (botao) {
    botao.addEventListener("click", fecharJanelas);
});

// Janela "Ajuda e sobre"

const botaoAjuda = document.querySelector("#botao-ajuda");
const janelaAjuda = document.querySelector("#modal-ajuda");

botaoAjuda.addEventListener("click", function () {
    barraLateral.classList.remove("open");
    abrirJanela(janelaAjuda);
});

// Funções de formatação usadas por várias páginas

// Coloca um zero na frente dos números menores que 10: 5 → "05"
function doisDigitos(numero) {
    if (numero < 10) {
        return "0" + numero;
    }
    return "" + numero;
}

// Transforma segundos em texto: 40 → "40 s", 1500 → "25 min", 6000 → "1h 40min"
function formatarDuracao(segundos) {
    if (segundos < 60) {
        return segundos + " s";
    }

    const minutos = Math.floor(segundos / 60);

    if (minutos < 60) {
        return minutos + " min";
    }

    const horas = Math.floor(minutos / 60);
    return horas + "h " + doisDigitos(minutos % 60) + "min";
}
