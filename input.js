var inputDirection = LEFT;

const updateInputDirection = (event) => {
  if (event.key === "ArrowUp") {
    inputDirection = UP;
  }
  else if (event.key === "ArrowDown") {
    inputDirection = DOWN;
  }
  else if (event.key === "ArrowLeft") {
    inputDirection = LEFT;
  }
  else if (event.key === "ArrowRight") {
    inputDirection = RIGHT;
  }
}

window.addEventListener("keydown", event => {
  updateInputDirection(event);
  updatePauseState(event);
});

document.addEventListener("swipe-left", e => {
  inputDirection = LEFT;
});

document.addEventListener("swipe-right", e => {
  console.log("right");
  inputDirection = RIGHT;
});

document.addEventListener("swipe-down", e => {
  inputDirection = DOWN;
});

document.addEventListener("swipe-up", e => {
  inputDirection = UP;
});

const getInputDirection = () => {
  return inputDirection;
}

const updatePauseState = (event) => {
  if (event.key === "p") {
    togglePauseState();
    drawPauseScreen(gameBoard);
  }
}