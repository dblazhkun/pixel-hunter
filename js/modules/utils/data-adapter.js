const parseServerLevelAnswer = (levelAnswer) => {
  return {
    src: levelAnswer[`image`][`url`],
    width: levelAnswer[`image`][`width`],
    height: levelAnswer[`image`][`height`],
    type: levelAnswer[`type`] === `painting` ? `paint` : levelAnswer[`type`]
  };
};

const findAnswerOfLevelType3 = (level) => {
  let photos = 0;
  let paints = 0;
  level.images.forEach((image) => {
    switch (image.type) {
      case `photo`:
        photos += 1;
        break;
      case `paint`:
        paints += 1;
        break;
    }
  });

  if (photos > paints) {
    return `paint`;
  }

  return `photo`;
};

export const adaptServerData = (data) => data.map((level) => {
  const adaptedLevel = {
    task: level[`question`]
  };

  switch (level[`type`]) {
    case `two-of-two`:
      adaptedLevel.gameType = 1;
      break;
    case `tinder-like`:
      adaptedLevel.gameType = 2;
      break;
    case `one-of-three`:
      adaptedLevel.gameType = 3;
      break;
  }

  if (adaptedLevel.gameType === 1 || adaptedLevel.gameType === 3) {
    adaptedLevel.images = [];
    level[`answers`].forEach((answer) => {
      adaptedLevel.images.push(parseServerLevelAnswer(answer));
    });
  }

  if (adaptedLevel.gameType === 1) {
    adaptedLevel.answer = [];
    adaptedLevel.images.forEach((it) => {
      adaptedLevel.answer.push(it.type);
    });
  }

  if (adaptedLevel.gameType === 2) {
    adaptedLevel.image = parseServerLevelAnswer(level[`answers`][0]);
    adaptedLevel.answer = adaptedLevel.image.type;
  }

  if (adaptedLevel.gameType === 3) {
    adaptedLevel.answer = findAnswerOfLevelType3(level);
  }

  return adaptedLevel;
});

