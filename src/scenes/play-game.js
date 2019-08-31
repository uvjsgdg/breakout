// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import config from '../config/game';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
        this.data.set(config.data.playerLivesKey, config.player.startingLives);
        this.data.set(config.data.playerScoreKey, 0);
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        this.scene.run('Level');
        this.scene.run('UI');
    }

    update () {
        console.log('playerLives', this.data.get(config.data.playerLivesKey));
    }
};
