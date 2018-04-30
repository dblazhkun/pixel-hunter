import changeView from '../utils/change-view';
import countAnswer from '../utils/count-answer';
import getAnswerRating from '../utils/get-answer-rating';
import {INITIAL_GAME, INITIAL_ANSWERS, LEVELS, INITIAL_TIME} from '../../data/data';
import HeaderView from './header-view';
import Level1View from './level-1-view';
import Level2View from './level-2-view';
import Level3View from './level-3-view';
import StatsView from './stats-view';
import checkGameAnswer from '../utils/check-game-answer';

export default class GamePresenter {
  constructor({playerName, onBack, showResults}) {
    this.playerName = playerName;
    this.onBack = onBack;
    this.showResults = showResults;
  }

  get element() {
    return this.root;
  }

  abortGame() {
    this.stopTimer();
    this.onBack();
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.tick();
      this.updateHeader();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this._interval);
    this.time = INITIAL_TIME;
  }

  start() {
    this.restart();
    changeView([this.root]);
    // debugger
    this.startTimer();
  }

  tick() {
    this.time--;
    if (this.time <= 0) {
      this.countAnswer(false);
    }
  }

  updateHeader() {
    const header = new HeaderView({
      state: this.state,
      onBack: this.abortGame.bind(this),
      time: this.time
    });
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  restart() {
    this.state = JSON.parse(JSON.stringify(INITIAL_GAME));
    this.levels = JSON.parse(JSON.stringify(LEVELS));
    this.answers = INITIAL_ANSWERS.slice(0);
    this.time = INITIAL_TIME;
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;

    this.header = new HeaderView({
      state: this.state,
      onBack: this.abortGame.bind(this),
      time: this.time
    });
    this.content = this.createLevel();
    this.stats = new StatsView(this.answers);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.stats.element);

    this._interval = null;
  }

  createLevel() {
    const level = this.levels[this.currentLevel];

    const onAnswer = (answer) => {
      const isCorrect = checkGameAnswer(level, answer);

      this.countAnswer(isCorrect);
    };
    let levelContent;
    switch (level.gameType) {
      case 1:
        levelContent = new Level1View({level, onAnswer});
        break;
      case 2:
        levelContent = new Level2View({level, onAnswer});
        break;
      case 3:
        levelContent = new Level3View({level, onAnswer});
        break;
    }

    return levelContent;
  }

  changeLevel() {
    this.stopTimer();
    this.updateHeader();
    this.startTimer();
    const level = this.createLevel();
    this.root.replaceChild(level.element, this.content.element);
    this.content = level;
  }

  countAnswer(isCorrect) {
    const elapsedTime = INITIAL_TIME - this.time;
    this.state = countAnswer(this.state, isCorrect, elapsedTime);

    if (isCorrect) {
      this.answers[this.currentLevel] = getAnswerRating(elapsedTime);
    } else {
      this.answers[this.currentLevel] = getAnswerRating();
    }

    const stats = new StatsView(this.answers);
    this.root.replaceChild(stats.element, this.stats.element);
    this.stats = stats;

    if (this.state.isGameEnd) {
      this.stopTimer();
      this.showResults({
        state: this.state,
        answers: this.answers,
      });
    } else {
      this.currentLevel++;
      this.changeLevel();
    }
    this.time = INITIAL_TIME;
  }
}

