export default (time = `wrong`) => {
  if (time < 10) {
    return `fast`;
  }
  if (time >= 10 && time < 20) {
    return `correct`;
  }
  if (time >= 20) {
    return `slow`;
  }
  return time;
};
