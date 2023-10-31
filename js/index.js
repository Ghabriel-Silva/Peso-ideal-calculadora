// Seleciona o formulário e o botão de recarregar
const form = document.querySelector(".form");
const reload = document.querySelector(".reload");

// Função responsável por evitar o envio das informações e executar as funções criadas abaixo
function notsubmit() {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obtém o peso e a altura inseridos pelo usuário
        const peso = parseFloat(document.querySelector('.peso').value);
        const altura = parseFloat(document.querySelector('.altura').value);

        // Seleciona o elemento de resultado
        const resultado = document.querySelector('.resultado');

        // Verifica se os números inseridos são válidos
        isvalid(peso, altura);

        // Calcula o IMC e exibe o resultado
        const imc = calculaimc(peso, altura).toFixed(2);
        resultado.innerHTML = `Resultado: ${imc}`;

        // Mostra a condição com base no IMC
        condicaoresultado(imc);

        // Mostra as orientações com base no IMC
        mostraorientacao(imc);

        // Torna o botão de recarregar visível novamente
        reload.style.display = 'inline-block';

        // Oculta o formulário
        form.style.display = "none";
    });
}

// Função para recarregar a página quando o botão de recarregar é clicado
function recarregar() {
    reload.addEventListener('click', function() {
        location.reload();
    });
}

// Chama as funções de recarregar e evitar envio do formulário
recarregar();
notsubmit();

// Função responsável por calcular o IMC com base no peso e altura fornecidos
function calculaimc(a, b) {
    return a / (b * b);
}

// Função responsável por verificar se os números inseridos são válidos
function isvalid(a, b) {
    if (!isNaN(a) && !isNaN(b)) {
        // Números válidos
    } else {
        // Números inválidos

        // Oculta a condição
        const condicaoresultado = document.querySelector('.condicao-resultado');
        condicaoresultado.style.display = "none";

        // Oculta o resultado do IMC
        const resultado = document.querySelector('.resultado');
        resultado.style.display = "none";

        // Exibe uma mensagem de erro
        const errorscreen = document.querySelector('.error-screen');
        errorscreen.innerHTML = `Por favor, tente novamente e digite números válidos.`;
    }
}

// Função responsável por determinar a condição com base no valor do IMC
function condicaoresultado(imc) {
    const condicaoresultado = document.querySelector('.condicao-resultado');
    if (imc < 16) {
        condicaoresultado.innerHTML = "Muito abaixo do peso";
        condicaoresultado.classList.add('nivel1');
    } else if (imc >= 16.1 && imc < 18.4) {
        condicaoresultado.classList.add('nivel3');
        condicaoresultado.innerHTML = "Abaixo do peso";
    } else if (imc >= 18.5 && imc <= 24.9) {
        condicaoresultado.classList.add('nivelnormal');
        condicaoresultado.innerHTML = "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
        condicaoresultado.innerHTML = "Sobrepeso";
        condicaoresultado.classList.add('nivel4');
    } else if (imc >= 30 && imc < 34.9) {
        condicaoresultado.innerHTML = "Obesidade grau I.";
        condicaoresultado.classList.add('nivel5');
    } else if (imc >= 35 && imc < 39.9) {
        condicaoresultado.innerHTML = "Obesidade grau II. ";
        condicaoresultado.classList.add('nivel6');
    } else {
        condicaoresultado.innerHTML = "Obesidade grau III";
        condicaoresultado.classList.add('nivel7');
    }
}

// Função responsável por mostrar as orientações com base no valor do IMC
function mostraorientacao(imc) {
    const orientacao = document.querySelector('.orientacao');
    const orientacaonormal = document.querySelector('.orientacaonormal');
    const orientacaoexeco = document.querySelector('.orientacaoexeco');
    const orientacaoexeco1 = document.querySelector('.orientacaoexeco1');
    const orientacaoexeco2 = document.querySelector('.orientacaoexeco2');
    const orientacaoexeco3 = document.querySelector('.orientacaoexeco3');

    if (isNaN(imc)) {
        // Se o IMC não for um número válido, saia da função
        return;
    } else if (imc < 18.5) {
        orientacao.style.display = 'inline-block';
    } else if (imc >= 18.5 && imc <= 24.9) {
        orientacaonormal.style.display = 'inline-block';
    } else if (imc >= 25 && imc <= 29.9) {
        orientacaoexeco.style.display = 'inline-block';
    } else if (imc >= 30 && imc <= 34.9) {
        orientacaoexeco1.style.display = 'inline-block';
    } else if (imc >= 35 && imc < 40) {
        orientacaoexeco2.style.display = 'inline-block';
    } else {
        orientacaoexeco3.style.display = 'inline-block';
    }
}
