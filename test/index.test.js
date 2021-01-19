import Game from '../src/index';

it('checks if the class Game is defined', () => {
  expect(Game).toBeDefined();
});

it('Base is a subclass of Phaser.GameObjects.Sprite', () => {
  expect(Base).toBeSubclassOf(Phaser.GameObjects.Sprite);
});

it('Base has a constructor', () => {
  expect(Base.prototype.constructor).not.toBe(false);
});
