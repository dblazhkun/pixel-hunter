import AbstractView from "../utils/abstract-view";

export default class Header1View extends AbstractView {
  constructor({state, onBack, time}) {
    super();
    this.state = state;
    this.onBack = onBack;
    this.time = time;
  }

  get template() {
    let template = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    </header>`;
    if (this.state) {
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
      <h1 class="game__timer ${this.time <= 29 ? `game__timer--blink` : ``}">${this.time}</h1>
      <div class="game__lives">
        ${drawHeart(this.state.lives > 2)}
        ${drawHeart(this.state.lives > 1)}
        ${drawHeart(this.state.lives > 0)}
      </div>
      </header>`;
    }

    return template;
  }

  bind(element) {
    const linkToStartScreen = element.querySelector(`.back`);

    linkToStartScreen.addEventListener(`click`, () => {
      if (!this.state) {
        this.onBack();
      } else if (confirm(`Ваш прогресс будет утерян. Продолжить?`)) {
        this.onBack();
      }
    });
  }
}
