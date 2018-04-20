import {createElement} from '../utils/create-element';

export default (gameState, back, time = null) => {
  let template = `<header class="header">
  <div class="header__back">
    <button class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.svg" width="101" height="44">
    </button>
  </div>
  </header>`;

  if (gameState) {
    const drawHeart = (full) => {
      return `<img src="img/heart__${full ? `full` : `empty`}.svg" class="game__heart" alt="Life" width="32" height="32">`;
    };
    template = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">${time}</h1>
    <div class="game__lives">
      ${drawHeart(gameState.lives > 2)}
      ${drawHeart(gameState.lives > 1)}
      ${drawHeart(gameState.lives > 0)}
    </div>
    </header>`;
  }

  const header = createElement(template);
  const linkToStartScreen = header.querySelector(`.back`);

  linkToStartScreen.addEventListener(`click`, () => back());

  return header;
};


