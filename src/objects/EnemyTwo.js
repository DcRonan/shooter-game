import Base from '../Base';
import Phaser from 'phaser'

export default class EnemyTwo extends Base {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy-two', 'EnemyTwo');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}
