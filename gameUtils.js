/*************** Game setup ***************/
const gridColumns = 28;
const gridRows = 28;

const screenSizeInit = () => {
  screenWidth = window.screen.availWidth;
  screenHeight = window.screen.availHeight;
}

const canvasInit = (canvas) => {
  canvas.innerHTML =
    `<div id="scoreBoard"></div>
     <div id="gameBoard"></div>
     <button id="fullscreenToggler"> </button>`;
}

const gameInit = () => {
  gameBoard = document.getElementById("gameBoard");
  scoreBoard = document.getElementById("scoreBoard");
  fullscreenTogglerButton = document.getElementById("fullscreenToggler");

  scoreBoardInit(scoreBoard);
  gameBoardInit(gameBoard);
  fullscreenTogglerInit(fullscreenTogglerButton);
  layoutInit(gameBoard);
  soundInit(gameBoard);
}

const getGridRows = () => {
  return gridRows;
}

const getGridColumns = () => {
  return gridColumns;
}

const gameBoardInit = (gameBoard) => {
  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateColumns = `repeat(${gridColumns},1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${gridRows},1fr)`;
  gameBoard.style.aspectRatio = `${gridColumns / gridRows}`;

  const aspectRatio = gridColumns / gridRows;
  if (screenWidth > screenHeight * aspectRatio) {
    gameBoard.style.height = `${screenHeight * 0.8}px`;
  } else {
    gameBoard.style.width = `${screenWidth * 0.8}px`;
  }
}

const playGame = () => {
  updateStartScreen(bodyElement);
  canvasInit(canvas);
  gameInit();
  playBeginningSound();
  const waitForPlayingGameSound = setTimeout(() => {
    gameLoop = setInterval(main, 1000 / SPEED);
  }, 4000)
}

/************ Full screen Toggler ***********/
const isFullscreen = () => {
  return document.fullscreenElement;
}

const toggleFullscreen = (e) => {
  if (isFullscreen()) {
    document.exitFullscreen();
    fullscreenTogglerButton.style.backgroundImage = "url(image/fullscreen.svg)"

  } else {
    document.documentElement.requestFullscreen();
    fullscreenTogglerButton.style.backgroundImage = "url(image/fullscreen-exit.svg)"
  }
}

const fullscreenTogglerInit = (fullscreenTogglerButton) => {
  fullscreenTogglerButton.addEventListener("click", toggleFullscreen);
}


/************* Direction Utilities *****************/
const LEFT = {
  x: -1, y: 0, transform: "scale(-1,1) rotate(0deg)"
};

const RIGHT = {
  x: 1, y: 0, transform: "scale(1,1) rotate(0deg)"
};

const UP = {
  x: 0, y: -1, transform: "scale(1,1) rotate(-90deg)"
};

const DOWN = {
  x: 0, y: 1, transform: "scale(-1,1) rotate(90deg)"
};

const NODIR = {
  x: 0, y: 0, transform: ""
}

const DIRECTION = [LEFT, RIGHT, UP, DOWN];
/****************** Score Board ******************/
var score = 0;

const updateScore = (number) => {
  if (number) {
    score += number;
  } else {
    score += 10;
  }
}

const scoreBoardInit = (scoreBoard) => {
  scoreBoard.textContent = getScore();
}


const updateScoreBoard = (scoreBoard) => {
  scoreBoard.textContent = getScore();
}

const resetScore = () => {
  score = 0;
}

const getScore = () => {
  return score;
}

/************** Pause Screen ************/
var pause = false;

const isPause = () => {
  return pause;
}

const togglePauseState = () => {
  pause = !pause;
}

const drawPauseScreen = (gameBoard) => {
  const initialPauseScreen = document.querySelector(".pause-screen");
  if (initialPauseScreen) {
    gameBoard.removeChild(initialPauseScreen);

  } else {
    const pauseScreen = document.createElement("div");
    pauseScreen.className = "pause-screen";
    pauseScreen.textContent = "PAUSE";
    gameBoard.appendChild(pauseScreen);
  }

  gameBoard.classList.toggle("pause-state");
}


/*************** Start Screen ***************/
const drawStartScreen = (bodyElement) => {
  // const demoMovement = document.createElement("div");
  // demoMovement.id = "demo-movement";
  // bodyElement.appendChild(demoMovement);

  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", (ev) => {
    clearTimeout(startGame);
    setTimeout(playGame, 100);
  })
}


const shrinkPacmanLogo = () => {
  const pacmanLogo = document.getElementById("pacman-logo");
  if (screenHeight > 767) {
    pacmanLogo.style.width = "30vh";
    pacmanLogo.style.height = "10vh";
  } else {
    pacmanLogo.style.width = "0px";
    pacmanLogo.style.height = "0px";
  }
  pacmanLogo.style.top = "2%";
}

const removePlayButton = (bodyElement) => {
  const playButton = document.getElementById("play-button");
  bodyElement.removeChild(playButton);
}

const updateStartScreen = (bodyElement) => {
  shrinkPacmanLogo();
  removePlayButton(bodyElement);
}


/************** Comparing function ****************/
const isEqualPosition = (p1, p2) => {
  return (p1.x === p2.x) && (p1.y === p2.y);
}

/*************** Game End ***********************/
const checkGameEnd = () => {
  let pacmanPosition = getPacmanPosition();
  if (isGhost(pacmanPosition)) {
    return true;
  }

  return false;
}