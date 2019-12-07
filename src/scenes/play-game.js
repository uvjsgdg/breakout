// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import gameConfig from '../config/game';

import LevelScene from './play-game/level';
import { EventEmitter } from 'events';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        // initiallize our game-wide data...
        this.level = 0;
        this.levelMap = null;

        this.data.set(gameConfig.data.playerLivesKey, gameConfig.player.startingLives);
        this.data.set(gameConfig.data.playerScoreKey, 0);
        this.data.set(gameConfig.data.levelKey, this.level);
        this.data.set(gameConfig.data.levelMapKey, this.levelMap);
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        this.scene.run('UI');

        this.nextLevel();

        this.events.on('LevelComplete', () => {
            this.nextLevel();
        });

        this.events.on('LoseLife', () => {
            this.loseLife();
        });
    }

    nextLevel () {
        const nextLevel = this.level + 1;
        const nextLevelMap = gameConfig.level.configToLevel[nextLevel - 1];

        // went through all the levels
        if (!nextLevelMap) {
            this.gameOver();
        }
        else {
            if (this.levelMap) {
                this.scene.stop(this.levelMap);
            }

            this.scene.add(nextLevelMap, LevelScene, true, {level: nextLevel, levelMap: nextLevelMap});

            this.level = nextLevel;
            this.levelMap = nextLevelMap;
            this.events.emit(`changedata-${gameConfig.data.levelKey}`, this, nextLevel);
        }
    }

    gameOver () {
        this.scene.stop('UI');
        this.scene.stop(this.levelMap);
        this.scene.switch('GameOver');
    }

    loseLife () {
        this.data.set(gameConfig.data.playerLivesKey, this.data.get(gameConfig.data.playerLivesKey) - 1);
        if (this.data.get(gameConfig.data.playerLivesKey) <= 0) {
            console.log('out of lives');
            this.gameOver();
        }
    }

    update () {
        // Debugging: giving myself points
        //this.data.set(gameConfig.data.playerScoreKey, this.data.get(gameConfig.data.playerScoreKey) + gameConfig.player.brickValue);
    }
};
