const BFS = { new: 0, partial: 1, complete: 2 };

const nodeInit = () => {
  var nodeLayout = new Array;
  for (let index = 0; index < layout.length; index++) {
    const element = {
      type: layout[index],
      reached: BFS.new,
      position: { x: (index % getGridColumns()) + 1, y: Math.floor(index / getGridRows()) + 1 },
      left: {},
      right: {},
      up: {},
      down: {},
      parent: {}
    };

    nodeLayout.push(element);
  }


  for (let r = 1; r <= getGridRows(); r++) {
    for (let c = 1; c <= getGridColumns(); c++) {
      var element = nodeLayout[getIndex(r, c)];
      element.left = nodeLayout[getIndex(r, c - 1)];
      element.right = nodeLayout[getIndex(r, c + 1)];
      element.up = nodeLayout[getIndex(r - 1, c)];
      element.down = nodeLayout[getIndex(r + 1, c)];
    }
  }

  return nodeLayout;
}

const findPath = (source, target) => {
  var nodeLayout = nodeInit();
  var sourceElement = nodeLayout[getIndex(source)];
  sourceElement.reached = BFS.partial;
  sourceElement.parent = null;

  var queue = [sourceElement];
  while (queue.length) {
    let element = queue.shift();
    // const emptyElement = document.getElementById(`empty-${element.position.y}-${element.position.x}`);
    // if(emptyElement)
    // emptyElement.style.backgroundColor = "white"

    if (isEqualPosition(element.position, target)) {
      return directionOf(sourceElement, element);

    } else {
      if (element.left && isPenetrable(element.left.position) && element.left.reached === BFS.new) {
        element.left.reached = BFS.partial;
        element.left.parent = element;
        queue.push(element.left);
      }
      if (element.right && isPenetrable(element.right.position) && element.right.reached === BFS.new) {
        element.right.reached = BFS.partial;
        element.right.parent = element;
        queue.push(element.right);
      }
      if (element.up && isPenetrable(element.up.position) && element.up.reached === BFS.new) {
        element.up.reached = BFS.partial;
        element.up.parent = element;
        queue.push(element.up);
      }
      if (element.down && isPenetrable(element.down.position) && element.down.reached === BFS.new) {
        element.down.reached = BFS.partial;
        element.down.parent = element;
        queue.push(element.down);
      }
    }

    element.reached = BFS.complete;
  }

  console.log("element is unreachable");
  return NODIR;
}


const directionOf = (sourceElement, targetElement) => {
  var element = targetElement, elementParent = targetElement.parent;
  while (elementParent && elementParent !== sourceElement) {
    element = elementParent;
    elementParent = elementParent.parent;
  }
  if (elementParent) {
    if (elementParent.left === element) return LEFT;
    else if (elementParent.right === element) return RIGHT;
    else if (elementParent.up === element) return UP;
    else if (elementParent.down === element) return DOWN;
    else console.log("child parent relation breaks;")
  } else {
    let index = Math.floor(Math.random() * 4);
    return DIRECTION[index];
  }

  return NODIR;
}