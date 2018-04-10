import getElementFromTemplate from '../utils/get-element-from-template';
import renderScreen from '../utils/render-screen';
import nextScreen from './game3';
import intro from './intro';

import {footerData, gameState} from '../../data/data';
import getHeader from './header';
import getFooter from './footer';

const template = String.raw`${getHeader(gameState)}
<div class="game">
<p class="game__task">Угадай, фото или рисунок?</p>
<form class="game__content  game__content--wide">
  <div class="game__option">
    <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
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
<div class="stats">
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
</div>
</div>
${getFooter(footerData.creationDate)}`;

const game2 = getElementFromTemplate(template);
const linkToStartScreen = game2.querySelector(`.back`);
const elementsOfQuestion = game2.querySelectorAll(`[name="question1"]`);

linkToStartScreen.addEventListener(`click`, () => renderScreen(intro));

elementsOfQuestion.forEach((element) => element.addEventListener(`change`, () => renderScreen(nextScreen)));

export default game2;

