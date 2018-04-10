import getElementFromTemplate from '../utils/get-element-from-template';
import renderScreen from '../utils/render-screen';
import nextScreen from './game2';
import intro from './intro';

import {footerData, gameState} from '../../data/data';
import getHeader from './header';
import getFooter from './footer';

const template = String.raw`${getHeader(gameState)}
<div class="game">
<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
<form class="game__content">
  <div class="game__option">
    <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
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
    <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
    <label class="game__answer  game__answer--photo">
      <input name="question2" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input name="question2" type="radio" value="paint">
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
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
</div>
</div>
${getFooter(footerData.creationDate)}`;

const game1 = getElementFromTemplate(template);
const linkToStartScreen = game1.querySelector(`.back`);
const elementsOfFirstQuestion = game1.querySelectorAll(`[name="question1"]`);
const elementsOfSecondQuestion = game1.querySelectorAll(`[name="question2"]`);
const questions = [elementsOfFirstQuestion, elementsOfSecondQuestion];
const questionsAnswered = [false, false];

linkToStartScreen.addEventListener(`click`, () => renderScreen(intro));

const createHandler = (index) => () => {
  questionsAnswered[index] = true;
  if (questionsAnswered[0] === true && questionsAnswered[1] === true) {
    renderScreen(nextScreen);
  }
};

questions.forEach((question, i) => question.forEach((variant) => variant.addEventListener(`click`, createHandler(i))));

export default game1;
