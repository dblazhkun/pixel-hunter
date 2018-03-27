const templates = Array.prototype.slice.call(document.querySelectorAll(`template`));
const centralScreen = document.querySelector(`main.central`);

const changeScreen = (screen, template) => {
  screen.innerHTML = ``;
  screen.appendChild(template.content.cloneNode(true));
};

changeScreen(centralScreen, templates[0]);

const leftArrowKeyCode = 37;
const rightArrowKeyCode = 39;
let screenIndex = 0;

const checkKeyDownEvent = (evt) => {
  if (evt.altKey && evt.keyCode === leftArrowKeyCode && screenIndex !== 0) {
    screenIndex--;
    changeScreen(centralScreen, templates[screenIndex]);
  }
  if (evt.altKey && evt.keyCode === rightArrowKeyCode && screenIndex < templates.length - 1) {
    screenIndex++;
    changeScreen(centralScreen, templates[screenIndex]);
  }
};

document.addEventListener(`keydown`, checkKeyDownEvent);
