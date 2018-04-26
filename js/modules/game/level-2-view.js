import AbstractView from "../utils/abstract-view";

export default class Level2View extends AbstractView {
  constructor({level, onAnswer}) {
    super();
    this.level = level;
    this.onAnswer = onAnswer;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this.level.task}</p>
    <form class="game__content  game__content--wide">
    <div class="game__option">
      <img src="${this.level.image.src}" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  </div>`;
  }

  bind(element) {
    const elementsOfQuestion = element.querySelectorAll(`[name="question1"]`);
    const createHandler = (variant) => () => {
      this.onAnswer(variant.value);
    };

    elementsOfQuestion.forEach((variant) => variant.addEventListener(`click`, createHandler(variant)));
  }
}
