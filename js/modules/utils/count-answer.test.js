import {assert} from 'chai';
import countAnswer from './count-answer';

describe(`Counting failed answer`, () => {
  it(`should correctly count wrong answer`, () => {
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
    assert.deepEqual(countAnswer(previousState, false, 10), expectedState);
  });
  it(`should correctly count wrong answer`, () => {
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
    assert.deepEqual(countAnswer(previousState, false, 10), expectedState);
  });
});

describe(`Counting correct answer`, () => {
  it(`should correctly count the right answer with middle speed`, () => {
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
    assert.deepEqual(countAnswer(previousState, true, 15), expectedState);
  });
  it(`should correctly count the right answer with slow speed`, () => {
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
    assert.deepEqual(countAnswer(previousState, true, 25), expectedState);
  });
  it(`should correctly count the right answer with fast speed`, () => {
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
    assert.deepEqual(countAnswer(previousState, true, 5), expectedState);
  });
});

describe(`Counting correct end of the game`, () => {
  it(`should correctly count the right answer with middle speed, when the level was the last`, () => {
    const previousState = {
      points: 900,
      levels: 1,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 1150,
      levels: 0,
      lives: 3,
      isGameEnd: true,
      isGameWin: true
    };
    assert.deepEqual(countAnswer(previousState, true, 15), expectedState);
  });
  it(`should correctly count the right answer with fast speed, when the level was the last`, () => {
    const previousState = {
      points: 900,
      levels: 1,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 1200,
      levels: 0,
      lives: 3,
      isGameEnd: true,
      isGameWin: true
    };
    assert.deepEqual(countAnswer(previousState, true, 5), expectedState);
  });
  it(`should correctly count the right answer with slow speed, when the level was the last`, () => {
    const previousState = {
      points: 900,
      levels: 1,
      lives: 3,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 1100,
      levels: 0,
      lives: 3,
      isGameEnd: true,
      isGameWin: true
    };
    assert.deepEqual(countAnswer(previousState, true, 25), expectedState);
  });
  it(`should correctly count the wrong answer, when the level was the last`, () => {
    const previousState = {
      points: 700,
      levels: 1,
      lives: 1,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 700,
      levels: 0,
      lives: 0,
      isGameEnd: true,
      isGameWin: true
    };
    assert.deepEqual(countAnswer(previousState, false, 25), expectedState);
  });
});

describe(`Counting correct lose of the game`, () => {
  it(`should correctly count the wrong answer, when the lives was over`, () => {
    const previousState = {
      points: 600,
      levels: 1,
      lives: 0,
      isGameEnd: false,
      isGameWin: false
    };
    const expectedState = {
      points: 600,
      levels: 0,
      lives: -1,
      isGameEnd: true,
      isGameWin: false
    };
    assert.deepEqual(countAnswer(previousState, false, 15), expectedState);
  });
});
