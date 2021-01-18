import Phaser from 'phaser';
import config from '../config/config';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    // Title
    this.add
      .text(config.width * 0.5, 50, 'Leaderboard', { fontSize: 40, color: '#f70af7' })
      .setOrigin();

    for (let i = 0; i < 10; i += 1) {
        this.add.text(config.width * 0.5 , config.height * 0.3 + 30 * i, 'Dan: 5000').setOrigin()
    }  
  }
}
