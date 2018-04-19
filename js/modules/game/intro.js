import {createElement} from '../utils/create-element';

const template = String.raw`<div id="main" class="central__content">
<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</div>
</div>`;

const renderIntro = (done) => {
  const intro = createElement(template);

  intro.querySelector(`.intro__asterisk`).addEventListener(`click`, () => done());

  return [intro];
};

export default renderIntro;
