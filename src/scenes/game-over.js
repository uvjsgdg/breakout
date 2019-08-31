// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import config from '../config/game';
import KeyBoardController from '../controllers/keyboard';

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'GameOver') {
        super({ key: key });
    }

    init () {
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
    }

    update () {
        // Debugging: giving myself points
        //this.data.set(config.data.playerScoreKey, this.data.get(config.data.playerScoreKey) + config.player.brickValue);
    }
};
