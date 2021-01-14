import Phaser from 'phaser';
import Laser from '../objects/Laser'
import config from '../config/config';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.setTexture('ship');
    this.setPosition(x, y);
    this.deltaX = 10;
    this.deltaY = 10;
    this.scene = scene;
    this.lasers = new Array();
    this.lastShot = new Date().getTime();
    this.shotFrequency = 280;
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

  shootLaser() {
    const time = new Date().getTime();
    if (time - this.lastShot > this.shotFrequency) {
      const laser = new Laser(this.scene, this.x, this.y - 65);
      this.scene.add.existing(laser);
      this.lasers.push(laser);
      this.lastShot = time;
    }
  }


  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    const lasersToDelete = new Array();

    for (let i = 0; i < this.lasers.length; i++) {
      if (this.lasers[i].y <= 0) {
        lasersToDelete.push(this.lasers[i]);
      }
    }

    for (let j = 0; j < lasersToDelete.length; j++) {
      const laserIdx = this.lasers.indexOf(lasersToDelete[j]);
      this.lasers.splice(laserIdx, 1);
      lasersToDelete[j].destroy();
    }
  }
}
