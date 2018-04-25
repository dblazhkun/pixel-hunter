export default (level, answer) => {
  if (Array.isArray(answer)) {
    return level.answer.length === answer.length && level.answer.every((it, i)=> it === answer[i]);
  }

  return level.answer === answer;
};
