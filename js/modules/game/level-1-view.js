import AbstractView from "../utils/abstract-view";

export default class Level1View extends AbstractView {
  constructor({level, onAnswer}) {
    super();
    this.level = level;
    this.onAnswer = onAnswer;
  }

  get template() {
    return `<form class="game__content">
    <div class="game__option">
      <img src="${this.level.images[0].src}" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="${this.level.images[1].src}" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>`;
  }

  bind(element) {

    const elementsOfFirstQuestion = element.querySelectorAll(`[name="question1"]`);
    const elementsOfSecondQuestion = element.querySelectorAll(`[name="question2"]`);
    const questions = [elementsOfFirstQuestion, elementsOfSecondQuestion];
    const answer = [null, null];

    const createHandler = (index, variant) => () => {
      answer[index] = variant.value;
      if (answer[0] && answer[1]) {
        this.onAnswer(answer);
      }
    };

    questions.forEach((question, i) => question.forEach((variant) => variant.addEventListener(`click`, createHandler(i, variant))));
  }
}
