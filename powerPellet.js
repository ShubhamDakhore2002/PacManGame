const getNewPowerPellet = (rowNo, columnNo) => {
  const powerPellet = getNewFoodElement(rowNo, columnNo);
  powerPellet.id = `power-pellet-${rowNo}-${columnNo}`;
  powerPellet.classList.add("power-pellet");
  return powerPellet;
}

const getPowerPellet = (rowNo, columnNo) => {
  return document.getElementById(`power-pellet-${rowNo}-${columnNo}`);
}

const updatePowerPellet = () => {
  const pacmanPosition = getPacmanPosition();
  let row = pacmanPosition.y;
  let column = pacmanPosition.x;
  const powerPellet = getPowerPellet(row, column);

  if (powerPellet) {
    makeEmpty(row, column);
    var gameBoard = getGameBoard();
    gameBoard.removeChild(powerPellet);
    changeLayoutTheme();
    updateScore(100);
    playPowerSound();
  }
}