// Seleciona o formulário e o botão de recarregar
const form = document.querySelector(".form");
const reload = document.querySelector(".reload");
const articleinfo = document.querySelector('.article-info');

// Função responsável por evitar o envio das informações e executar as funções criadas abaixo
function notsubmit() {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio do formulário

        // Obtém o peso e a altura inseridos pelo usuário
        const peso = parseFloat(convertepontoemvirgula(document.querySelector('.peso').value));
        const altura = parseFloat(convertepontoemvirgula(document.querySelector('.altura').value));

        // Seleciona o elemento de resultado
        const resultado = document.querySelector('.resultado');

        // Verifica se os números inseridos são válidos
        if (!isvalid(peso, altura)) {
            return; // Interrompe se os valores não forem válidos
        }

        // Calcula o IMC e exibe o resultado
        const imc = calculaimc(peso, altura).toFixed(2);
        resultado.innerHTML = `IMC: ${imc}`;

        // Mostra a condição com base no IMC
        condicaoresultado(imc);

        // Mostra as orientações com base no IMC
        mostraorientacao(imc);

        // Torna o botão de recarregar visível novamente
        reload.style.display = 'inline-block';

        // Oculta o formulário
        form.style.display = "none";

        // Oculta as informações do artigo
        articleinfo.style.display = 'flex';
        articleinfo.style.flexDirection = 'column';
        articleinfo.style.justifyContent = 'center';
        articleinfo.style.alignItems = 'center';
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

// Função para converter ponto em vírgula
function convertepontoemvirgula(valor) {
    return valor.replace(',', '.'); // Substitui a vírgula por ponto
}

// Função responsável por calcular o IMC com base no peso e altura fornecidos
function calculaimc(a, b) {
    return a / (b * b);
}

// Função responsável por verificar se os números inseridos são válidos
function isvalid(peso, altura) {
    const condicaoresultado = document.querySelector('.condicao-resultado');
    const resultado = document.querySelector('.resultado');
    const errorscreen = document.querySelector('.error-screen');
    
    // Verifica se o peso e a altura são números válidos
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        condicaoresultado.style.display = "none";
        resultado.style.display = "none";
        errorscreen.innerHTML = `Por favor, insira valores válidos de peso e altura.`;
        return false;
    }
    return true;
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
    const orientacoes = {
        normal: document.querySelector('.orientacaonormal'),
        execo: document.querySelector('.orientacaoexeco'),
        execo1: document.querySelector('.orientacaoexeco1'),
        execo2: document.querySelector('.orientacaoexeco2'),
        execo3: document.querySelector('.orientacaoexeco3')
    };

    // Esconde todas as orientações
    Object.values(orientacoes).forEach(element => element.style.display = 'none');

    // Exibe a orientação correspondente
    if (imc < 18.5) {
        orientacao.style.display = 'inline-block';
    } else if (imc >= 18.5 && imc <= 24.9) {
        orientacoes.normal.style.display = 'inline-block';
    } else if (imc >= 25 && imc <= 29.9) {
        orientacoes.execo.style.display = 'inline-block';
    } else if (imc >= 30 && imc <= 34.9) {
        orientacoes.execo1.style.display = 'inline-block';
    } else if (imc >= 35 && imc < 40) {
        orientacoes.execo2.style.display = 'inline-block';
    } else {
        orientacoes.execo3.style.display = 'inline-block';
    }
}

// Função para alternar o tema claro e escuro
document.addEventListener("DOMContentLoaded", function () {
    const switchInput = document.querySelector(".input");
    const body = document.body;

    // Função para alternar o tema
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-theme");
            switchInput.checked = true;
        } else {
            body.classList.remove("dark-theme");
            switchInput.checked = false;
        }
    }

    // Adiciona um ouvinte de evento para alterar o tema quando o botão é clicado
    switchInput.addEventListener("change", function () {
        // Armazena a preferência do usuário no localStorage
        localStorage.setItem("darkTheme", switchInput.checked);
        setTheme(switchInput.checked);
    });

    // Obtém a preferência salva no localStorage (se houver)
    const storedTheme = localStorage.getItem("darkTheme");
    if (storedTheme !== null) {
        setTheme(storedTheme === "true"); // Converte a string para um valor booleano
    } else {
        setTheme(switchInput.checked); // Se nenhuma preferência for encontrada, configure o tema com base no estado inicial do botão
    }
});
