import {assert} from 'chai';

const makeTimer = (time) => {
  return ({
    remaningTime: time,
    tick: function () {
      this.remaningTime -= 1;
    }
  });
};


describe(`Count ticks`, () => {
  it(`should correctly count tick call`, () => {
    const previousState = makeTimer(30);
    const expectedState = previousState.remaningTime -= 1;

    assert.deepEqual(makeTimer(30).tick(), expectedState);
  });
});
