export const INITIAL_GAME = {
  points: 0,
  levels: 10,
  lives: 3,
  isGameEnd: false,
  isGameWin: false
};

export const INITIAL_TIME = 30;

export const changeLevel = (game, levels) => {
  if (typeof levels !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  if (levels < 0) {
    throw new Error(`Level should not be negative value`);
  }

  return Object.assign({}, game, {
    levels
  });
};

export const canContinue = (game) => game.lives >= 0;

export const die = (game) => {
  const lives = game.lives - 1;

  return Object.assign({}, game, {
    lives
  });
};

export const tick = (game) => {
  const time = game.time - 1;

  return Object.assign({}, game, {
    time
  });
};

export const INITIAL_ANSWERS = [`unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`, `unknown`];
