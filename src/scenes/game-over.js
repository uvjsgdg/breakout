// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import config from '../config/game';

export default class GameOverScene extends Phaser.Scene {
    constructor (config, key = 'GameOver') {
        super({ key: key });
    }

    init () {
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        let gameOverText = this.add.text(400, 200, 'Game Over!', { fontFamily: 'Arial, Sans', fontSize: '64px'});
        gameOverText.setOrigin(0.5, 0.5);

        let yourScoreText = this.add.text(400, 300, 'Your Score Is...', { fontFamily: 'Arial, Sans', fontSize: '32px'});
        yourScoreText.setOrigin(0.5, 0.5);

        let mainGameScene = this.scene.get('PlayGame');

        let scoreText = this.add.text(400, 350, mainGameScene.data.get(config.data.playerScoreKey), { fontFamily: 'Arial, Sans', fontSize: '32px'});
        scoreText.setOrigin(0.5, 0.5)
    }

    update () {
    }
};
