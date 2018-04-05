// Функция подсчета следующего состояния игры

// 10 вопросов + не больше 3 ошибок - игра закончена
// в противном случае - проигрыш

// засчитатьОтвет(предыдущееСостояние, правильныйЛи, времяОтвета) -> следующееСостояние

// ответ:
//   правильный +100
//   неправильный

//   быстрый +50
//   медленный -50
//   неправильный 0

// состояние:
//   количествоОчков: 0
//   количествоОставшихсяОтветов: 10
//   количествоЖизней: 3
//   оконченаЛиИгра: нет

// состояние:
//   10 ответов, 3 жизни, 0 очков, игра не окончена

//   отвечаешь неправильно медленно

//   что на выходе?

//   9 ответов, 2 жизни, 0 очков, игра не окончена

import {assert} from 'chai';

const countAnswer = (prevState, answerStatus, elapsedTime) => {
  const newState = prevState;
  if (answerStatus === false || elapsedTime === 0) {
    newState.levels -= 1;
    newState.lives -= 1;
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
  }

  return newState;
};

describe(`Count fail answer`, () => {
  it(`should correct count wrong answer`, () => {
    const previousState = {
      points: 0,
      levels: 10,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 0,
      levels: 9,
      lives: 2,
      isGameEnd: false,
      isGameWin: false
    };
    assert.deepEqual(expectedState, countAnswer(previousState, false, 10));
  });
  it(`should correct count wrong answer`, () => {
    const previousState = {
      points: 50,
      levels: 9,
      lives: 2,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 50,
      levels: 8,
      lives: 1,
      isGameEnd: false,
      isGameWin: false
    };
    assert.deepEqual(expectedState, countAnswer(previousState, false, 10));
  });
  it(`should correct count expired time`, () => {
    const previousState = {
      points: 50,
      levels: 9,
      lives: 2,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 50,
      levels: 8,
      lives: 1,
      isGameEnd: false,
      isGameWin: false
    };
    assert.deepEqual(expectedState, countAnswer(previousState, false, 0));
  });
});

describe(`Count correct answer`, () => {
  it(`should correct count right and middle speed answer`, () => {
    const previousState = {
      points: 0,
      levels: 10,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 100,
      levels: 9,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    assert.deepEqual(expectedState, countAnswer(previousState, true, 15));
  });
  it(`should correct count right and slow answer`, () => {
    const previousState = {
      points: 0,
      levels: 10,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 50,
      levels: 9,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    assert.deepEqual(expectedState, countAnswer(previousState, true, 25));
  });
  it(`should correct count right and fast answer`, () => {
    const previousState = {
      points: 0,
      levels: 10,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 150,
      levels: 9,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    assert.deepEqual(expectedState, countAnswer(previousState, true, 5));
  });
});

