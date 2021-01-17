import Phaser from 'phaser';
import EnemyTwo from '../objects/EnemyTwo';
import EnemyOne from '../objects/EnemyOne';
import config from '../config/config';
import Player from '../objects/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/main-bg.png');
    this.load.image('enemy-one', 'assets/objects/enemy-one.png');
    this.load.image('enemy-two', 'assets/objects/enemy-two.png');
    this.load.image('enemy-laser', 'assets/objects/red-laser.png');
    this.load.image('player-laser', 'assets/objects/blue-laser.png');
    this.load.image('player', 'assets/objects/player-ship.png');
    this.load.audio('laser-sound', 'assets/sounds/laser-sound.ogg');
    // this.load.audio('game-over-sound', 'assets/sounds/game-over.ogg')
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

    // Scores Display
    this.data.set('lives', 3);
    this.data.set('level', 5);
    this.data.set('score', 10);

    const text = this.add.text(40, 40, '', {
      font: '24px Courier',
      fill: '#00ff00',
    });

    text.setText([
      'Level: ' + this.data.get('level'),
      'Lives: ' + this.data.get('lives'),
      'Score: ' + this.data.get('score'),
    ]);

    // Player Ship
    this.player = new Player(this, 400, 500, 'player').setScale(0.5);
    this.add.existing(this.player);

    // Sounds
    this.sfx = {
      laser: this.sound.add('laser-sound'),
    };

    // KEYS
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Groups
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    // Enemies
    this.time.addEvent({
      delay: 800,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new EnemyOne(this, Phaser.Math.Between(0, config.width), 0);
        } else {
          enemy = new EnemyTwo(this, Phaser.Math.Between(0, config.width), 0);
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(3, 6) * 0.1);
          this.enemies.add(enemy);
        }
      },
      loop: true,
      callbackScope: this,
    });

    // If crash then game over
    this.physics.add.overlap(
      this.player,
      this.enemies,
      function (player, enemy) {
        if (!player.getData('dead') && !enemy.getData('dead')) {
          player.dead(false);
          player.shot();
          enemy.dead(true);
        }
      }
    );

    // If shot then player is dead
    this.physics.add.overlap(
      this.player,
      this.enemyLasers,
      function (player, laser) {
        if (!player.getData('dead') && !laser.getData('dead')) {
          player.dead(false);
          player.shot();
          laser.destroy();
        }
      }
    );

    // If shot enemy then enemy dies
    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      function (playerLaser, enemy) {
        if (enemy) {
          if (enemy.shot !== undefined) {
            enemy.shot();
          }
          enemy.dead(true);
          playerLaser.destroy();
        }
      }
    );
  }

  update() {
    if (!this.player.getData('dead')) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.up();
      } else if (this.keyS.isDown) {
        this.player.down();
      }
      if (this.keyA.isDown) {
        this.player.left();
      } else if (this.keyD.isDown) {
        this.player.right();
      }

      if (this.space.isDown) {
        this.player.setData('shooting', true);
      } else {
        this.player.setData(
          'shootTime',
          this.player.getData('shotFrequency') - 1
        );
        this.player.setData('shooting', false);
      }
    }
  }
}
