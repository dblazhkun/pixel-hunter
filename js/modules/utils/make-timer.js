const makeTimer = (time) => {
  return ({
    remaningTime: time,
    tick() {
      this.remaningTime -= 1;
      if (this.remaningTime === 0) {
        this.timeIsOver = true;
      }
    },
    timeIsOver: false
  });
};

export default makeTimer;
