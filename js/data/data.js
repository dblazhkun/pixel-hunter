export const INITIAL_GAME = {
  points: 0,
  levels: 10,
  lives: 3,
  isGameEnd: false,
  isGameWin: false
};

export const INITIAL_TIME = 30;

export const AnswerRating = {
  FAST: `fast`,
  CORRECT: `correct`,
  SLOW: `slow`,
  WRONG: `wrong`,
  UNKNOWN: `unknown`,
};

export const INITIAL_ANSWERS = [
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN,
  AnswerRating.UNKNOWN
];

