import changeView from './modules/utils/change-view';
import countAnswer from './modules/utils/count-answer';
import getAnswerRating from './modules/utils/get-answer-rating';
import renderIntro from './modules/game/intro';
import renderGreeting from './modules/game/greeting';
import renderRules from './modules/game/rules';
import renderLevel from './modules/game/level';
import renderResults from './modules/game/results';
import {INITIAL_GAME, ANSWERS, LEVELS} from './data/data';
import {Level1View} from './modules/utils/views';

const App = {
  start() {
    this.showIntro();
  },

  showIntro() {
    const elements = renderIntro(() => {
      this.showGreeting();
    });
    changeView(elements);
  },

  backToIntro() {
    this.showIntro();
  },

  showGreeting() {
    const elements = renderGreeting(() => {
      this.showRules();
    });
    changeView(elements);
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
    const elements = renderRules(done, back);
    changeView(elements);
  },

  showLevel({state, levels, answers, done, fail, lose, win, back}) {
    const level = levels[this.currentLevel];
    switch (level.gameType) {
      case 1:
        this.renderLevel1({level});
        break;
      case 2:
        this.renderLevel2();
        break;
      case 3:
        this.renderLevel3();
        break;
    }
  },

  renderLevel1({level}) {
    const view = new Level1View({level});

    // ['photo', 'photo']
    // ['painting', 'photo']
    view.onAnswer = (answer) => {
      const isCorrect = checkGameType1Answer(level, answer);

      this.countAnswer(isCorrect);
    };

    view.onBack = () => {
      this.showIntro();
    };

    changeView(view.element);
  },

  countAnswer(isCorrect) {
    this.state = countAnswer(this.state, isCorrect, 15);

    if (this.state.isGameEnd) {
      this.showResults(this.state, this.answers);
    } else {
      this.currentLevel++;

      this.showLevel();
    }
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
