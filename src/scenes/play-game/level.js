// The Level subscene is concerned about displaying game sprites and establishing collisions between those sprites that, when emitted, call their respective controllers (e.g. ball sprite collides with something calls the ball controller and the other controller of the sprite the ball hit)
import Brick from '../../sprites/brick';
import Ball from '../../sprites/ball';
import PaddleController from "../../controllers/paddle";


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
        this.physics.world.setBoundsCollision(true, true, true, true);
        let bricks = this.add.group();

        for (let i = 1; i <= 11; i++) {
            let newBrick = new Brick(this, 64 * i, 200);
            bricks.add(newBrick, true);
        }

        let ball = new Ball(this, 400, 550);
        this.add.existing(ball);
        this.physics.add.existing(ball).setCollideWorldBounds(true).setBounce(1);;
        ball.setVelocity(-75, -300);

        let paddle = new PaddleController( this );

        // colliders
        this.physics.add.collider(ball, paddle, paddle.onCollision, null, this);
    }

    update () {
    }
};
