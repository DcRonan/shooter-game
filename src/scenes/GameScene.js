import Phaser from 'phaser';
import EnemyTwo from '../objects/EnemyTwo';
import EnemyOne from '../objects/EnemyOne';
import config from '../config/config';
import Player from '../objects/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });

    this.scoreTotal = 0;
  }

  preload() {
    this.load.image('background', 'assets/images/main-bg.png');
    this.load.image('enemy-one', 'assets/objects/enemy-one.png');
    this.load.image('enemy-two', 'assets/objects/enemy-two.png');
    this.load.image('enemy-laser', 'assets/objects/red-laser.png');
    this.load.image('player-laser', 'assets/objects/blue-laser.png');
    this.load.image('player', 'assets/objects/player-ship.png');
    this.load.audio('laser-sound', 'assets/sounds/laser-sound.ogg');
    this.load.audio('game-over-sound', 'assets/sounds/game-over.ogg');
    this.sys.game.globals.bgMusic.stop();
  }

  create() {
    // Background Image
    const img = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'background',
    );

    const scaleX = this.cameras.main.width / img.width;
    const scaleY = this.cameras.main.height / img.height;
    const scale = Math.max(scaleX, scaleY);
    img.setScale(scale).setScrollFactor(0);

    // Scores Display
    this.scoreText = this.add.text(40, 40, '', {
      font: '24px Courier',
      fill: '#00ff00',
    });

    // Player Ship
    this.player = new Player(this, 400, 500, 'player').setScale(0.5);
    this.add.existing(this.player);

    // Sounds
    this.sfx = {
      laser: this.sound.add('laser-sound'),
      gameOver: this.sound.add('game-over-sound'),
    };

    // KEYS
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyD = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT,
    );
    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
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
          this.player.getData('shotFrequency') - 1,
        );
        this.player.setData('shooting', false);
      }
    }

    // If crash then game over
    this.physics.add.overlap(
      this.player,
      this.enemies,
      function crash(player, enemy) {
        if (!player.getData('dead') && !enemy.getData('dead')) {
          this.sfx.gameOver.play();
          player.dead(false);
          player.shot();
          enemy.dead(true);
          this.sys.game.globals.score = this.scoreTotal;
          this.scoreTotal = 0;
        }
      },
      null,
      this,
    );

    // If shot enemy then enemy dies
    this.physics.add.collider(
      this.playerLasers,
      this.enemies,
      function shootEnemy(playerLaser, enemy) {
        if (enemy) {
          if (enemy.shot !== undefined) {
            enemy.shot();
          }
          this.scoreTotal += 10;
          this.scoreText.setText(`Score: ${this.scoreTotal}`);
          enemy.dead(true);
          playerLaser.destroy();
        }
      },
      null,
      this,
    );

    // If shot then player is dead
    this.physics.add.overlap(
      this.player,
      this.enemyLasers,
      function playerShot(player, laser) {
        if (!player.getData('dead') && !laser.getData('dead')) {
          this.sfx.gameOver.play();
          player.dead(false);
          player.shot();
          laser.destroy();
          this.sys.game.globals.score = this.scoreTotal;
          this.scoreTotal = 0;
        }
      },
      null,
      this,
    );

    // DELETE enemies if they haven't been shot
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth
        || enemy.x > config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.shot !== undefined) {
            enemy.shot();
          }
          enemy.destroy();
        }
      }
    }

    // DELETE enemy lasers
    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    // DELETE player lasers if haven't shot an enemy
    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}
