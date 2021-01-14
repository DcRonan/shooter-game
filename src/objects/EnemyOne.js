import config from '../config/config'

export default class EnemyOne extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.setTexture('enemy-one');
    this.setPosition(x, y);
    scene.physics.world.enable(this);

    this.gameObject = this;
    this.deltaX = 3;
  }

  update() {
    let m = Math.random() * 4;
    m = Math.round(m);

    if (m == 2) {
      this.moveLeft();
    } else if (m == 3) {
      this.moveRight();
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.deltaX;
    }
  }

  moveRight() {
    if (this.x < config.width) {
      this.x += this.deltaX;
    }
  }
}
