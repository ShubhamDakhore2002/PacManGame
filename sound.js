const soundInit = (gameBoard) => {
  const soundContainer = document.createElement("div");
  soundContainer.id = "sound-container";

  soundContainer.innerHTML =
    `<audio src="sound/pacman_beginning.wav" id="sound-beginning"></audio>
    <audio src="sound/pacman_chomp.wav" id="sound-chomp"></audio>
    <audio src="sound/pacman_eat_power.wav" id="sound-eat-power"></audio>
    <audio src="sound/pacman_intermission.wav" id="sound-intermission"></audio>`;
  
  gameBoard.appendChild(soundContainer);
  // playBeginningSound();
}

const playBeginningSound = () => {
  const beginningSound = document.getElementById("sound-beginning");
  beginningSound.play();
}

const playChompSound = () => {
  const chompSound = document.getElementById("sound-chomp");
  chompSound.currentTime = 0;
  chompSound.play();
}

const playPowerSound = () => {
  const powerSound = document.getElementById("sound-eat-power");
  powerSound.currentTime = 0;
  powerSound.play();
}