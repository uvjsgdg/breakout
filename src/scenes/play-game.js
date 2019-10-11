// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import gameConfig from '../config/game';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        // initiallize our game-wide data...
        this.level = 1;
        this.levelMap = gameConfig.level.configToLevel[this.level - 1];

        this.data.set(gameConfig.data.playerLivesKey, gameConfig.player.startingLives);
        this.data.set(gameConfig.data.playerScoreKey, 0);
        this.data.set(gameConfig.data.levelKey, this.level);
        this.data.set(gameConfig.data.levelMapKey, this.levelMap);
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        this.scene.run('Level');
        this.scene.run('UI');

        this.levelScene = this.scene.get('Level');

        this.levelScene.events.on('LevelComplete', () => {
            this.nextLevel();
        });

        this.levelScene.events.on('LevelFailed', () => {
            this.gameOver();
        });

        this.levelScene.events.on('LoseLife', () => {
            this.loseLife();
        });
    }

    nextLevel () {
        this.level++;
        this.levelMap = gameConfig.level.configToLevel[this.level - 1];

        // went through all the levels
        if (!this.levelMap) {
            this.gameOver();
        }
        else {
            this.data.set(gameConfig.data.levelKey, this.level);
            this.data.set(gameConfig.data.levelMapKey, this.levelMap);

            this.scene.stop('Level');
            this.scene.start('Level');
        }
    }

    gameOver () {
        this.scene.stop('Level');
        this.scene.stop('UI');
        this.scene.switch('GameOver');
    }

    loseLife () {
        this.data.set(gameConfig.data.playerLivesKey, this.data.get(gameConfig.data.playerLivesKey) - 1);
        if (this.data.get(gameConfig.data.playerLivesKey) <= 0) {
            console.log('out of lives');
            this.levelScene.events.emit('LevelFailed');
        }
    }

    update () {
        // Debugging: giving myself points
        //this.data.set(gameConfig.data.playerScoreKey, this.data.get(gameConfig.data.playerScoreKey) + gameConfig.player.brickValue);
    }
};
