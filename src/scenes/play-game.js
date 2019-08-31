// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import PaddleController from "../../controllers/paddle";

export default class PlayGameScene extends Phaser.Scene {
    constructor (config, key = 'PlayGame') {
        super({ key: key });
    }

    init () {
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        this.scene.start('Level');
        this.scene.start('UI');
    }

    update () {
    }
};
