import {createElement} from '../utils/create-element';
import renderHeader from './header';
import renderStats from './stats';
import getGameContent from './game-content';

const renderLevel = ({state, level, answers, done, fail, lose, win, back}) => {
  const template = `<div class="game">
  <p class="game__task">${level.task}</p>
  ${getGameContent(level)}
  </div>`;

  const header = renderHeader(state, back);
  const currentLevel = createElement(template);
  const stats = renderStats(answers);

  const linkToStartScreen = header.querySelector(`.back`);
  linkToStartScreen.addEventListener(`click`, () => back);

  if (level.gameType === 1) {

    const elementsOfFirstQuestion = currentLevel.querySelectorAll(`[name="question1"]`);
    const elementsOfSecondQuestion = currentLevel.querySelectorAll(`[name="question2"]`);
    const questions = [elementsOfFirstQuestion, elementsOfSecondQuestion];
    const questionsAnswered = [false, false];

    const createHandler = (index, question, variant) => () => {
      if (variant.value === level.images[index].type) {
        questionsAnswered[index] = true;
      } else {
        if (state.lives === 0 && state.levels > 1) {
          lose();
        } else if (state.levels === 1 && state.lives > 0) {
          win(false);
        } else {
          fail();
        }
      }

      if (questionsAnswered[0] === true && questionsAnswered[1] === true) {
        if (state.levels === 1) {
          win(true);
        } else {
          done();
        }
      }
    };

    questions.forEach((question, i) => question.forEach((variant) => variant.addEventListener(`click`, createHandler(i, question, variant))));
  }

  if (level.gameType === 2) {
    const elementsOfQuestion = currentLevel.querySelectorAll(`[name="question1"]`);
    const createHandler = (variant) => () => {
      if (variant.value === level.image.type) {
        if (state.levels === 1) {
          win(true);
        } else {
          done();
        }
      } else {
        if (state.lives === 0 && state.levels > 1) {
          lose();
        } else if (state.levels === 1 && state.lives > 0) {
          win(false);
        } else {
          fail();
        }
      }
    };

    elementsOfQuestion.forEach((variant) => variant.addEventListener(`click`, createHandler(variant)));
  }

  if (level.gameType === 3) {
    const elementsOfQuestion = currentLevel.querySelectorAll(`.game__option`);

    const createHandler = (variant, index) => () => {
      if (level.answer === level.images[index].type) {
        if (state.levels === 1) {
          win(true);
        } else {
          done();
        }
      } else {
        if (state.lives === 0 && state.levels > 1) {
          lose();
        } else if (state.levels === 1 && state.lives > 0) {
          win(false);
        } else {
          fail();
        }
      }
    };

    elementsOfQuestion.forEach((variant, i) => variant.addEventListener(`click`, createHandler(variant, i)));
  }

  return [header, currentLevel, stats];
};

export default renderLevel;
