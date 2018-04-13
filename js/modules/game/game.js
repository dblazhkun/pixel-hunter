import {createElement} from '../utils/create-element';
// import changeView from '../utils/changeView';
import renderHeader from './header';
import renderLevel from './level';
import renderStats from './stats';
import renderFooter from './footer';
import countAnswer from '../utils/count-answer';
import {INITIAL_GAME, GAMES, ANSWERS} from '../../data/data';
// import {changeLevel, canContinue, die} from '../utils/game-utils';
// import {PLAYER_NAME} from './rules';
// console.log(PLAYER_NAME);

let game;
let gameAnswers;

const resetGame = () => {
  game = Object.assign({}, INITIAL_GAME);
  gameAnswers = ANSWERS.slice();
  // game.playerName = PLAYER_NAME;
};

const gameContainerElement = createElement();

const updateGame = (gameState) => {
  const currentLevel = INITIAL_GAME.levels - gameState.levels;
  const currentGame = GAMES[currentLevel];
  gameContainerElement.appendChild(renderHeader(gameState));
  gameContainerElement.appendChild(renderLevel(currentGame));
  gameContainerElement.appendChild(renderStats(gameAnswers));
  gameContainerElement.appendChild(renderFooter());

  if (currentGame.gameType === 1) {
    const elementsOfFirstQuestion = gameContainerElement.querySelectorAll(`[name="question1"]`);
    const elementsOfSecondQuestion = gameContainerElement.querySelectorAll(`[name="question2"]`);
    const questions = [elementsOfFirstQuestion, elementsOfSecondQuestion];
    const questionsAnswered = [false, false];

    const createHandler = (index) => () => {
      questionsAnswered[index] = true;
      if (questionsAnswered[0] === true && questionsAnswered[1] === true) {
        gameAnswers[currentLevel] = `correct`;
        console.log(countAnswer);
        game = countAnswer(game, true, 15);
        updateGame(game);
        console.log(gameContainerElement);
        // changeView(gameContainerElement);
      }
    };

    questions.forEach((question, i) => question.forEach((variant) => variant.addEventListener(`click`, createHandler(i))));
  }
};

// Load first level on start!
resetGame();
updateGame(game);

export default gameContainerElement;
