import {AnswerRating} from '../../data/data';

export default (time) => {
  if (time < 10) {
    return AnswerRating.FAST;
  }
  if (time >= 10 && time < 20) {
    return AnswerRating.CORRECT;
  }
  if (time >= 20) {
    return AnswerRating.SLOW;
  }
  return AnswerRating.WRONG;
};
