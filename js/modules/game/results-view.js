import AbstractView from "../utils/abstract-view";

export default class ResultsView extends AbstractView {
  constructor(data) {
    super();
    this.data = data.reverse();
  }

  get template() {
    const resultsList = this.data.map((item, i) => {
      const successAnswers = item.answers.reduce(function (sum, current) {
        if (current !== `wrong` && current !== `unknown`) {
          return sum + 1;
        }
        return sum;
      }, 0);
      const fastAnswers = item.answers.reduce((sum, current) => {
        if (current === `fast`) {
          return sum + 1;
        }
        return sum;
      }, 0);
      const slowAnswers = item.answers.reduce((sum, current) => {
        if (current === `slow`) {
          return sum + 1;
        }
        return sum;
      }, 0);

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
    }).join(``);

    return `<div class="result">
    <h1>${(this.data[0].state.isGameWin) ? `Победа!` : `Вы проиграли!`}</h1>
      ${resultsList}
    </div>`;
  }
}
