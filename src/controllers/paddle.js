// The Paddle Controller is concerned with evaluating paddle collisions and determining their outcome in the form of potentially telling the paddle sprite how to change it's display and/or emitting paddle related events
// I will need the paddle sprite
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

        this.ballOnPaddle = true;

        scene.input.on('pointermove', this.onMouseMove, this);

        let ee = scene.events;
        ee.on('downLeft',  this.onDownLeft,  this);
        ee.on('upLeft',    this.onUpLeft,    this);
        ee.on('downRight', this.onDownRight, this);
        ee.on('upRight',   this.onUpRight,   this);
        ee.on('downFire',  this.onDownFire,  this);
        ee.on('upFire',    this.onUpFire,    this);
        ee.on('increaseVelocity',     this.increaseBallVelocity,    this);
        ee.on('decreaseVelocity',     this.decreaseBallVelocity,    this);

        this.on('PADDLE_HIT_BALL', this.bounceBall, this);

        ee.on('puPaddleGrow', this.puPaddleGrow, this);
    }

    // handle keyboard movement
    onDownLeft() {
        //console.log('Caught downLeft!');
        this.paddle.setVelocity(-this.keySpeed,0);
        if (this.ballOnPaddle) {
            this.ball.setVelocity(-this.keySpeed,0);
        }
    }
    onUpLeft() {
        //console.log('Caught upLeft!');
        this.paddle.setVelocity(0,0);
        if (this.ballOnPaddle) {
            this.ball.setVelocity(0,0);
        }
    }
    onDownRight() {
        //console.log('Caught downRight!');
        this.paddle.setVelocity(this.keySpeed,0);
        if (this.ballOnPaddle) {
            this.ball.setVelocity(this.keySpeed,0);
        }
    }
    onUpRight() {
        //console.log('Caught upRight!');
        this.paddle.setVelocity(0,0);
        if (this.ballOnPaddle) {
            this.ball.setVelocity(0,0);
        }
    }

    // handle fire button
    onDownFire() {
        //console.log('Caught downFire!');
        if (this.ballOnPaddle) {
            let ballData = gameConfig.ball;
            this.ball.setVelocity(ballData.velocityX, ballData.velocityY);
            this.ballOnPaddle = false;
        }
    }
    onUpFire() {
        //console.log('Caught upFire!');
    }

    puPaddleGrow() {
        //console.log('Caught POWERUP PaddleGrow');
        this.paddle.setScale(1.5,1);
    }

    // handle mouse movement
    onMouseMove(pointer){
        this.paddle.x = pointer.x;
        if (this.ballOnPaddle) {
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

    increaseBallVelocity() {
        this.ball.velocityMultiplier = this.ball.velocityMultiplier * 1.5;
        console.log("increase speed, " + this.ball.velocityMultiplier);
        this.ball.setVelocityY((this.ball.body.velocity.y * this.ball.velocityMultiplier));
        this.ball.setVelocityX((this.ball.body.velocity.x * this.ball.velocityMultiplier));
        console.log("x,y speed: " + this.ball.body.velocity.x + ", " + this.ball.body.velocity.y);
    }

    decreaseBallVelocity() {
        this.ball.velocityMultiplier = this.ball.velocityMultiplier * .6666666666666666666666666666666666666;
        console.log("decrease speed, " + this.ball.velocityMultiplier);
        this.ball.setVelocityY((this.ball.body.velocity.y * this.ball.velocityMultiplier));
        this.ball.setVelocityX((this.ball.body.velocity.x * this.ball.velocityMultiplier));
        console.log("x,y speed: " + this.ball.body.velocity.x + ", " + this.ball.body.velocity.y);
    }

    bounceBall() {
        //console.log("Caught PADDLE_HIT_BALL!");
        this.scene.sound.play("paddle_bounce");
        var diff = this.ball.x - this.paddle.x;

        if (!diff) {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            this.ball.setVelocityX((4 - Math.random() * 8) * this.ball.velocityMultiplier);
        }
        else {
            //  Ball is off center from the paddle
            //  Magnify delta * 10
            this.ball.setVelocityX((10 * diff) * this.ball.velocityMultiplier);
        }
        console.log("x,y speed: " + this.ball.body.velocity.x + ", " + this.ball.body.velocity.y);
    }
};
