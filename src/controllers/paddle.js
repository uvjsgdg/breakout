// The Paddle Controller is concerned with evaluating paddle collisions and determining their outcome in the form of potentially telling the paddle sprite how to change it's display and/or emitting paddle related events
// I will need the paddle sprite
import PaddleSprite from "../sprites/paddle";

// Step 1: Draw the Paddle.

// Step 2: Listen for keyboard arrows or mouse movement

// Step 3: Animate movement

// Step 4: Listen for ball collisions

// Step 5: Listen for player death

// Step 5: listen for upgrades/level changes

export default class PaddleController {
    constructor (scene, paddleSprite, ballSprite) {
        this.paddle = paddleSprite;
        this.ball = ballSprite;

        this.keySpeed = 200;

        scene.input.on('pointermove', this.onMouseMove, this);

        let ee = scene.scene.get('PlayGame').events;
        ee.on('downLeft',  this.onDownLeft,  this);
        ee.on('upLeft',    this.onUpLeft,    this);
        ee.on('downRight', this.onDownRight, this);
        ee.on('upRight',   this.onUpRight,   this);
        ee.on('downFire',  this.onDownFire, this);
        ee.on('upFire',    this.onUpFire,   this);

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
            this.ball.setVelocity(75, -300);
            this.ball.setData('onPaddle', false);
        }
    }
    onUpFire() {
        console.log('Caught upFire!');
    }

    // handle mouse movement
    onMouseMove(pointer){
        this.paddle.x = pointer.x;
    }

    // generic handler for all collisions
    onCollision(object) {
      // emit an event
    }

    onBallCollision(ball, paddle)
    {
        var diff = 0;

        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }
};
