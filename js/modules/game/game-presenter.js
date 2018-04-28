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

const tick = (time) => {
  return time--;
};


export default class GamePresenter {
  constructor({playerName, onBack, showResults}) {
    this.playerName = playerName;
    this.onBack = onBack;
    this.showResults = showResults;

    this.restart();
  }

  get element() {
    return this.root;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  start() {
    changeView([this.root]);

    this._interval = setInterval(() => {
      this.tick();
      this.updateHeader();
    }, 1000);
  }

  tick() {
    this.time = this.time--;
  }

  updateHeader() {
    const header = new HeaderView({
      state: this.state,
      onBack: this.onBack,
      time: this.time
    });
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  restart() {
    this.state = INITIAL_GAME;
    this.answers = INITIAL_ANSWERS.slice(0);
    this.levels = LEVELS;
    this.time = INITIAL_TIME;
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;

    this.header = new HeaderView({
      state: this.state,
      onBack: this.onBack,
      time: this.time
    });
    this.content = this.createLevel();
    this.stats = new StatsView(this.answers);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.stats.element);

    this._interval = null;

    this.start();
  }

  createLevel() {
    const level = this.levels[this.currentLevel];
    let levelContent;
    switch (level.gameType) {
      case 1:
        levelContent = this.renderLevel1({level, answers: this.answers});
        break;
      case 2:
        levelContent = this.renderLevel2({level, answers: this.answers});
        break;
      case 3:
        levelContent = this.renderLevel3({level, answers: this.answers});
        break;
    }

    // this.root.replaceChild(levelContent.element, this.content.element);
    return levelContent;
  }

  changeLevel() {
    const level = this.createLevel();
    this.root.replaceChild(level.element, this.content.element);
  }

  renderLevel1({level}) {
    const onBack = () => {
      this.onBack();
    };
    const onAnswer = (answer) => {
      const isCorrect = checkGameAnswer(level, answer);

      this.countAnswer(isCorrect);
    };

    const levelView = new Level1View({level, onAnswer, onBack});

    return levelView;
  }

  renderLevel2({level}) {
    const onBack = () => {
      this.onBack();
    };
    const onAnswer = (answer) => {
      const isCorrect = checkGameAnswer(level, answer);

      this.countAnswer(isCorrect);
    };

    const levelView = new Level2View({level, onAnswer, onBack});

    return levelView;
  }

  renderLevel3({level}) {
    const onBack = () => {
      this.showIntro();
    };
    const onAnswer = (answer) => {
      const isCorrect = checkGameAnswer(level, answer);

      this.countAnswer(isCorrect);
    };

    const levelView = new Level3View({level, onAnswer, onBack});

    return levelView;
  }

  countAnswer(isCorrect) {
    this.state = countAnswer(this.state, isCorrect, 15);

    if (isCorrect) {
      this.answers[this.currentLevel] = getAnswerRating(15);
    } else {
      this.answers[this.currentLevel] = getAnswerRating();
    }

    if (this.state.isGameEnd) {
      this.showResults({
        state: this.state,
        answers: this.answers,
        back: this.showGreeting
      });
    } else {
      this.currentLevel++;

      this.changeLevel({
        state: this.state,
        levels: this.levels,
        answers: this.answers,
      });
    }
  }

  handleLevelWin() {
    this.answers[this.currentLevel] = getAnswerRating(15);
    this.state = countAnswer(this.state, true, 15);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.changeLevel({
      state: this.state,
      levels: this.levels,
      answers: this.answers,
    });
  }

  handleLevelFail() {
    this.answers[this.currentLevel] = getAnswerRating();
    this.state = countAnswer(this.state, false, 15);
    this.currentLevel = INITIAL_GAME.levels - this.state.levels;
    this.changeLevel({
      state: this.state,
      levels: this.levels,
      answers: this.answers,
    });
  }

  handleGameWin(lastAnswerStatus = false) {
    if (lastAnswerStatus) {
      this.answers[this.currentLevel] = getAnswerRating(15);
      this.state = countAnswer(this.state, true, 15);
    } else {
      this.answers[this.currentLevel] = getAnswerRating();
      this.state = countAnswer(this.state, false, 15);
    }
    this.currentLevel++;
    this.showResults({
      state: this.state,
      answers: this.answers,
      back: this.backToIntro.bind(this)
    });
  }

  handleGameLose() {
    this.answers[this.currentLevel] = getAnswerRating();
    this.state = countAnswer(this.state, false, 15);
    this.currentLevel++;
    this.showResults({
      state: this.state,
      answers: this.answers,
      back: this.backToIntro.bind(this)
    });
  }

  // showGame() {
  //   this.state = JSON.parse(JSON.stringify(INITIAL_GAME));
  //   this.levels = JSON.parse(JSON.stringify(LEVELS));
  //   this.answers = INITIAL_ANSWERS.slice(0);
  //   this.currentLevel++;
  //   this.changeLevel({
  //     state: this.state,
  //     levels: this.levels,
  //     answers: this.answers,
  //   });
  // }
}

