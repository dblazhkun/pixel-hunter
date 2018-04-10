import getElementFromTemplate from '../utils/get-element-from-template';
import renderScreen from '../utils/render-screen';
import nextScreen from './stats';
import intro from './intro';

import {footerData, gameState} from '../../data/data';
import getHeader from './header';
import getFooter from './footer';

const template = String.raw`${getHeader(gameState)}
<div class="game">
<p class="game__task">Найдите рисунок среди изображений</p>
<form class="game__content  game__content--triple">
  <div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
  </div>
  <div class="game__option  game__option--selected">
    <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
  </div>
  <div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
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

const game3 = getElementFromTemplate(template);
const linkToStartScreen = game3.querySelector(`.back`);
const elementsOfQuestion = game3.querySelectorAll(`.game__option`);

linkToStartScreen.addEventListener(`click`, () => renderScreen(intro));

elementsOfQuestion.forEach((element) => element.addEventListener(`click`, () => renderScreen(nextScreen)));

export default game3;
