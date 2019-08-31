// The UI subscene is concerned with display ui game objects that represent things such as score and balls remaining
import LivesUI from '../../ui/lives';
import LevelUI from '../../ui/level';
import ScoreUI from '../../ui/score';
import KeyBoardController from '../../controllers/keyboard';

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
        let level = new LevelUI(this, 400, 10);
        let score = new ScoreUI(this, 650, 10);
        this.add.existing(lives);
        this.add.existing(level);
        this.add.existing(score);
        this.keyboardsniffer = new KeyBoardController(this);
    }

    update () {
    }
};
