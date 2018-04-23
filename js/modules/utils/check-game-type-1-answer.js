const chackGameType1Answer = (level, answer) => {
  const elementsOfFirstQuestion = level.querySelectorAll(`[name="question1"]`);
  const elementsOfSecondQuestion = level.querySelectorAll(`[name="question2"]`);
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
};
