import {INITIAL_GAME, INITIAL_TIME, INITIAL_ANSWERS, LEVELS, changeLevel, die, tick} from './data';
import getAnswerRating from '../modules/utils/get-answer-rating';
import countAnswer from '../modules/utils/count-answer';

export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.start();
  }

  get state() {
    return this._state;
  }

  get answers() {
    return this._answers;
  }

  get time() {
    return this._time;
  }

  get currentLevel() {
    return LEVELS[INITIAL_GAME.levels - this._state.levels];
  }

  die() {
    this._time = INITIAL_TIME;
    this._answers[this.currentLevel] = getAnswerRating();
    this._state = countAnswer(this._state, false, INITIAL_TIME - this._time);
  }

  win() {
    this._time = INITIAL_TIME;
    this._answers[this.currentLevel] = getAnswerRating();
    this._state = countAnswer(this._state, true, INITIAL_TIME - this._time);
  }

  start() {
    this._state = INITIAL_GAME;
    this._time = INITIAL_TIME;
    this._answers = INITIAL_ANSWERS;
  }

  isDead() {
    return this._state.lives < 0;
  }

  tick() {
    this._time -= 1;
  }
}

