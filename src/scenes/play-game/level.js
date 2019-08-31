// The Level subscene is concerned about displaying game sprites and establishing collisions between those sprites that, when emitted, call their respective controllers (e.g. ball sprite collides with something calls the ball controller and the other controller of the sprite the ball hit)
import Brick from '../../sprites/brick';
import Ball from '../../sprites/ball';
import PaddleSprite from '../../sprites/paddle';
import PaddleController from "../../controllers/paddle";
import BallController from "../../controllers/ball";

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
        let ballController = new BallController(this, ball);
        this.add.existing(ball);

        let paddle = new PaddleSprite(this, 350, 580);
        this.add.existing(paddle);

        // physics enabled for each sprite
        this.physics.add.existing(bricks);
        this.physics.add.existing(paddle);
        this.physics.add.existing(ball);

        // ball sprite physics settings
        ball.setBounce(1, 1);
        ball.setCollideWorldBounds(true);

        // paddle sprite physics settings
        paddle.body.collideWorldBounds = true;

        // controllers
        let paddleController = new PaddleController( this, paddle );

        // colliders
        this.physics.add.collider(ball, paddle, ball => { paddleController.onCollision(ball); }, null, this);
        this.physics.add.collider(ball, bricks);
    }

    update () {
    }
};
