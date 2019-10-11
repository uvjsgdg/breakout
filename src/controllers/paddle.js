// The Paddle Controller is concerned with evaluating paddle collisions and determining their outcome in the form of potentially telling the paddle sprite how to change it's display and/or emitting paddle related events
// I will need the paddle sprite
import PaddleSprite from "../sprites/paddle";
import config from "../config/game";
import gameConfig from "../config/game";

// todo: Listen for player death
// todo: listen for upgrades/level changes

export default class PaddleController extends Phaser.Events.EventEmitter {
    constructor (scene, paddleSprite, ballSprite) {
        super();
        this.paddle = paddleSprite;
        this.ball = ballSprite;
        this.scene = scene;

        this.keySpeed = 200;

        scene.input.on('pointermove', this.onMouseMove, this);

        let ee = scene.scene.get('PlayGame').events;
        ee.on('downLeft',  this.onDownLeft,  this);
        ee.on('upLeft',    this.onUpLeft,    this);
        ee.on('downRight', this.onDownRight, this);
        ee.on('upRight',   this.onUpRight,   this);
        ee.on('downFire',  this.onDownFire,  this);
        ee.on('upFire',    this.onUpFire,    this);

        this.on('PADDLE_HIT_BALL', this.bounceBall, this);
    }

    // handle keyboard movement
    onDownLeft() {
        //console.log('Caught downLeft!');
        this.paddle.setVelocity(-this.keySpeed,0);
        if (this.ball.getData('onPaddle')) {
            this.ball.setVelocity(-this.keySpeed,0);
        }
    }
    onUpLeft() {
        //console.log('Caught upLeft!');
        this.paddle.setVelocity(0,0);
        if (this.ball.getData('onPaddle')) {
            this.ball.setVelocity(0,0);
        }
    }
    onDownRight() {
        //console.log('Caught downRight!');
        this.paddle.setVelocity(this.keySpeed,0);
        if (this.ball.getData('onPaddle')) {
            this.ball.setVelocity(this.keySpeed,0);
        }
    }
    onUpRight() {
        //console.log('Caught upRight!');
        this.paddle.setVelocity(0,0);
        if (this.ball.getData('onPaddle')) {
            this.ball.setVelocity(0,0);
        }
    }

    // handle fire button
    onDownFire() {
        console.log('Caught downFire!');
        if (this.ball.getData('onPaddle')) {
            let mainGameScene = this.scene.scene.get('PlayGame');
            let level = mainGameScene.data.get(config.data.levelKey);
            let ballData = gameConfig.ball;
            this.ball.setVelocity(ballData.velocityX, ballData.velocityY);
            this.ball.setData('onPaddle', false);
        }
    }
    onUpFire() {
        console.log('Caught upFire!');
    }

    // handle mouse movement
    onMouseMove(pointer){
        this.paddle.x = pointer.x;
        if (this.ball.getData('onPaddle')) {
          this.ball.x = pointer.x;
        }
    }

    // generic handler for all collisions
    onCollision(object) {
        // emit an event
        this.emit('PADDLE_HIT_SOMETHING_ELSE');
    }

    onBallCollision(ball, paddle) {
        this.emit('PADDLE_HIT_BALL');
    }

    bounceBall() {
        console.log("Caught PADDLE_HIT_BALL!");
        this.scene.sound.play("paddle_bounce");
        var diff = this.ball.x - this.paddle.x;

        if (!diff) {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            this.ball.setVelocityX(2 + Math.random() * 8);
        }
        else {
            //  Ball is off center from the paddle
            //  Magnify delta * 10
            this.ball.setVelocityX(10 * diff);
        }
    }
};
