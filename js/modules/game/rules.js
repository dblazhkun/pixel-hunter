import {createElement} from '../utils/create-element';
import renderHeader from './header';

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
  const header = renderHeader(null, back);
  const rules = createElement(template);

  const rulesInput = rules.querySelector(`.rules__input`);
  const linkToNextScreen = rules.querySelector(`.rules__button`);
  let inputValue = ``;

  rulesInput.addEventListener(`input`, () => {
    linkToNextScreen.removeAttribute(`disabled`);
    inputValue = String.raw`${rulesInput.value}`;
    if (rulesInput.value.length < 1) {
      linkToNextScreen.setAttribute(`disabled`, `disabled`);
    }
  });

  linkToNextScreen.addEventListener(`click`, () => {
    return done(inputValue);
  });

  return [header, rules];
};

export default renderRules;
