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
        let text = this.add.text(400, 300, 'Game Over!', { fontFamily: 'Arial, Sans', fontSize: '32px'});
        text.setOrigin(0.5, 0.5);
    }

    update () {
    }
};
