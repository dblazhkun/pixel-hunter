import {createElement} from '../utils/create-element';
import renderHeader from './header';
import renderFooter from './footer';
import renderStats from './stats';
import getGameContent from './game-content';

const renderLevel = (state, level, answers, done, fail, lose, win, back) => {
  const template = `<div class="game">
  <p class="game__task">${level.task}</p>
  ${getGameContent(level)}
  </div>`;

  const element = createElement();
  element.appendChild(renderHeader(state, back));
  element.appendChild(createElement(template));
  element.appendChild(renderStats(answers));
  element.appendChild(renderFooter());

  if (level.gameType === 1) {
    const linkToStartScreen = element.querySelector(`.back`);
    const elementsOfFirstQuestion = element.querySelectorAll(`[name="question1"]`);
    const elementsOfSecondQuestion = element.querySelectorAll(`[name="question2"]`);
    const questions = [elementsOfFirstQuestion, elementsOfSecondQuestion];
    const questionsAnswered = [false, false];

    linkToStartScreen.addEventListener(`click`, () => back);

    const createHandler = (index, question, variant) => () => {
      if (variant.value === level.images[index].type) {
        questionsAnswered[index] = true;
      } else {
        fail();
      }

      if (questionsAnswered[0] === true && questionsAnswered[1] === true) {
        done();
      }
    };

    questions.forEach((question, i) => question.forEach((variant) => variant.addEventListener(`click`, createHandler(i, question, variant))));
  }

  return element;
};

export default renderLevel;
