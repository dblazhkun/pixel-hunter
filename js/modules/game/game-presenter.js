import changeView from '../utils/change-view';
import countAnswer from '../utils/count-answer';
import getAnswerRating from '../utils/get-answer-rating';
import {INITIAL_GAME, INITIAL_ANSWERS, INITIAL_TIME} from '../../data/data';
import HeaderView from './header-view';
import LevelTwoOfTwoView from './level-two-of-two-view';
import LevelTinderLikeView from './level-tinder-like-view';
import LevelOneOfThreeView from './level-one-of-three-view';
import StatsView from './stats-view';
import checkGameAnswer from '../utils/check-game-answer';

const resizeImages = (blockSize, imageSize) => {
  const ratioArr = [blockSize.width / imageSize.width, blockSize.height / imageSize.height];
  const ratio = Math.min(ratioArr[0], ratioArr[1]);

  // console.log(blockSize);
  // console.log(imageSize);

  // console.log(blockSize.width);
  // console.log(imageSize.width);
  // console.log((blockSize.width / imageSize.width).toFixed(3));
  // console.log(ratioArr);

  return {width: imageSize.width * ratio, height: imageSize.height * ratio};
};

export default class GamePresenter {
  constructor({playerName, levels, onBack, showResults}) {
    this.playerName = playerName;
    this.levels = levels;
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
    this.root.classList.add(`central__inner`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content);
    this.root.appendChild(this.stats.element);
    this.optimizeImgSize();

    this._interval = null;
  }

  optimizeImgSize() {
    const imgs = [...this.content.querySelectorAll(`img`)];
    const level = this.levels[this.currentLevel];

    let blockWidth = level.images ? level.images[0].width : level.image.width;
    let blockHeight = level.images ? level.images[0].height : level.image.height;

    imgs.forEach((item) => item.addEventListener(`load`, () => {
      const blockData = {width: blockWidth, height: blockHeight};

      const imgSizes = {width: item.naturalWidth, height: item.naturalHeight};
      let data = resizeImages(blockData, imgSizes);
      item.setAttribute(`height`, data.height);
      item.setAttribute(`width`, data.width);

    }));
  }

  createLevel() {
    const level = this.levels[this.currentLevel];

    const onAnswer = (answer) => {
      const isCorrect = checkGameAnswer(level, answer);

      this.countAnswer(isCorrect);
    };

    let levelContent;

    switch (level.gameType) {
      case `two-of-two`:
        levelContent = new LevelTwoOfTwoView({level, onAnswer});
        break;
      case `tinder-like`:
        levelContent = new LevelTinderLikeView({level, onAnswer});
        break;
      case `one-of-three`:
        levelContent = new LevelOneOfThreeView({level, onAnswer});
        break;
    }

    levelContent = levelContent.element;

    return levelContent;
  }

  changeLevel() {
    this.stopTimer();
    this.updateHeader();
    this.startTimer();
    const level = this.createLevel();
    this.root.replaceChild(level, this.content);
    this.content = level;
    this.optimizeImgSize();
  }

  countAnswer(isCorrect) {
    const elapsedTime = INITIAL_TIME - this.time;
    this.state = countAnswer(this.state, isCorrect, elapsedTime);

    this.answers[this.currentLevel] = isCorrect ? getAnswerRating(elapsedTime) : getAnswerRating();

    const stats = new StatsView(this.answers);
    this.root.replaceChild(stats.element, this.stats.element);
    this.stats = stats;

    if (this.state.isGameEnd) {
      this.stopTimer();
      this.showResults({
        state: this.state,
        answers: this.answers,
        playerName: this.playerName
      });
    } else {
      this.currentLevel++;
      this.changeLevel();
    }
    this.time = INITIAL_TIME;
  }
}

