import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({key: 'Boot', active: true})
  }

  preload() {
    this.load.image('logo', 'assets/zenva_logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
