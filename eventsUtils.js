document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var swipeLeft = new Event("swipe-left");
var swipeRight = new Event("swipe-right");
var swipeDown = new Event("swipe-down");
var swipeUp = new Event("swipe-up");



var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  console.log(" " + xDown + " -> " + xUp);
  console.log(" " + yDown + " -> " + yUp);

  var xDiff = xUp - xDown;
  var yDiff = yUp - yDown;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
    if (xDiff > 0) {
      document.dispatchEvent(swipeRight);
    } else {
      document.dispatchEvent(swipeLeft);
    }
  } else {
    if (yDiff > 0) {
      document.dispatchEvent(swipeDown);
    } else {
      document.dispatchEvent(swipeUp);
    }
  }


  /* reset values */
  xDown = null;
  yDown = null;
};