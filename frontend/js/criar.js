// Criar sala: escolha do ritmo, número de ciclos, prévia da sessão e validação.

const formCriar = document.querySelector("#form-criar");
const campoNome = document.querySelector("#nome-sala");
const campoFoco = document.querySelector("#foco");
const campoIntervalo = document.querySelector("#intervalo");
const campoCiclos = document.querySelector("#ciclos");
const contadorCiclos = document.querySelector("#contador-ciclos");
const botaoMenos = document.querySelector("#menos-ciclos");
const botaoMais = document.querySelector("#mais-ciclos");
const erroNome = document.querySelector("#erro-nome");
const erroTempos = document.querySelector("#erro-tempos");

// Parte 1 - Prévia da sessão

const linhaDoTempo = document.querySelector("#linha-do-tempo");
const previaTotal = document.querySelector("#previa-total");
const previaFocos = document.querySelector("#previa-focos");
const previaIntervalos = document.querySelector("#previa-intervalos");
const previaFocoTotal = document.querySelector("#previa-foco-total");

function atualizarPrevia() {
    const foco = Number(campoFoco.value);
    const intervalo = Number(campoIntervalo.value);
    const ciclos = Number(campoCiclos.value);

    contadorCiclos.textContent = ciclos;
    botaoMenos.disabled = ciclos === 1;
    botaoMais.disabled = ciclos === 8;

    // Enquanto os tempos estiverem vazios ou zerados, a prévia não muda
    if (foco < 1 || intervalo < 1) {
        return;
    }

    const totalMinutos = foco * ciclos + intervalo * (ciclos - 1);
    previaTotal.textContent = formatarDuracao(totalMinutos * 60);
    previaFocoTotal.textContent = formatarDuracao(foco * ciclos * 60);
    previaFocos.textContent = ciclos + " focos de " + foco + " min";
    previaIntervalos.textContent = (ciclos - 1) + " intervalos de " + intervalo + " min";

    // Linha do tempo: um bloco por foco e por intervalo, com largura proporcional ao tempo
    linhaDoTempo.innerHTML = "";

    for (let i = 1; i <= ciclos; i++) {
        const blocoFoco = document.createElement("span");
        blocoFoco.classList.add("focus-block");
        blocoFoco.style.flex = foco;
        linhaDoTempo.append(blocoFoco);

        if (i < ciclos) {
            const blocoIntervalo = document.createElement("span");
            blocoIntervalo.classList.add("break-block");
            blocoIntervalo.style.flex = intervalo;
            linhaDoTempo.append(blocoIntervalo);
        }
    }
}

// Parte 2 - Ritmos prontos (Clássico, Foco profundo, Sem pressa)

const botoesRitmo = document.querySelectorAll(".preset");
const ritmos = [
    { foco: 25, intervalo: 5 },
    { foco: 50, intervalo: 10 },
    { foco: 45, intervalo: 15 }
];

function desmarcarRitmos() {
    botoesRitmo.forEach(function (botao) {
        botao.classList.remove("selected");
    });
}

botoesRitmo.forEach(function (botao, posicao) {
    botao.addEventListener("click", function () {
        campoFoco.value = ritmos[posicao].foco;
        campoIntervalo.value = ritmos[posicao].intervalo;
        desmarcarRitmos();
        botao.classList.add("selected");
        atualizarPrevia();
    });
});

// Mudar um tempo (digitando ou pelas setinhas do campo) desmarca o ritmo escolhido.
// O evento "input" acontece sempre que o valor do campo muda.
campoFoco.addEventListener("input", function () {
    desmarcarRitmos();
    atualizarPrevia();
});

campoIntervalo.addEventListener("input", function () {
    desmarcarRitmos();
    atualizarPrevia();
});

// Parte 3 - Número de ciclos (de 1 a 8)

botaoMenos.addEventListener("click", function () {
    if (Number(campoCiclos.value) > 1) {
        campoCiclos.value = Number(campoCiclos.value) - 1;
        atualizarPrevia();
    }
});

botaoMais.addEventListener("click", function () {
    if (Number(campoCiclos.value) < 8) {
        campoCiclos.value = Number(campoCiclos.value) + 1;
        atualizarPrevia();
    }
});

// Parte 4 - Validação

formCriar.addEventListener("submit", function (event) {
    const foco = Number(campoFoco.value);
    const intervalo = Number(campoIntervalo.value);
    let valido = true;

    if (campoNome.value === "") {
        erroNome.textContent = "Dê um nome para a sala.";
        campoNome.classList.add("invalido");
        valido = false;
    } else {
        erroNome.textContent = "";
        campoNome.classList.remove("invalido");
    }

    if (foco < 1 || foco > 120 || intervalo < 1 || intervalo > 30) {
        erroTempos.textContent = "O foco deve ter de 1 a 120 minutos e o intervalo de 1 a 30 minutos.";
        valido = false;
    } else {
        erroTempos.textContent = "";
    }

    // Com erro, o envio é cancelado. Sem erro, o navegador abre sala.html com os dados na URL.
    if (!valido) {
        event.preventDefault();
    }
});

atualizarPrevia();
