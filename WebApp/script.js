document.getElementById("openModal").addEventListener("click", function() {
  document.getElementById("myModal").style.display = "block";
});

// Fechar o modal quando o ícone "x" for clicado
document.getElementsByClassName("close")[0].addEventListener("click", function() {
  document.getElementById("myModal").style.display = "none";
});

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameOverScreen = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

let pipeAnimation = null; // Variável para armazenar a animação do cano
let cloudsAnimation = null; // Variável para armazenar a animação das nuvens
let cloudsPosition = 0; // Posição das nuvens
let score = 0; // Pontuação do jogador
let isJumping = false; // Variável de controle para verificar se o Mario está pulando

const updateScore = () => {
  const scoreElement = document.getElementById('score');
  score++;
  scoreElement.textContent = `Score: ${score}`;
};

const jump = () => {
  if (isJumping) return; // Verifica se o Mario já está pulando
  isJumping = true; // Define a variável de controle como true
  mario.classList.add('jump');
  updateScore(); // Incrementa a pontuação ao pular

  setTimeout(() => {
      mario.classList.remove('jump');
      isJumping = false; // Define a variável de controle como false quando o salto terminar
  }, 500);
};

const stopClouds = () => {
  clouds.style.animation = 'none';
  if (cloudsAnimation) {
      clearInterval(cloudsAnimation);
      cloudsAnimation = null;
  }
};

const stopPipeAnimation = () => {
  pipe.style.animationPlayState = 'paused';
  if (pipeAnimation) {
      clearInterval(pipeAnimation);
      pipeAnimation = null;
  }
};

const showGameOver = () => {
  stopClouds();
  stopPipeAnimation();
  mario.src = 'img/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';
  gameOverScreen.classList.remove('hidden');
};

const restartGame = () => {
  gameOverScreen.classList.add('hidden');
  pipe.style.animationPlayState = 'running';
  mario.src = 'img/mario.gif';
  mario.style.width = '150px';
  mario.style.marginLeft = '';
  score = 0; // Reseta a pontuação
  updateScore(); // Atualiza a pontuação exibida
  startGameLoop();
};

const startGameLoop = () => {
  pipeAnimation = setInterval(() => {
      const pipePosition = pipe.offsetLeft;
      const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

      if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
          clearInterval(pipeAnimation);
          stopClouds();
          showGameOver();
      }
  }, 10);

  cloudsPosition = clouds.getBoundingClientRect().left;
  clouds.style.right = '';
  clouds.style.animation = 'none';
  clouds.offsetHeight; // Reiniciar a animação das nuvens
  clouds.style.animation = `clouds-animation 6s infinite linear`;
};

document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
      jump();
  }
});

restartButton.addEventListener('click', restartGame);

startGameLoop();