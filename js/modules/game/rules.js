import {createElement} from '../utils/create-element';
import changeView from '../utils/change-view';
import renderHeader from './header';
import renderFooter from './footer';
import game from './game';
import intro from './intro';

const template = `<div class="rules">
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
</div>`;


const renderRules = (done, back) => {
  const rules = createElement();
  rules.appendChild(renderHeader(null, back));
  rules.appendChild(createElement(template));
  rules.appendChild(renderFooter());

  const rulesInput = rules.querySelector(`.rules__input`);
  const linkToNextScreen = rules.querySelector(`.rules__button`);
  let playerName = ``;

  rulesInput.addEventListener(`input`, () => {
    linkToNextScreen.removeAttribute(`disabled`);
    playerName = String.raw`${rulesInput.value}`;
    if (rulesInput.value.length < 1) {
      linkToNextScreen.setAttribute(`disabled`, `disabled`);
    }
  });

  linkToNextScreen.addEventListener(`click`, () => done(playerName));

  return rules;
};

export default renderRules;
