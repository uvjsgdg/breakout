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
        let bricks = this.add.group();
        console.log(bricks);
        
        // let brick = new Brick(this, 200, 200);
        // this.add.existing(brick);
        for (let i = 1; i <= 11; i++) {
            // let newBrick = new Brick(this, 64 * i, 200);
            bricks.create(64 * i, 200, Brick);
        }
    }

    update () {
    }
};
