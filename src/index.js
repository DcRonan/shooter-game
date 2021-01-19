import Phaser from 'phaser';
import config from './config/config';
import Audio from './util/Audio';
import GameScene from './scenes/GameScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import OptionsScene from './scenes/OptionsScene';
import CreditsScene from './scenes/CreditsScene';
import GameOver from './scenes/GameOver';
import Starfield from './scenes/Starfield';
import LeaderBoard from './scenes/LeaderBoard';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = {
      score: 0,
    };
    const audio = new Audio();
    this.globals = { audio, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('GameScene', GameScene);
    this.scene.add('GameOver', GameOver);
    this.scene.add('LeaderBoard', LeaderBoard);
    this.scene.add('Starfield', Starfield);
  }
}

window.game = new Game();
