const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true

const audioPlay = new Audio ('/sons/play.wav')
const audioPause = new Audio ('/sons/pause.mp3')
const tempoFinalizado = new Audio('/sons/beep.mp3')

const startPauseBt = document.querySelector('#start-pause')
const playOuPauseText = document.querySelector('#start-pause span')

const imgPlayouPause = document.querySelector('.app__card-primary-butto-icon')

let intervaloId = null
let tempoDecorridoEmSegundos = 1500
const tempoNaTela = document.querySelector('#timer')
const duracaoFoco = 1500; 
const duracaoDescansoCurto = 300; 
const duracaoDescansoLongo = 900; 


musicaFocoInput.addEventListener('change', () => {
    musica.currentTime = 20; //musica inicia com 20 segundos
    if(musica.paused == true){
        musica.play()
    }else{
        musica.pause()
    }
})




focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = duracaoFoco
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
     
     tempoDecorridoEmSegundos = duracaoDescansoCurto
     alterarContexto('descanso-curto') 
     curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    
    tempoDecorridoEmSegundos = duracaoDescansoLongo
   alterarContexto('descanso-longo')
   longoBt.classList.add('active')
})

function selecionarBtn(contexto,elemento01,elemento02){
    contexto.classList.add('active')
    elemento01.classList.remove('active')
    elemento02.classList.remove('active')
}


function alterarContexto(contexto){

    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,
            <br>
            <strong class="app__title-strong">mergulhe no que importa.</strong> `
            
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? 
            <br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>` 
           
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.
            <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
           
            break;
        default:
            break;
    }
}

const contagemRegreciva = () => {

    if(tempoDecorridoEmSegundos <=0){
        
        tempoFinalizado.play()
        alert('tempo finalizado') 
        zerar()
        //tempoDecorridoEmSegundos = 5
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    
}

startPauseBt.addEventListener('click',iniciarOuPausar)

function iniciarOuPausar(){

    
    if(intervaloId){
        audioPause.play()
        zerar()
        return
    }
    playOuPauseText.textContent = `Pause`
    imgPlayouPause.setAttribute('src', '/imagens/pause.png')
    audioPlay.play()
    intervaloId = setInterval(contagemRegreciva, 1000)
}

function zerar(){ 
    clearInterval(intervaloId)
    intervaloId = null
    playOuPauseText.textContent = `Começar`
    imgPlayouPause.setAttribute('src', '/imagens/play_arrow.png')
    
}


function mostrarTempo(){
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()

/**
o InnerHTML para alterar os textos da tela;
o setAttribute para alterar o caminho das imagens;
o classList para alterar as classes e o estilo dos botões;
o querySelector para pegar os elementos e
o EventList para escutar a interação com a nossa página.
 */