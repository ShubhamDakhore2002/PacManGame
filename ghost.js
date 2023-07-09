var ghosts = [];
var colors = ["red", "blue", "green", "violet"];

const getNewGhostElement = (rowNo, columnNo) => {
  var ghost = {
    id: ghosts.length,
    position: { x: columnNo, y: rowNo },
    direction: NODIR,
    targetPosition: getPacmanPosition()
  };

  const ghostElement = document.createElement("img");
  ghostElement.src = `./image/ghost_${colors[ghost.id]}.svg`;
  ghostElement.id = `ghost-${ghost.id}`;
  ghostElement.className = "ghost";
  ghostElement.style.gridRowStart = rowNo;
  ghostElement.style.gridColumnStart = columnNo;

  ghost.reference = ghostElement;
  ghosts.push(ghost);

  return ghostElement;
}

const updateGhosts = () => {
  const targetPosition = getLeakedLastLocation();
  ghosts.forEach(ghost => {
    updateGhost(ghost, targetPosition);
  })
}

const updateGhost = (ghost, targetPosition) => {
  makeEmpty(ghost.position);
  let randomTarget = getRandomLocationHistory();

  var nextDirection = findPath(ghost.position, randomTarget);
  ghost.direction = nextDirection;
  moveGhost(ghost);
  changeTypeTo(TYPE.ghost, ghost.position);
}

const moveGhost = (ghost) => {
  var newPosition = {
    y: ghost.position.y + ghost.direction.y,
    x: ghost.position.x + ghost.direction.x
  }

  if (isWall(newPosition))  {
    console.log(newPosition);
    return;
  }

  if (isGhost(newPosition)) {
    console.log(newPosition);
    return;
    
  }

  ghost.position.y = newPosition.y;
  ghost.position.x = newPosition.x;

  ghost.reference.style.gridRowStart = ghost.position.y;
  ghost.reference.style.gridColumnStart = ghost.position.x;

}