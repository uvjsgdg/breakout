// The UI subscene is concerned with display ui game objects that represent things such as score and balls remaining
import LivesUI from '../../ui/lives';
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
        let lives = new LivesUI(this, 150, 10);
        let score = new ScoreUI(this, 650, 10);
        this.add.existing(lives);
        this.add.existing(score);
    }

    update () {
    }
};
