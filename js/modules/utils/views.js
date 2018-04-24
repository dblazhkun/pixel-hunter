import {createElement} from './create-element';

class AbstractView {
  constructor({level}) {
    this.level = level;
  }

  get template() {
    if (new.target === AbstractView) {
      throw new Error(`Абстрактный метод родительского класса. Переопределяется и применяется только в наследниках.`);
    }
    return ``;
  }

  render() {
    return createElement(this.template);
  }

  bind(elm) {
    if (new.target === AbstractView) {
      throw new Error(`Абстрактный метод родительского класса. Переопределяется и применяется только в наследниках.`);
    }
    return elm;
  }

  get element() {
    if (!this.createdElement) {
      this.createdElement = this.bind(this.render());
    }
    return this.createdElement;
  }
}

export class Level1View extends AbstractView {
  constructor({level}) {
    super(level);
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
}
