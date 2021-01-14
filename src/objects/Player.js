import Phaser from 'phaser';
import config from '../config/config';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.setTexture('ship');
    this.setPosition(x, y);
    this.deltaX = 5;
    this.deltaY = 5;
    this.scene = scene;
    this.lasers = new Array();
    this.lastShot = new Date().getTime();
    this.shotFrequency = 250;
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

  moveUp() {
    if (this.y > 0) {
      this.y -= this.deltaY;
    }
  }

  moveDown() {
    if (this.y < config.height) {
      this.y += this.deltaY;
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  fireLasers() {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastShot > this.shotFrequency) {
      const shipLaser = new ShipLaser(this.scene, this.x, this.y);
      this.scene.add.existing(shipLaser);
      this.lasers.push(shipLaser);
      this.lastShot = currentTime;
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    const lasersToRemove = new Array();

    for (let i = 0; i < this.lasers.length; i++) {
        if (this.lasers[i].y <= 0) {
            lasersToRemove.push(this.lasers[i]);
        }
    }

    for (let j = 0; j < lasersToRemove.length; j++) {
        var laserIndex = this.lasers.indexOf(lasersToRemove[j]);
        this.lasers.splice(laserIndex, 1);
        lasersToRemove[j].destroy();
    }
}
}
