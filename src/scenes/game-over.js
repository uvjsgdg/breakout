// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
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
        this.add.text(400, 300, 'Game Over!', { fontFamily: 'Arial, Sans'});
    }

    update () {
    }
};
