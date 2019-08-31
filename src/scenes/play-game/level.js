// The Level subscene is concerned about displaying game sprites and establishing collisions between those sprites that, when emitted, call their respective controllers (e.g. ball sprite collides with something calls the ball controller and the other controller of the sprite the ball hit)
import Brick from '../../sprites/brick';
import Ball from '../sprites/ball';

export default class LevelScene extends Phaser.Scene {
    constructor (config, key = 'Level') {
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

         let ball = new Ball(this, 400, 550);
         this.add.existing(ball);
    }

    update () {
    }
};
