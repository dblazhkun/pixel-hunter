import changeView from './modules/utils/change-view';
import countAnswer from './modules/utils/count-answer';
import getAnswerRating from './modules/utils/get-answer-rating';
import renderIntro from './modules/game/intro';
import renderGreeting from './modules/game/greeting';
import renderRules from './modules/game/rules';
import renderLevel from './modules/game/level';
import renderResults from './modules/game/results';
import {INITIAL_GAME, ANSWERS, LEVELS} from './data/data';

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

  backToIntro() {
    this.showIntro();
  },

  showGreeting() {
    const element = renderGreeting(() => {
      this.showRules();
    });
    changeView(element);
  },

  showRules() {
    const done = (inputValue) => {
      this.playerName = String.raw`${inputValue}`;
      this.startGame();
    };
    const back = () => {
      this.showIntro();
    };
    this.playerName = ``;
    const element = renderRules(done, back);
    changeView(element);
  },

  showLevel({state, levels, answers, done, fail, lose, win, back}) {
    const element = renderLevel({state, level: levels[this.currentLevel], answers, done, fail, lose, win, back});
    changeView(element);
  },

  showResults({state, answers, back}) {
    const element = renderResults({state, answers, back});
    changeView(element);
  },

  startGame() {
    this.state = JSON.parse(JSON.stringify(INITIAL_GAME));
    this.levels = JSON.parse(JSON.stringify(LEVELS));
    this.answers = ANSWERS.slice(0);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showLevel({
      state: this.state,
      levels: this.levels,
      answers: this.answers,
      done: this.handleLevelWin.bind(this),
      fail: this.handleLevelFail.bind(this),
      lose: this.handleGameLose.bind(this),
      win: this.handleGameWin.bind(this),
      back: this.backToIntro.bind(this)
    });
  },

  handleLevelWin() {
    this.answers[this.currentLevel] = getAnswerRating(15);
    this.state = countAnswer(this.state, true, 15);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showLevel({
      state: this.state,
      levels: this.levels,
      answers: this.answers,
      done: this.handleLevelWin.bind(this),
      fail: this.handleLevelFail.bind(this),
      lose: this.handleGameLose.bind(this),
      win: this.handleGameWin.bind(this),
      back: this.backToIntro.bind(this)
    });
  },

  handleLevelFail() {
    this.answers[this.currentLevel] = getAnswerRating();
    this.state = countAnswer(this.state, false, 15);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showLevel({
      state: this.state,
      levels: this.levels,
      answers: this.answers,
      done: this.handleLevelWin.bind(this),
      fail: this.handleLevelFail.bind(this),
      lose: this.handleGameLose.bind(this),
      win: this.handleGameWin.bind(this),
      back: this.backToIntro.bind(this)
    });
  },

  handleGameWin(lastAnswerStatus = false) {
    if (lastAnswerStatus) {
      this.answers[this.currentLevel] = getAnswerRating(15);
      this.state = countAnswer(this.state, true, 15);
    } else {
      this.answers[this.currentLevel] = getAnswerRating();
      this.state = countAnswer(this.state, false, 15);
    }
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showResults({
      state: this.state,
      answers: this.answers,
      back: this.backToIntro.bind(this)
    });
  },

  handleGameLose() {
    this.answers[this.currentLevel] = getAnswerRating();
    this.state = countAnswer(this.state, false, 15);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.showResults({
      state: this.state,
      answers: this.answers,
      back: this.backToIntro.bind(this)
    });
  }
};

App.start();
