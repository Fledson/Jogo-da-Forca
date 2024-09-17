let palavraEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestantes;
let numeroErros;
let dicas;
const dicasUsadas = [];
let dicaAtual = 0;

// Função para carregar o arquivo JSON
async function carregarPalavras() {
    const resposta = await fetch('./palavras.json');
    const palavras = await resposta.json();
    return palavras;
}

async function iniciarJogo() {
    const palavras = await carregarPalavras();

    // Escolher palavra e dicas aleatoriamente
    const sorteio = palavras[Math.floor(Math.random() * palavras.length)];
    palavraEscolhida = sorteio.palavra;
    dicas = sorteio.dicas;
    dicasUsadas.splice(0, dicasUsadas.length);

    exibicaoPalavra = Array(palavraEscolhida.length).fill("_");
    letrasChutadas = [];
    tentativasRestantes = 7;
    numeroErros = 0;

    document.getElementById("botao-reiniciar").style.display = "none";
    document.getElementById("mensagem").innerText = "";
    document.getElementById("dica-btn").style.display = "block";
    document.getElementById("dica").innerText = "";

    atualizarExibicao();
}

function atualizarExibicao() {
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(" ");
    document.getElementById("letras-chutadas").innerText = `${letrasChutadas.join(", ")}`;
    document.getElementById("imagem").src = `./img/forca${numeroErros}.png`;

    if (tentativasRestantes === 0) {
        encerrarJogo("Você Morreu!");
    } else if (!exibicaoPalavra.includes("_")) {
        encerrarJogo("Parabéns, você venceu!");
    }
}

function encerrarJogo(mensagem) {
    document.getElementById("entrada-letra").disabled = true;
    document.getElementById("mensagem").innerText = mensagem;
    document.getElementById("botao-reiniciar").style.display = "block";
    document.getElementById("dica-btn").style.display = "none";
}

document.getElementById("btn-chutar").addEventListener("click", () => {
    const entradaLetra = document.getElementById("entrada-letra");
    const letra = entradaLetra.value.toLowerCase().trim();

    if (!letra.match(/[a-zà-ùç]/i)) {
        alert("Por favor, insira uma letra válida");
        return;
    }

    if (letrasChutadas.includes(letra)) {
        alert("Você já digitou essa letra, tente outra!");
        return;
    }

    letrasChutadas.push(letra);

    if (palavraEscolhida.includes(letra)) {
        for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] === letra) {
                exibicaoPalavra[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
        numeroErros++;
    }

    entradaLetra.value = "";
    atualizarExibicao();
});

document.getElementById("dica-btn").addEventListener("click", () => {
    // Verifica se ainda há dicas disponíveis
    if (dicaAtual < dicas.length) {
        // Adiciona a dica atual à lista de dicas usadas
        dicasUsadas.push(dicas[dicaAtual]);
        
        // Atualiza a exibição das dicas numeradas
        let dicasHtml = dicasUsadas.map((dica, index) => `<p>${index + 1}. ${dica}</p>`).join('');
        document.getElementById("dicas-container").innerHTML = dicasHtml;

        // Incrementa o contador de dicas
        dicaAtual++;
    } else {
        alert("Você já usou todas as 3 dicas disponíveis!");
    }
});


document.getElementById("botao-reiniciar").addEventListener("click", iniciarJogo);
window.onload = iniciarJogo;
