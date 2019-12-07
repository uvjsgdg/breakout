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
        this.soundEffects = true;
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
            brickGrid,
            paddle,
        };
    }

    createControllers () {
        let mainGameScene = this.scene.get('PlayGame');

        let { ball, brickGrid, paddle } = this.gameObjects;

        // controllers
        let paddleController = new PaddleController( this, paddle, ball );
        let ballController = new BallController(this, ball);
        let brickController = new BrickController(this);
        let powerupController = new PowerupController(this, paddle, brickGrid);

        // when a ball is destroyed
        ballController.on('BallDestroyed', () => {
            mainGameScene.events.emit('LoseLife');
            paddleController.resetBall();
        });

        // When a Brick is destroyed
        brickController.on('BrickDestroyed', (x, y, tile) => {
            // update the score
            let mainGameScene = this.scene.get('PlayGame');
            this.play("brick_pop");
            mainGameScene.data.set(config.data.playerScoreKey, mainGameScene.data.get(config.data.playerScoreKey) + config.player.brickValue);

            // Check for level completion
            let { ball, brickGrid, paddle } = this.gameObjects;
            let livingBricks = brickGrid.getChildren();
            let breakableBrick = false;
            livingBricks.forEach((brick) => {
                if (brick.breakable && brick.active) {
                    breakableBrick = true;
                }
            });
            if (!breakableBrick) {
                mainGameScene.events.emit('LevelComplete');
            }
            else {
                powerupController.checkPowerup(x, y, tile);
            }
        });

        // when a ball bounces off wall or ceiling
        ballController.on('WallBounce', () => {
            this.play("wall_bounce");
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
        let { ball, brickGrid, paddle } = this.gameObjects;
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
    }

    update () {
        let { ballController, brickController, paddleController } = this.gameControllers;
        //console.log(ballController.ball);
    }

    play (sound) {
        let mainGameScene = this.scene.get('PlayGame');
        if (mainGameScene.soundEffects)
            mainGameScene.sound.play(sound);
        return true;
    }
};
