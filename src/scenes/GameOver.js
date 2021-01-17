import Phaser from 'phaser';
import config from '../config/config'
import Button from '../components/Button'

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.audio('sndOver', 'content/sndBtnOver')
    this.load.audio('sndDown', 'content/sndBtnDown')
  }

  create() {
    this.title = this.add.text(config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.menuButton = new Button(
      this,
      400,
      500,
      'blueButton1',
      'blueButton2',
      'Menu',
      'Title'
    );
  }
}
