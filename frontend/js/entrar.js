// Formulário "Entrar com código" (usado no dashboard.html e no entrar.html).

const formCodigo = document.querySelector("#form-codigo");
const campoCodigo = document.querySelector("#codigo");
const erroCodigo = document.querySelector("#erro-codigo");

// Códigos das salas de exemplo (os mesmos usados em sala.js)
const codigosExistentes = ["NX4K7Q", "ED5B9T", "LC2W8M"];

formCodigo.addEventListener("submit", function (event) {
    const codigo = campoCodigo.value.toUpperCase();
    campoCodigo.value = codigo;

    let mensagem = "";

    if (codigo.length !== 6) {
        mensagem = "O código deve ter 6 letras ou números.";
    } else if (!codigosExistentes.includes(codigo)) {
        mensagem = "Sala não encontrada. Confira o código e tente novamente.";
    }

    erroCodigo.textContent = mensagem;

    // Com erro, o envio é cancelado. Sem erro, o navegador abre sala.html?codigo=... (action do formulário).
    if (mensagem !== "") {
        event.preventDefault();
        campoCodigo.classList.add("invalido");
    }
});
