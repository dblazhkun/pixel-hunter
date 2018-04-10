import getElementFromTemplate from '../utils/get-element-from-template';
import renderScreen from '../utils/render-screen';
import nextScreen from './game1';
import intro from './intro';

import {footerData} from '../../data/data';
import getHeader from './header';
import getFooter from './footer';

const template = String.raw`${getHeader()}
<div class="rules">
<h1 class="rules__title">Правила</h1>
<p class="rules__description">Угадай 10 раз для каждого изображения фото <img
  src="img/photo_icon.png" width="16" height="16"> или рисунок <img
  src="img/paint_icon.png" width="16" height="16" alt="">.<br>
  Фотографиями или рисунками могут быть оба изображения.<br>
  На каждую попытку отводится 30 секунд.<br>
  Ошибиться можно не более 3 раз.<br>
  <br>
  Готовы?
</p>
<form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
</form>
</div>
${getFooter(footerData.creationDate)}`;

const rules = getElementFromTemplate(template);
const rulesInput = rules.querySelector(`.rules__input`);
const linkToNextScreen = rules.querySelector(`.rules__button`);
const linkToStartScreen = rules.querySelector(`.back`);

rulesInput.addEventListener(`input`, () => {
  linkToNextScreen.removeAttribute(`disabled`);
  if (rulesInput.value.length < 1) {
    linkToNextScreen.setAttribute(`disabled`, `disabled`);
  }
});

linkToNextScreen.addEventListener(`click`, () => renderScreen(nextScreen));
linkToStartScreen.addEventListener(`click`, () => renderScreen(intro));

export default rules;

