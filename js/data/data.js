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

export const LEVELS = [
  {
    gameType: 1,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        type: `photo`
      },
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        type: `paint`
      }
    ],
    answer: [`photo`, `paint`]
  },
  {
    gameType: 2,
    task: `Угадай, фото или рисунок?`,
    image: {
      src: `https://i.imgur.com/DiHM5Zb.jpg`,
      type: `photo`
    },
    answer: `photo`
  },
  {
    gameType: 3,
    task: `Найдите фото среди изображений`,
    images: [
      {
        src: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      },
      {
        src: `https://k32.kn3.net/5C7060EC5.jpg`,
        type: `paint`
      }
    ],
    answer: `photo`,
  },
  {
    gameType: 1,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        width: 1024,
        height: 682,
        type: `photo`
      },
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        width: 600,
        height: 831,
        type: `paint`
      }
    ],
    answer: [`photo`, `paint`]
  },
  {
    gameType: 2,
    task: `Угадай, фото или рисунок?`,
    image: {
      src: `https://i.imgur.com/DiHM5Zb.jpg`,
      type: `photo`
    },
    answer: `photo`
  },
  {
    gameType: 3,
    task: `Найдите фото среди изображений`,
    images: [
      {
        src: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      },
      {
        src: `https://k32.kn3.net/5C7060EC5.jpg`,
        type: `paint`
      }
    ],
    answer: `photo`,
  },
  {
    gameType: 1,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        width: 1024,
        height: 682,
        type: `photo`
      },
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        width: 600,
        height: 831,
        type: `paint`
      }
    ],
    answer: [`photo`, `paint`]
  },
  {
    gameType: 2,
    task: `Угадай, фото или рисунок?`,
    image: {
      src: `https://i.imgur.com/DiHM5Zb.jpg`,
      type: `photo`
    },
    answer: `photo`
  },
  {
    gameType: 3,
    task: `Найдите фото среди изображений`,
    images: [
      {
        src: `http://i.imgur.com/DKR1HtB.jpg`,
        type: `photo`
      },
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        type: `paint`
      },
      {
        src: `https://k32.kn3.net/5C7060EC5.jpg`,
        type: `paint`
      }
    ],
    answer: `photo`,
  },
  {
    gameType: 1,
    task: `Угадайте для каждого изображения фото или рисунок?`,
    images: [
      {
        src: `http://i.imgur.com/1KegWPz.jpg`,
        width: 1024,
        height: 682,
        type: `photo`
      },
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        width: 600,
        height: 831,
        type: `paint`
      }
    ],
    answer: [`photo`, `paint`]
  }
];

