
const lista_palavras = ["javascript", "html", "css", "youtube"];

let palavraEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestantes;
let numeroErros;

// função para iniciar jogo, inicializando as variaveis
function iniciarJogo() {

    // escolher palavra aleatoria da lista
    palavraEscolhida = lista_palavras[Math.floor(Math.random() * lista_palavras.length)];
    
    // Inicializar exibição de underscores "_"
    exibicaoPalavra = Array(palavraEscolhida.length).fill("_");

    // Inicializar a lista de palavras chutadas
    letrasChutadas = [];

    // Definir o numero maximo de tentativas
    tentativasRestantes = 7;

    // inicializa o numero de erros
    numeroErros = 0;

    document.getElementById("botao-reiniciar").style.display = "none";
    document.getElementById("mensagem").innerText = "";

    atualizarExibicao();
}

/** Função que atualiza a visualização nova da pagina a cada palavra chutada */
function atualizarExibicao() {
    // atualizar numero de undercores na pagina de acordo com a quantidade de letras da palavra
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(" ");
    
    // Atualizando a quantidade de letras cutadas
    document.getElementById("letras-chutadas").innerText = `${letrasChutadas.join(", ")}`;

    // Atualiza imagem
    document.getElementById("imagem").src = `./img/forca${numeroErros}.png`;

    //Verificar se o jogo terminou
    if(tentativasRestantes === 0) {
        encerrarJogo("Você Morreu!");
    } else if(!exibicaoPalavra.includes("_")) {
        encerrarJogo("Parabens você venceu!");
    }

}

function encerrarJogo(mensagem) {

    //Desabilitar campo de digitação
    document.getElementById("entrada-letra").disabled = true;

    //Exibir mensagem
    document.getElementById("mensagem").innerText = mensagem;

    //Exibir botão de reinciar
    document.getElementById("botao-reiniciar").style.display = "block";
}

document.getElementById("btn-chutar").addEventListener("click", () => {
    // pagando a letra
    const entradaLetra = document.getElementById("entrada-letra");
    const letra = entradaLetra.value.toLowerCase().trim();

    // verificando com expressão regular se é uma letra mesmo
    if(!letra.match(/[a-zà-ùç]/i)){
        alert("Por favor, insira uma letra valida");
        return;
    }

    // verificand
    if(letrasChutadas.includes(letra)) {
        alert("Você já digitou essa letra, tente outra!");
        return;
    }

    // adicionando as palavras chutadas
    letrasChutadas.push(letra);

    // verificando se a letra está na palavra e já fazendo a adição
    if(palavraEscolhida.includes(letra)) {
        for(let i=0; i < palavraEscolhida.length; i++) {
            if(palavraEscolhida[i] === letra) {
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

document.getElementById("botao-reiniciar").addEventListener("click", iniciarJogo);

window.load = iniciarJogo();