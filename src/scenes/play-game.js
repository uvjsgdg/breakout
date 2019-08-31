// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import config from '../config/game';
import KeyBoardController from '../controllers/keyboard';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        this.data.set(config.data.playerLivesKey, config.player.startingLives);
        this.data.set(config.data.playerScoreKey, 0);
        this.data.set(config.data.levelKey, 'level1');
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        this.scene.run('Level');
        this.scene.run('UI');
        this.keyboardsniffer = new KeyBoardController(this);

        let levelScene = this.scene.get('Level');

        levelScene.events.on('LevelComplete', () => {
            this.gameOver();
        });

        levelScene.events.on('LevelFailed', () => {
            this.gameOver();
        });
    }

    gameOver () {
        this.scene.stop('Level');
        this.scene.stop('UI');
        this.scene.switch('GameOver'); 
    }

    update () {
        // Debugging: giving myself points
        //this.data.set(config.data.playerScoreKey, this.data.get(config.data.playerScoreKey) + config.player.brickValue);
    }
};
