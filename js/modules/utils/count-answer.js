const countAnswer = (prevState, answerStatus, elapsedTime) => {
  const newState = prevState;
  if (answerStatus === false || elapsedTime === 0) {
    newState.levels -= 1;
    newState.lives -= 1;
    if (newState.levels === 0 && newState.lives >= 0) {
      newState.isGameEnd = true;
      newState.isGameWin = true;
      newState.points += prevState.lives * 50;
    }
    if (newState.lives < 0) {
      newState.isGameEnd = true;
      newState.isGameWin = false;
    }
  }

  if (answerStatus === true) {
    newState.points += 100;
    newState.levels -= 1;
    if (elapsedTime < 10) {
      newState.points += 50;
    }
    if (elapsedTime > 20) {
      newState.points -= 50;
    }
    if (newState.levels === 0) {
      newState.isGameEnd = true;
      newState.isGameWin = true;
      newState.points += prevState.lives * 50;
    }
  }

  return newState;
};

export default countAnswer;
