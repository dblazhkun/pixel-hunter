import {createElement} from '../utils/create-element';
// import changeView from '../utils/changeView';
import renderHeader from './header';
import renderLevel from './level';
import renderStats from './stats';
import renderFooter from './footer';
import {INITIAL_GAME, LEVELS} from '../../data/data';
// import {changeLevel, canContinue, die} from '../utils/game-utils';
// import {PLAYER_NAME} from './rules';
// console.log(PLAYER_NAME);

let game;

const resetGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  // game.playerName = PLAYER_NAME;
};

const gameContainerElement = createElement();

const updateGame = (state) => {
  gameContainerElement.appendChild(renderHeader(state));
  gameContainerElement.appendChild(renderLevel(LEVELS[state.currentLevel]));
  gameContainerElement.appendChild(renderStats(state));
  gameContainerElement.appendChild(renderFooter());
};

// Load first level on start!
resetGame();
updateGame(game);

export default gameContainerElement;
