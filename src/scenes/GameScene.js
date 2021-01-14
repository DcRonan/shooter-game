import Phaser from 'phaser';
import Player from '../objects/Player';
import Button from '../components/Button';
import EnemyOne from '../objects/EnemyOne';

export default class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config, 'Game');
    this.inputKeys;
  }

  preload() {
    this.load.image('background', 'assets/images/main-bg.png');
    this.load.image('ship', 'assets/objects/player-ship.png');
    this.load.image('laser', 'assets/objects/blue-laser.png');
    this.load.image('enemy-one', 'assets/objects/enemy-one.png');
  }

  create() {
    //Background Image
    let img = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'background'
    );

    let scaleX = this.cameras.main.width / img.width;
    let scaleY = this.cameras.main.height / img.height;
    let scale = Math.max(scaleX, scaleY);
    img.setScale(scale).setScrollFactor(0);

    // Player Ship
    this.ship = new Player(this, 400, 500);
    this.add.existing(this.ship);
    // this.addShip();

    // CENTER
    // addShip() {
    //   const centerX = this.cameras.main.width / 2;
    //   const centerY = this.cameras.main.height / 2;
    //   this.ship = this.add.image(centerX, centerY, 'ship');
    // }

    // ENEMIES
    this.enemies = this.physics.add.group();
    this.enemiesTwo = new Array();

    for (let m = 0; m < 15; m++) {
      let x = Math.random() * 800;
      let y = Math.random() * 400;

      this.enemy = new EnemyOne(this, x, y);
      this.add.existing(this.enemy);
      this.enemies.add(this.enemy);
      this.enemiesTwo.push(this.enemy);
    }

    // KEYS
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

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

    // this.menuButton = new Button(
    //   this,
    //   400,
    //   500,
    //   'blueButton1',
    //   'blueButton2',
    //   'Menu',
    //   'Title'
    // );
  }

  update() {
    // Move Player
    if (this.keyA.isDown) {
      this.ship.moveLeft();
    }

    if (this.keyD.isDown) {
      this.ship.moveRight();
    }

    if (this.keyW.isDown) {
      this.ship.moveUp();
    }

    if (this.keyS.isDown) {
      this.ship.moveDown();
    }

    if (this.space.isDown) {
      this.ship.shootLaser();
    }

    for (let i = 0; i < this.enemiesTwo.length; i++) {
      let enemy = this.enemiesTwo[i];
      enemy.update();
  }
  }
}
