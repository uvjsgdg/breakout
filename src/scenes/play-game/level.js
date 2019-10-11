// The Level subscene is concerned about displaying game sprites and establishing collisions between those sprites that, when emitted, call their respective controllers (e.g. ball sprite collides with something calls the ball controller and the other controller of the sprite the ball hit)
import config from '../../config/game';

import Brick from '../../sprites/brick';
import Ball from '../../sprites/ball';
import PaddleSprite from '../../sprites/paddle';

import PaddleController from "../../controllers/paddle";
import BallController from "../../controllers/ball";
import BrickController from "../../controllers/brick";

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

        this.createSprites();

        this.createControllers();

        this.createColliders();
    }

    createSprites () {
        const numBricks = 11;

        let bricks = this.physics.add.staticGroup();

        for (let r = numBricks; r > 0; r--) {
            for (let i = 1; i <= r; i++) {
                let newBrick = new Brick(this, 64 * i + (32 * (numBricks - r)), 100 + (32 * (numBricks - r)));
                bricks.add(newBrick, true);
            }
        }

        let ball = new Ball(this, 400, 550);
        this.add.existing(ball);

        let paddle = new PaddleSprite(this, 350, 580);
        this.add.existing(paddle);

        // physics enabled for each sprite
        this.physics.add.existing(paddle);
        this.physics.add.existing(ball);

        // ball sprite physics settings
        ball.setBounce(1, 1);
        ball.setCollideWorldBounds(true);
        ball.body.onWorldBounds = true;

        // paddle sprite physics settings
        paddle.body.collideWorldBounds = true;
        paddle.setImmovable(true);

        // store our created sprites in our gameObjects namespace for later use
        this.gameObjects = {
            ball,
            bricks,
            paddle
        };

        this.resetBall();
    }

    createControllers () {
        let mainGameScene = this.scene.get('PlayGame');

        let { ball, bricks, paddle } = this.gameObjects;

        // controllers
        let paddleController = new PaddleController( this, paddle, ball );
        let ballController = new BallController(this, ball);
        let brickController = new BrickController(this);

        // brickController events...
        // when a brick is destroyed increase player score
        brickController.on('BrickDestroyed', () => {
            mainGameScene.sound.play("brick_pop");
            mainGameScene.data.set(config.data.playerScoreKey, mainGameScene.data.get(config.data.playerScoreKey) + config.player.brickValue);
        });

        // when a brick is destroyed check to see if
        brickController.on('BrickDestroyed', () => {
            let livingBrick = bricks.getFirstAlive();

            if (!livingBrick) {
                this.events.emit('LevelComplete');
            }
        });

        // when a brick is destroyed check to see if
        ballController.on('BallDestroyed', () => {
            this.events.emit('LoseLife');
            this.resetBall();
        });

        // store our create controllers into gameControllers namespace for later use
        this.gameControllers = {
            ballController,
            brickController,
            paddleController
        };
    }

    createColliders () {
        let { ball, bricks, paddle } = this.gameObjects;
        let { ballController, brickController, paddleController } = this.gameControllers;

        // paddle detects ball collided with it
        this.physics.add.collider(ball, paddle, () => {
            paddleController.onBallCollision(ball, paddle);
        }, null, this);

        // brick detects ball collided with it
        this.physics.add.collider(ball, bricks, (ball, brick) => {
            brickController.onBrickCollision(ball, brick);
        }, null, this);
    }

    resetBall() {
        let mainGameScene = this.scene.get('PlayGame');
        let { ball, paddle } = this.gameObjects;
        ball.setVelocity(0);

        let level = mainGameScene.data.get(config.data.levelKey);
        let ballData = config.ball;
        ball.setPosition(paddle.x + ballData.startPosX, paddle.y - ballData.startPosY);
        ball.setData('onPaddle', true);
    }

    update () {
    }
};
