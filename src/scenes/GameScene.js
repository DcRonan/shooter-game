import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game', active: true });
  }

  preload() {
    // this.load.image('logo', 'assets/logo.png');
  }

  create() {
    // this.add.image(400, 300, 'logo');
  }
}
