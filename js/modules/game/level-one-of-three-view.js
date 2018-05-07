import AbstractView from "../utils/abstract-view";

export default class LevelOneOfThreeView extends AbstractView {
  constructor({level, onAnswer}) {
    super();
    this.level = level;
    this.onAnswer = onAnswer;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this.level.task}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${this.level.images[0].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${this.level.images[1].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${this.level.images[2].src}" alt="Option 1" width="304" height="455">
      </div>
    </form>
  </div>`;
  }

  bind(element) {
    const elementsOfQuestion = element.querySelectorAll(`.game__option`);

    const createHandler = (index) => () => {
      this.onAnswer(this.level.images[index].type);
    };

    elementsOfQuestion.forEach((variant, i) => variant.addEventListener(`mouseup`, createHandler(i)));
  }
}
