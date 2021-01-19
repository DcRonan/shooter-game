import Audio from '../src/util/Audio';

const audio = new Audio();

it('checks if audio turns on', () => {
  audio._musicOn = true;
  expect(audio._musicOn).toBeTruthy;
});

it('checks if audio turns off', () => {
  audio._musicOn = false;
  expect(audio._musicOn).toBeFalsy;
});

it('checks if the class Audio is defined', () => {
  expect(Audio).toBeDefined();
});

it('Audio has a constructor', () => {
  expect(Audio.prototype.constructor).not.toBe(false);
});
