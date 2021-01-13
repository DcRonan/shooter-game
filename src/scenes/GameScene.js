import Phaser from 'phaser';
import Button from '../components/Button';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('background', 'assets/images/main-bg.png');
    this.load.image('ship', 'assets/objects/player-ship.png');
  }

  create() {
    //Background
    this.add.image(0, 0, 'background')

    // Scores Display
    this.data.set('lives', 3);
    this.data.set('level', 5);
    this.data.set('score', 2000);

    const text = this.add.text(40, 40, '', {
      font: '24px Courier',
      fill: '#00ff00',
    });

    text.setText([
      'Level: ' + this.data.get('level'),
      'Lives: ' + this.data.get('lives'),
      'Score: ' + this.data.get('score'),
    ]);

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
