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
    constructor (scene) {
        this.paddle = new PaddleSprite(scene, 400, 580);
        this.paddle.collideWorldBounds = true;

        scene.add.existing( this.paddle );
        scene.physics.add.existing( this.paddle );

        scene.input.on('pointermove', this.onMouseMove, this);
    }

    // handle mouse movement
    onMouseMove(pointer){
        console.log('onMouseMove', pointer, this.paddle);

        this.paddle.x = pointer.x;
    }

    // handle ball collisions
    onBallCollision () {
        console.log('onBallCollision');
    }

    // generic handler for all collisions
    onCollision(object) {
        console.log(object);
        isBall = true;
        if(isBall) {
          this.onBallCollision();
        }
    }
};
