const inputs = document.querySelector('.inputs');
const resetBtn = document.querySelector('.resetar-btn');
const dica = document.querySelector('.dica');
const inputDigitacao = document.querySelector('.input-digitacao');
const tentativas = document.querySelector('.tentativas');
const letrasErradas = document.querySelector('.letrasErradas');

let palavra;
let tentativasMaximas;
let erros = [];
let corretas = [];


const palavraAleatoria = () => {

    let ObjetoPalavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    console.log(ObjetoPalavra);
    palavra = ObjetoPalavra.palavra;
    tentativasMaximas = 8

    erros = [];
    corretas = [];

    letrasErradas.innerHTML = erros;
    dica.innerHTML = ObjetoPalavra.dica;

    tentativas.innerHTML = tentativasMaximas;

    let html = "";

    for (let index = 0; index < palavra.length; index++) {
            html += `<input type="text" disabled>`;
        
    }

    inputs.innerHTML = html;

}




const iniciarJogo = (evento) =>{

    let letra = evento.target.value;
    
    if(letra.match(/^[A-Za-z]+$/) && !erros.includes(`${letra}`) && !corretas.includes(`${letra}`)){
        if(palavra.includes(letra)){

            for (let index = 0; index < palavra.length; index++) {
                if(palavra[index] === letra){
                    corretas.push(letra);
                    inputs.querySelectorAll("input")[index].value=letra;
                }
                
            }

        }else{
            tentativasMaximas--;
            erros.push(`${letra}`)
        }

        tentativas.innerHTML = tentativasMaximas;
        letrasErradas.innerHTML = erros;

    }

    inputDigitacao.value = "";

    setTimeout(()=>{

        if(corretas.length === palavra.length){
            alert(`Parabéns, você completou o desafio! \nPalavra: ${palavra}`)
            palavraAleatoria();
        } else if(tentativasMaximas < 1){
            alert(`Fim de Jogo! Você não possui mais tentativas válidas.`)

            for (let index = 0; index < palavra.length; index++) {
                inputs.querySelectorAll("input")[index].value = palavra[index];
                
            }

        }

    })

}

resetBtn.addEventListener('click', palavraAleatoria)
inputDigitacao.addEventListener('input', iniciarJogo)


document.addEventListener('keydown', () => {
    inputDigitacao.focus();
})
palavraAleatoria();