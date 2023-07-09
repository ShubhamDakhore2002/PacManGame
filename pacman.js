var direction = LEFT;
var position = { x: 14, y: 18 };
var pacmanLocationHistory = [];
var size = 20;

const getPacmanPosition = () => {
  const returnValue = { x: 0, y: 0 };
  returnValue.x = position.x;
  returnValue.y = position.y;

  return returnValue;
}

const positionOverflowHandler = (position) => {
  if (position.x > getGridColumns()) {
    position.x = 1;
  }
  else if (position.x < 1) {
    position.x = getGridColumns();
  }

  if (position.y > getGridRows()) {
    position.y = 1;
  }
  else if (position.y < 1) {
    position.y = getGridRows();
  }
}


const updatePacman = () => {
  const inputDirection = getInputDirection();

  makeEmpty(position);
  var newPosition = { x: 0, y: 0 };
  newPosition.x += position.x + inputDirection.x;
  newPosition.y += position.y + inputDirection.y;

  positionOverflowHandler(newPosition);

  if (checkWallCollision(newPosition) === false) {
    position.x = newPosition.x;
    position.y = newPosition.y;
  }

  const pacman = document.getElementById("pacman");
  if (pacman) {
    pacman.style.transform = inputDirection.transform;
    pacman.style.gridColumnStart = position.x
    pacman.style.gridRowStart = position.y;
  } else {
    console.log("pacman does not exist")
  }

  changeTypeTo(TYPE.pacman, position);
  updateLocationHistory();
}

const drawPacman = (gameBoard) => {
  const pacman = document.createElement("div");
  pacman.id = "pacman";
  pacman.className = "animated-pacman-body";
  pacman.innerHTML =
    `<div class="animated-pacman-eye"></div>
    <div class="animated-pacman-mouth" style="animation-duration: ${2 / SPEED}s;"></div>`;

  direction = getInputDirection();
  pacman.style.transform = direction.transform;
  pacman.style.gridRowStart = position.y;
  pacman.style.gridColumnStart = position.x;

  gameBoard.appendChild(pacman);

  locationHistoryInit();
}

const locationHistoryInit = () => {
  for (let index = 0; index < size; index++) {
    pacmanLocationHistory.push(getPacmanPosition()  );
  }
}

const getLeakedLastLocation = () => {
  return pacmanLocationHistory.shift();
}

const getRandomLocationHistory = () => {
  let index = Math.floor(Math.random() * size);
  return pacmanLocationHistory[index];
}

const updateLocationHistory = () => {
  pacmanLocationHistory.push(getPacmanPosition());
}