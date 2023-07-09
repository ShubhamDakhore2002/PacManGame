const brown = {
  bgColor: "#800000b3",
  brColor: "#805100bf",
  bodyColor: "#908080",
  canvasColor: "#403030b3"
}

const blue = {
  bgColor: "#2426a8b3",
  brColor: "#2b558dbf",
  bodyColor: "#808090",
  canvasColor: "#303040b3"
}

const green = {
  bgColor: "#0c7703b3",
  brColor: "#429404bf",
  bodyColor: "#809080",
  canvasColor: "#304030b3"
}

const pink = {
  bgColor: "#65035cb3",
  brColor: "#62006dbf",
  bodyColor: "#908090",
  canvasColor: "#403040b3"
}

const themes = [brown, blue, pink, green];

var currentTheme = brown;

const getNextTheme = () => {
  const index = themes.findIndex((theme) => { return theme === currentTheme });

  currentTheme = themes[(index + 1) % themes.length];
  return currentTheme;
}

const changeLayoutTheme = () => {
  const wallElements = document.querySelectorAll(".wall-element");

  let nextTheme = getNextTheme();
  wallElements.forEach(wall => {
    wall.style.backgroundColor = nextTheme.bgColor;
    wall.style.borderColor = nextTheme.brColor;
  })

  const bodyElement = document.querySelector("body");
  bodyElement.style.backgroundColor = nextTheme.bodyColor;

  const canvas = document.getElementById("canvas");
  canvas.style.backgroundColor = nextTheme.canvasColor;
}

const themeInit = () => {
  const wallElements = document.querySelectorAll(".wall-element");
  wallElements.forEach(wall => {
    wall.style.backgroundColor = currentTheme.bgColor;
    wall.style.borderColor = currentTheme.brColor;
  })

  const bodyElement = document.querySelector("body");
  bodyElement.style.backgroundColor = currentTheme.bodyColor;

  const canvas = document.getElementById("canvas");
  canvas.style.backgroundColor = currentTheme.canvasColor;

}