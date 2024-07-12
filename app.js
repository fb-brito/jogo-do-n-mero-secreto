// Declarei todas as variáveis na mesma linha, fica mais prático encontrar.
let titulo, paragrafo, numeroInicial, numeroFinal, campo, numeroSecreto, chute, tentativas, mensagemTentativas, palavraTentativa, 
listaDeNumerosSorteados, numeroLimite, numeroEscolhido, quantidadeDeElementosNaLista;

listaDeNumerosSorteados = [];
numeroLimite = 10;

tentativas = 1;
numeroSecreto = gerarNumeroAleatorio();

// *titulo = document.querySelector('h1');
// *titulo.innerHTML = 'Jogo do número secreto';

numeroInicial = 1;
numeroFinal = 10;
// **paragrafo = document.querySelector('p');
// **paragrafo.innerHTML = `Escolha um número entre ${numeroInicial} e ${numeroFinal}`;

// Função foi criada para não termos que escrever vários códigos repetitivos, como nas linhas comentadas acima *`**.
function exibirTextoNaTela(tag, texto) {
    campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre ${numeroInicial} e ${numeroFinal}`);
}

exibirMensagemInicial();

function verificarChute() {
    chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);

    if (chute == numeroSecreto) {
        palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

if (quantidadeDeElementosNaLista == numeroLimite) {
    listaDeNumerosSorteados = [];
}

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
