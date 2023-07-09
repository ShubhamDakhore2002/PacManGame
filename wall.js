const getNewWall = (rowNo, columnNo) => {
  const wallElement = document.createElement("div");
  wallElement.className = "wall-element";
  wallElement.style.gridRowStart = rowNo || 0;
  wallElement.style.gridColumnStart = columnNo || 0;
  return wallElement;

}


const checkWallCollision = (newPosition) => {
  let rowNo = newPosition.y;
  let columnNo = newPosition.x;

  if (getLayoutElementType(rowNo, columnNo) === TYPE.wall) {
    return true;
  } else {
    return false;
  }
}