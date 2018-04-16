import changeView from './modules/utils/change-view';
import countAnswer from './modules/utils/count-answer';
import getAnswerRating from './modules/utils/get-answer-rating';
import renderIntro from './modules/game/intro';
import renderGreeting from './modules/game/greeting';
import renderRules from './modules/game/rules';
import renderLevel from './modules/game/level';
import {INITIAL_GAME, ANSWERS, GAMES} from './data/data';

const App = {
  start() {
    this.showIntro();
  },

  showIntro() {
    const element = renderIntro(() => {
      this.showGreeting();
    });
    changeView(element);
  },

  showGreeting() {
    const element = renderGreeting(() => {
      this.showRules();
    });
    changeView(element);
  },

  showRules() {
    const done = () => {
      this.startGame();
    };
    const back = () => {
      this.showIntro();
    };
    const element = renderRules(done, back);
    changeView(element);
  },

  startGame() {
    this.state = INITIAL_GAME;
    this.games = GAMES;
    this.answers = ANSWERS;
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showLevel(this.state, this.games, this.answers, this.handleLevelWin, this.handleLevelFail, this.handleLevelLose, this.backToIntro);
  },

  handleLevelWin() {
    this.answers[this.currentLevel] = getAnswerRating(15);
    this.state = countAnswer(this.state, true, 15);
    this.showLevel(this.state, this.games, this.answers, this.handleLevelWin, this.handleLevelFail, this.handleLevelLose, this.backToIntro);
  },

  handleLevelFail() {
    this.answers[this.currentLevel] = getAnswerRating();
    this.state = countAnswer(this.state, false, 15);
  },

  backToIntro() {
    this.showIntro();
  },

  showLevel(state, games, answers, done, fail, lose, back) {
    const element = renderLevel(state, games[this.currentLevel], answers, done, fail, lose, back);
    changeView(element);
  },

  showWin() {

  },

  showLose() {

  }
};

App.start();
