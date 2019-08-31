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
    constructor (scene, x, y) {
        this.paddles = this.physics.add.group({
            key: 'paddle',
            frameQuantity: 1,
            collideWorldBounds: true,
        });

        return this.paddles;
    }

    // handle game movement
    onInput(){
        console.log('onInput');

        this.paddles.x = pointer.x;
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
