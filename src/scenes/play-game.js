// The Play Game scene is concerned about activating the level sub-scene and ui sub-scene
import Brick from '../sprites/brick';
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
        // let bricks = [];
        let brick = new Brick(this, 200, 200);
        this.add.existing(brick);
        // for (let i = 0; i > 10; i++ ) {
        //     let newBrick = new Brick(this, 200, 200);
        //     bricks.push(newBrick);
        // }
    }

    update () {
    }
};
