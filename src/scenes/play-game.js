// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import config from '../config/game';
import KeyBoardController from '../controllers/keyboard';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        this.level = 1;

        this.data.set(config.data.playerLivesKey, config.player.startingLives);
        this.data.set(config.data.playerScoreKey, 0);
        this.data.set(config.data.levelKey, config.level.configToLevel[this.level - 1]);
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        this.scene.run('Level');
        this.scene.run('UI');
        this.keyboardsniffer = new KeyBoardController(this);

        this.levelScene = this.scene.get('Level');

        this.levelScene.events.on('LevelComplete', () => {
            this.gameOver();
        });

        this.levelScene.events.on('LevelFailed', () => {
            this.gameOver();
        });

        this.levelScene.events.on('LoseLife', () => {
            this.loseLife();
        });
    }

    gameOver () {
        this.scene.stop('Level');
        this.scene.stop('UI');
        this.scene.switch('GameOver');
    }

    loseLife () {
        this.data.set(config.data.playerLivesKey, this.data.get(config.data.playerLivesKey) - 1);
        if (this.data.get(config.data.playerLivesKey) <= 0) {
            console.log('out of lives');
            this.levelScene.events.emit('LevelFailed');
        }
    }

    update () {
        // Debugging: giving myself points
        //this.data.set(config.data.playerScoreKey, this.data.get(config.data.playerScoreKey) + config.player.brickValue);
    }
};
