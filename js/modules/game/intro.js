import {createElement} from '../utils/create-element';
import changeView from '../utils/change-view';
import renderFooter from './footer';

const template = String.raw`<div id="main" class="central__content">
<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</div>
</div>`;

const renderIntro = (renderNextScreen) => {
  const intro = createElement();
  intro.appendChild(createElement(template));
  intro.appendChild(renderFooter());

  intro.querySelector(`.intro__asterisk`).addEventListener(`click`, () => changeView(renderNextScreen()));

  return intro;
};

export default renderIntro;
