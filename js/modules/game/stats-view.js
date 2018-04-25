import AbstractView from "../utils/abstract-view";

export default class Stats1View extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    return `<div class="stats">
    <ul class="stats">
      ${this.answers.map((it) => `<li class="stats__result stats__result--${it}"></li>`).join(``)}
    </ul>
  </div>`;
  }
}
