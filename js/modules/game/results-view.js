import AbstractView from "../utils/abstract-view";
import {AnswerRating} from '../../data/data';

export default class ResultsView extends AbstractView {
  constructor(data) {
    super();
    this.data = data.reverse();
  }

  _getSuccessAnswers(item) {
    const successAnswers = item.answers.reduce(function (sum, current) {
      if (current !== AnswerRating.WRONG && current !== AnswerRating.UNKNOWN) {
        return sum + 1;
      }
      return sum;
    }, 0);

    return successAnswers;
  }

  _getFastAnswers(item) {
    const fastAnswers = item.answers.reduce((sum, current) => {
      if (current === AnswerRating.FAST) {
        return sum + 1;
      }
      return sum;
    }, 0);

    return fastAnswers;
  }

  _getSlowAnswers(item) {
    const slowAnswers = item.answers.reduce((sum, current) => {
      if (current === AnswerRating.SLOW) {
        return sum + 1;
      }
      return sum;
    }, 0);

    return slowAnswers;
  }

  _renderResultItem(item, i) {
    const successAnswers = this._getSuccessAnswers(item);
    const fastAnswers = this._getFastAnswers(item);
    const slowAnswers = this._getSlowAnswers(item);

    return `<table class="result__table">
      <tr>
        <td class="result__number">${i + 1}.</td>
        <td colspan="2">
          <ul class="stats">
            ${item.answers.map((it) => `<li class="stats__result stats__result--${it}"></li>`).join(``)}
          </ul>
        </td>
        ${(item.state.lives >= 0) ? `<td class="result__points">×&nbsp;100</td>` : ``}
        <td class="result__total">${(item.state.lives >= 0) ? (successAnswers * 100) : ``}</td>
        ${(item.state.lives < 0) ? `<td class="result__total  result__total--final">fail</td>` : ``}
      </tr>
      ${(item.state.lives >= 0 && fastAnswers > 0) ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${fastAnswers * 50}</td>
      </tr>` : ``}
      ${(item.state.lives > 0) ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${item.state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${item.state.lives * 50}</td>
      </tr>` : ``}
      ${(item.state.lives >= 0 && slowAnswers > 0) ? `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${slowAnswers * -50}</td>
      </tr>` : ``}
      ${(item.state.lives >= 0) ? `<tr>
        <td colspan="5" class="result__total  result__total--final">${item.state.points}</td>
      </tr>` : ``}
    </table>`;
  }

  _getResultsList() {
    const resultsList = this.data.map((item, i) => this._renderResultItem(item, i)).join(``);

    return resultsList;
  }

  get template() {
    return `<div class="result">
    <h1>${(this.data[0].state.isGameWin) ? `Победа!` : `Вы проиграли!`}</h1>
      ${this._getResultsList()}
    </div>`;
  }
}
