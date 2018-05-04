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
    task: level[`question`],
    gameType: level[`type`]
  };

  if (adaptedLevel.gameType === `two-of-two` || adaptedLevel.gameType === `one-of-three`) {
    adaptedLevel.images = [];
    level[`answers`].forEach((answer) => {
      adaptedLevel.images.push(parseServerLevelAnswer(answer));
    });
  }

  if (adaptedLevel.gameType === `two-of-two`) {
    adaptedLevel.answer = [];
    adaptedLevel.images.forEach((it) => {
      adaptedLevel.answer.push(it.type);
    });
  }

  if (adaptedLevel.gameType === `tinder-like`) {
    adaptedLevel.image = parseServerLevelAnswer(level[`answers`][0]);
    adaptedLevel.answer = adaptedLevel.image.type;
  }

  if (adaptedLevel.gameType === `one-of-three`) {
    adaptedLevel.answer = findAnswerOfLevelType3(adaptedLevel);
  }
  return adaptedLevel;
});

