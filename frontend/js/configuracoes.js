// Configurações: perfil e interface compacta.
// Sem back-end, as mudanças valem só enquanto esta página estiver aberta.

// Parte 1 - Perfil

const formPerfil = document.querySelector("#form-perfil");
const campoNome = document.querySelector("#nome-perfil");
const erroPerfil = document.querySelector("#erro-perfil");
const mensagemPerfil = document.querySelector("#mensagem-perfil");
const nomesNaTela = document.querySelectorAll(".perfil-nome");
const avatares = document.querySelectorAll(".perfil-avatar");
const cores = ["green", "peach", "purple", "yellow", "blue"];

formPerfil.addEventListener("submit", function (event) {
    event.preventDefault();

    if (campoNome.value.length < 2) {
        erroPerfil.textContent = "Use um nome com pelo menos 2 letras.";
        campoNome.classList.add("invalido");
        return;
    }

    erroPerfil.textContent = "";
    campoNome.classList.remove("invalido");

    // Novo nome na barra lateral e no cartão do perfil
    nomesNaTela.forEach(function (nome) {
        nome.textContent = campoNome.value;
    });

    // Nova cor nos avatares: tira todas as cores e coloca a escolhida
    const corEscolhida = document.querySelector(".color-options input:checked").value;

    avatares.forEach(function (avatar) {
        cores.forEach(function (cor) {
            avatar.classList.remove(cor);
        });
        avatar.classList.add(corEscolhida);
    });

    // Mensagem de sucesso some depois de 3 segundos
    mensagemPerfil.classList.remove("escondido");

    setTimeout(function () {
        mensagemPerfil.classList.add("escondido");
    }, 3000);
});

// Parte 2 - Interface compacta (diminui os espaçamentos da página)

const opcaoCompacta = document.querySelector("#modo-compacto");
const estruturaDaPagina = document.querySelector(".app-shell");

opcaoCompacta.addEventListener("change", function () {
    if (opcaoCompacta.checked) {
        estruturaDaPagina.classList.add("compact");
    } else {
        estruturaDaPagina.classList.remove("compact");
    }
});
