// The Level subscene is concerned about displaying game sprites and establishing collisions between those sprites that, when emitted, call their respective controllers (e.g. ball sprite collides with something calls the ball controller and the other controller of the sprite the ball hit)
import config from '../../config/game';

import BrickGrid from '../../sprites/brick-grid';
import Ball from '../../sprites/ball';
import PaddleSprite from '../../sprites/paddle';
import PowerupSprite from '../../sprites/powerup';

import PaddleController from "../../controllers/paddle";
import BallController from "../../controllers/ball";
import BrickController from "../../controllers/brick";
import PowerupController from "../../controllers/powerup";

import KeyBoardController from '../../controllers/keyboard';

export default class LevelScene extends Phaser.Scene {
    constructor (config) {
        super(config);
    }

    init (data) {
        this.level = data.level;
        this.levelMap = data.levelMap;
    }

    preload () {
        // loading current level data
        this.load.tilemapTiledJSON(this.levelMap, `${this.levelMap}.json` )
    }

    create () {
        this.physics.world.setBoundsCollision(true, true, true, true);

        this.createSprites();

        this.createControllers();

        this.createColliders();

        this.keyboardsniffer = new KeyBoardController(this);
    }

    createSprites () {
        let brickGrid = new BrickGrid(this, config.brickGrid.startPosX, config.brickGrid.startPosY, this.levelMap);
        this.add.existing(brickGrid);

        let ball = new Ball(this, 400, 550);
        this.add.existing(ball);

        let paddle = new PaddleSprite(this, 350, 580);
        this.add.existing(paddle);

        let powerup = new PowerupSprite(this, 500, 100);
        this.add.existing(powerup);

        // physics enabled for each sprite
        this.physics.add.existing(paddle);
        this.physics.add.existing(ball);
        this.physics.add.existing(powerup);

        // powerup sprite physics settings
        powerup.setVelocity(0, 100);

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
            brickGrid,
            paddle,
            powerup
        };
    }

    createControllers () {
        let mainGameScene = this.scene.get('PlayGame');

        let { ball, brickGrid, paddle, powerup } = this.gameObjects;

        // controllers
        let paddleController = new PaddleController( this, paddle, ball );
        let ballController = new BallController(this, ball);
        let brickController = new BrickController(this);
        let powerupController = new PowerupController(this);

        // when a brick is destroyed check to see if
        ballController.on('BallDestroyed', () => {
            mainGameScene.events.emit('LoseLife');
            paddleController.resetBall();
        });

        // when a ball bounces off wall or ceiling
        ballController.on('WallBounce', () => {
            mainGameScene.sound.play("wall_bounce");
        });

        // store our create controllers into gameControllers namespace for later use
        this.gameControllers = {
            ballController,
            brickController,
            paddleController,
            powerupController
        };

        paddleController.resetBall();
    }

    createColliders () {
        let { ball, brickGrid, paddle, powerup } = this.gameObjects;
        let {
            ballController,
            brickController,
            paddleController,
            powerupController
        } = this.gameControllers;

        // paddle detects ball collided with it
        this.physics.add.collider(ball, paddle, () => {
            paddleController.onBallCollision(ball, paddle);
        }, null, this);

        // brick detects ball collided with it
        this.physics.add.collider(ball, brickGrid, (ball, brick) => {
            brickController.emit('ballBrickCollision', ball, brick);
        }, null, this);

        this.physics.add.collider(powerup, paddle, (powerup, paddle) => {
            powerupController.onPaddleCollision(powerup, paddle);
        }, null, this)
    }

    update () {
        let { ballController, brickController, paddleController } = this.gameControllers;
        //console.log(ballController.ball);
    }
};
