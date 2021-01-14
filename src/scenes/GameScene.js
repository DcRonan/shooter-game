import Phaser from 'phaser';
import Player from '../objects/Player';
import Button from '../components/Button';

export default class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config, 'Game');
    // this.laserGroup;
    this.inputKeys;
  }

  preload() {
    this.load.image('background', 'assets/images/main-bg.png');
    this.load.image('ship', 'assets/objects/player-ship.png');
    this.load.image('laser', 'assets/objects/blue-laser.png');
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

    // this.cursors = this.input.keyboard.createCursorKeys();
    this.ship = new Player(this, 400, 500);
    this.add.existing(this.ship);

    // Player Ship
    // this.addShip();
    // this.addMovement();

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

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

  // addShip() {
  //   const centerX = this.cameras.main.width / 2;
  //   const centerY = this.cameras.main.height / 2;
  //   this.ship = this.add.image(centerX, centerY, 'ship');
  // }

  // addMovement() {
  //   this.inputKeys = [
  //     this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
  //   ];
  // }

  // shootLaser() {
  //   this.laserGroup.fireLaser(this.ship.x, this.ship.y - 20);
  // }

  update() {
    // Shoot laser when 'space bar' is pressed
    // this.inputKeys.forEach((key) => {
    //   if (Phaser.Input.Keyboard.JustDown(key)) {
    //     this.shootLaser();
    //   }
    // });

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
      this.ship.fireLasers();
    }
  }
}
