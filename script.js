const elementoHtml = document.querySelector('html');
const botaoFoco = document.getElementById('button_foco');
const botaoDescansoCurto = document.getElementById('button_descanso_curto');
const botaoDescansoLongo = document.getElementById('button_descanso_longo');
const secaoTemporizador = document.getElementById('timer');
const imagem = document.querySelector('.app__image');
const tituloSecao = document.querySelector('.app__title');
const botaoControleTemporizador = document.getElementById('start-pause');
const todosBotoes = document.querySelectorAll('.app__card-button');
const inputMusica = document.getElementById('alternar-musica');
const spanComecarPausar = document.getElementById('texto_botao_controle');
const iconeComecarPausar = document.querySelector('.app__card-primary-butto-icon')
const botaoComecarTerminar = document.getElementById('start-pause');
const temporizadorTela = document.getElementById('timer');
let intervaloId = null;

let musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;
let audioComecar = new Audio('sons/play.wav');
let audioPausar = new Audio('sons/pause.mp3');
let audioAcabou = new Audio('sons/beep.mp3');

let tempoTemporizador = 1500;


inputMusica.addEventListener('change', (evento) => {
  evento.preventDefault();
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
})

botaoFoco.addEventListener('click', (evento) => {
  evento.preventDefault();
  tempoTemporizador = 1500;
  alterarPagina('foco');
  botaoFoco.classList.add('active')
});

botaoDescansoCurto.addEventListener('click', (evento) => {
  evento.preventDefault();
  tempoTemporizador = 300;
  alterarPagina('descanso-curto');
  botaoDescansoCurto.classList.add('active');
});

botaoDescansoLongo.addEventListener('click', (evento) => {
  evento.preventDefault();
  tempoTemporizador = 900;
  alterarPagina('descanso-longo');
  botaoDescansoLongo.classList.add('active');
});

function alterarPagina(botaoEscolhido) {
  mostrarTemporizadorTela();
  todosBotoes.forEach(function (botaoEscolhido) {
    botaoEscolhido.classList.remove('active');
  })
  elementoHtml.setAttribute('data-contexto', botaoEscolhido);
  imagem.setAttribute('src', `imagens/${botaoEscolhido}.png`);
  switch (botaoEscolhido) {
    case 'foco':

      tituloSecao.innerHTML = `
             Otimize sua produtividade,<br>
  <strong class="app__title-strong">mergulhe no que importa.</strong>
           `

      break;
    case 'descanso-curto':

      tituloSecao.innerHTML = `
  Que tal dar uma respirada?<br>
  <strong class="app__title-strong">Faça uma pausa curta!</strong>
  `
    case 'descanso-longo':

      `
  Hora de voltar à superfície.<br>
  <strong class="app__title-strong">Faça uma pausa longa.</strong>
  `
    default:
      break;
  }
}
function iniciarTemporizador() {
  if (intervaloId) {
    zerarTemporizador();
    audioPausar.play();
    return;
  }
  intervaloId = setInterval(temporizador, 1000);
  audioComecar.play();
  iconeComecarPausar.src = 'imagens/pause.png';
  spanComecarPausar.textContent = 'Pausar';
}
function temporizador() {
  if (tempoTemporizador <= 0) {
    alert('Tempo Acabou!');
    const focoAtivo = elementoHtml.getAttribute('data-contexto') == 'foco';
    if (focoAtivo) {
      const eventoPersonalizado = new CustomEvent ('focoFinalizado');
      document.dispatchEvent(eventoPersonalizado);
    }
    zerarTemporizador();
    audioAcabou.play();
    return;
  }
  tempoTemporizador -= 1;
  mostrarTemporizadorTela();
}
function zerarTemporizador() {
  clearInterval(intervaloId);
  intervaloId = null;
  iconeComecarPausar.src = 'imagens/play_arrow.png';
  spanComecarPausar.textContent = 'Começar';
}
botaoComecarTerminar.addEventListener('click', iniciarTemporizador);

function mostrarTemporizadorTela() {
  const tempo = new Date(tempoTemporizador * 1000);
  const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
    minute: '2-digit',
    second: '2-digit'
  });
  temporizadorTela.innerHTML = `${tempoFormatado}`;
}
mostrarTemporizadorTela();
