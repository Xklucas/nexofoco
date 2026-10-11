// Tela de acesso: entrar ou criar conta.

// Parte 1 - Abas "Entrar" e "Criar conta"

const abaEntrar = document.querySelector("#aba-entrar");
const abaCriar = document.querySelector("#aba-criar");
const campoNomeCompleto = document.querySelector("#campo-nome");
const opcaoLembrar = document.querySelector("#lembrar");
const textoBotao = document.querySelector("#texto-botao");

let modo = "entrar";

abaEntrar.addEventListener("click", function () {
    modo = "entrar";
    abaEntrar.classList.add("selected");
    abaCriar.classList.remove("selected");
    campoNomeCompleto.classList.add("escondido");
    opcaoLembrar.classList.remove("escondido");
    textoBotao.textContent = "Entrar";
});

abaCriar.addEventListener("click", function () {
    modo = "criar";
    abaCriar.classList.add("selected");
    abaEntrar.classList.remove("selected");
    campoNomeCompleto.classList.remove("escondido");
    opcaoLembrar.classList.add("escondido");
    textoBotao.textContent = "Criar conta";
});

// Parte 2 - Mostrar ou esconder a senha

const campoSenha = document.querySelector("#senha");
const botaoMostrarSenha = document.querySelector("#mostrar-senha");

botaoMostrarSenha.addEventListener("click", function () {
    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        botaoMostrarSenha.setAttribute("aria-label", "Ocultar senha");
    } else {
        campoSenha.type = "password";
        botaoMostrarSenha.setAttribute("aria-label", "Mostrar senha");
    }
});

// Parte 3 - Validação do formulário

const formAcesso = document.querySelector("#form-acesso");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const erroNome = document.querySelector("#erro-nome");
const erroEmail = document.querySelector("#erro-email");
const erroSenha = document.querySelector("#erro-senha");

// Mostra a mensagem de erro do campo. Mensagem vazia = campo correto.
function marcarCampo(campo, erro, mensagem) {
    erro.textContent = mensagem;

    if (mensagem === "") {
        campo.classList.remove("invalido");
        return true;
    }

    campo.classList.add("invalido");
    return false;
}

formAcesso.addEventListener("submit", function (event) {
    let mensagemNome = "";
    let mensagemEmail = "";
    let mensagemSenha = "";

    if (modo === "criar" && campoNome.value === "") {
        mensagemNome = "Informe o seu nome.";
    }

    if (campoEmail.value === "") {
        mensagemEmail = "Informe o seu e-mail.";
    } else if (!campoEmail.value.includes("@")) {
        mensagemEmail = "Informe um e-mail válido.";
    }

    if (campoSenha.value.length < 8) {
        mensagemSenha = "A senha deve ter pelo menos 8 caracteres.";
    }

    const nomeOk = marcarCampo(campoNome, erroNome, mensagemNome);
    const emailOk = marcarCampo(campoEmail, erroEmail, mensagemEmail);
    const senhaOk = marcarCampo(campoSenha, erroSenha, mensagemSenha);

    // Com algum erro, o envio é cancelado. Sem erros, o navegador abre o dashboard.html (action do formulário).
    if (!nomeOk || !emailOk || !senhaOk) {
        event.preventDefault();
    }
});
