// The UI subscene is concerned with display ui game objects that represent things such as score and balls remaining
import ScoreUI from '../../ui/score';

export default class UIScene extends Phaser.Scene {
    constructor (config, key = 'UI') {
        super({ key: key });
    }

    init () {
    }

    preload () {
        // load all the resources required for this scene before using them
    }

    create () {
        let score = new ScoreUI(this, 650, 10);
        this.add.existing(score);
    }

    update () {
    }
};
