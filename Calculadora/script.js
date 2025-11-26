let display = document.getElementById('resultado');
let botoes = document.getElementById('teclas').querySelectorAll('button');

let expressao = '';
let resultado = 0;

for (let botao of botoes){
    botao.addEventListener('click', ()=>{
        const valorBotao = botao.textContent;

        if (valorBotao==='C'){
            expressao = '';
            display.innerHTML = `${expressao}`;
        } else if (valorBotao==='Del'){
            expressao = expressao.slice(0, -1);
            display.innerHTML = `${expressao}`;
        } else if (valorBotao==='='){
            resultado = eval(expressao);
            display.innerHTML = `${resultado}`;
            expressao = '';
        } else {
            expressao += valorBotao;
            display.innerHTML = `${expressao}`;
        }
    })
}
