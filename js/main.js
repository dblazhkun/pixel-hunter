import changeView from './modules/utils/change-view';
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
    this.showLevel();
  },

  showLevel() {
    const currentLevel = INITIAL_GAME.levels - this.state.levels;
    const element = renderLevel(this.state, this.games[currentLevel], this.answers);
    changeView(element);
  },

  showWin() {

  },

  showLose() {

  }
};

App.start();
