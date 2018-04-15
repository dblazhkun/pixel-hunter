import {createElement} from '../utils/create-element';
import renderHeader from './header';
import renderFooter from './footer';
import renderStats from './stats';
import getGameContent from './game-content';

const renderLevel = (state, level, answers) => {
  const template = `<div class="game">
  <p class="game__task">${level.task}</p>
  ${getGameContent(level)}
  </div>`;

  const element = createElement();
  element.appendChild(renderHeader(state));
  element.appendChild(createElement(template));
  element.appendChild(renderStats(answers));
  element.appendChild(renderFooter());

  return element;
};

export default renderLevel;
