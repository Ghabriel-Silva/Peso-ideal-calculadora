const form = document.querySelector(".form"); //selciona o meu formulário
const reload = document.querySelector(".reload");//seleciona o meu botão de reload

// função responsavel por evitar o envio das informações, e executar as funções criadas abaixo
function notsubmit(){ 
form.addEventListener('submit', function(event){
event.preventDefault()

const peso = parseFloat(document.querySelector('.peso').value)
const altura = parseFloat(document.querySelector('.altura').value)

const  resultado = document.querySelector('.resultado')

isvalid(peso,altura)

const imc = calculaimc(peso, altura).toFixed(2)
resultado.innerHTML = `${imc}`;

condicaoresultado(imc)

})
};

// função reload carrega a página
function recarregar(){
    reload.addEventListener('click', function(){
        location.reload()
        })   
};

recarregar()
notsubmit()

// função responsavel por calcular o imc, onde tenho 2 parâmetros que tem que ser colocado para retornar o valor do calculo.
function calculaimc(a,b){
    return a/(b*2)
};

// funcão responsavel por verificar se os números são válidos, bassicamente está função verifica se o número é válido caso for ela retorna, se não for um número a função vai  mostrar um erro, função também oculta o resultado do imc e as condições caso n for um número.
function isvalid(a,b){
if(!isNaN(a) && !isNaN(b)){
}
else{
    const condicaoresultado = document.querySelector('.condicao-resultado')
    condicaoresultado.style.display = "none";
    
    const resultado = document.querySelector('.resultado')
    resultado.style.display = "none";
    
    const errorscreen = document.querySelector('.error-screen')
    errorscreen.innerHTML = `Por favor tente novamente e  digite um números válido`;
}
};
// função responsavel por condicionar e mostrar o resultado, tal resultado vai ser mostrado conforme o  parâmetro adicionado.
function condicaoresultado(imc){
   const condicaoresultado = document.querySelector('.condicao-resultado')
   if (imc < 16) {condicaoresultado.innerHTML = "Muito abaixo do peso";
   condicaoresultado.classList.add('nivel1')
   } else if (imc >= 16.1 && imc < 18.4) {
       condicaoresultado.classList.add('nivel3')
      condicaoresultado.innerHTML = "Abaixo do peso";
   } else if (imc >= 18.5 && imc <= 24.9) {
       condicaoresultado.classList.add('nivelnormal')
      condicaoresultado.innerHTML = "Peso normal";
   } else if (imc >= 25 && imc < 29.9) {
      condicaoresultado.innerHTML = "Sobrepeso";
      condicaoresultado.classList.add('nivel4')
   } else if (imc >= 30 && imc < 34.9) {
      condicaoresultado.innerHTML = "Obesidade grau I.";
      condicaoresultado.classList.add('nivel5')
   } else if (imc >= 35 && imc < 39.9) {
      condicaoresultado.innerHTML = "Obesidade grau II. ";
      condicaoresultado.classList.add('nivel6')
   } else {
      condicaoresultado.innerHTML = "Obesidade grau III";
      condicaoresultado.classList.add('nivel7')
   }
   };