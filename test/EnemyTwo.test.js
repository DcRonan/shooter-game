import EnemyTwo from '../src/objects/EnemyTwo';
import Base from '../src/Base';

it('checks if the class EnemyOne is defined', () => {
  expect(EnemyTwo).toBeDefined();
});

it('EnemyTwo is a subclass of Base', () => {
  expect(EnemyTwo).toBeSubclassOf(Base);
});

it('EnemyTwo has a constructor', () => {
  expect(EnemyTwo.prototype.constructor).not.toBe(false);
});
