import {createElement} from '../utils/create-element';
import getGameContent from './game-content';

export default (level) => {
  const template = `<div class="game">
  <p class="game__task">${level.task}</p>
  ${getGameContent(level)}
  </div>`;
  return createElement(template);
};
