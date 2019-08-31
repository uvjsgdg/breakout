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
        let bricks = this.physics.add.staticGroup();

        for (let i = 1; i <= 11; i++) {
            let newBrick = new Brick(this, 64 * i, 200);
            bricks.add(newBrick, true);
        }

        let ball = new Ball(this, 400, 550);
        this.add.existing(ball);

        let paddle = new PaddleSprite(this, 350, 580);
        this.add.existing(paddle);

        // physics enabled for each sprite
        this.physics.add.existing(paddle);
        this.physics.add.existing(ball);

        // ball sprite physics settings
        ball.setData('onPaddle', true);
        ball.setPosition(paddle.x + 10, paddle.y - 24);
        ball.setBounce(1, 1);
        ball.setCollideWorldBounds(true);

        // paddle sprite physics settings
        paddle.body.collideWorldBounds = true;
        paddle.setImmovable(true);

        // store our created sprites in our gameObjects namespace for later use
        this.gameObjects = {
            ball,
            bricks,
            paddle
        };
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
            mainGameScene.data.set(config.data.playerScoreKey, mainGameScene.data.get(config.data.playerScoreKey) + config.player.brickValue);
        });

        // when a brick is destroyed check to see if 
        brickController.on('BrickDestroyed', () => {
            let livingBrick = bricks.getFirstAlive();

            if (!livingBrick) {
                this.events.emit('LevelComplete');
            }
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
        let { ball, paddle } = this.gameObjects;

        ball.setVelocity(0);
        ball.setPosition(paddle.x + 10, paddle.y - 24);
        ball.setData('onPaddle', true);
    }

    update () {
    }
};
