import getElementFromTemplate from '../utils/get-element-from-template';
import renderScreen from '../utils/render-screen';
import nextScreen from './greeting';

import {footerData} from '../../data/data';
import getFooter from './footer';

const template = String.raw`<div id="main" class="central__content">
<div id="intro" class="intro">
  <h1 class="intro__asterisk">*</h1>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</div>
</div>
${getFooter(footerData.creationDate)}`;

const intro = getElementFromTemplate(template);

intro.querySelector(`.intro__asterisk`).addEventListener(`click`, () => renderScreen(nextScreen));

export default intro;

