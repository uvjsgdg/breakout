// The Brick Controller is concerned with evaluating brick collisions and determining their outcome in the form of potentially telling the brick sprint how to change it's display and/or emitting brick related events
export default class BrickController extends Phaser.Events.EventEmitter {
    constructor (scene) {
        super();
        this.scene = scene;
        this.on('ballBrickCollision', (ball, brick) => {
            this.brickCollision(ball, brick);
        });
    }

    brickCollision(ball, brick) {
        brick.lives--;

        if (brick.lives == 0) {
            this.breakBrick(brick);
        }
        else {
            this.tintBrick(brick);
        }
    }

    breakBrick(brick) {
        brick.destroy(true);
        this.emit('BrickDestroyed');
    }

    tintBrick(brick) {
        var MINTINT = 0x666666;
        var tintFactor = Math.round(0x99 * brick.lives / brick.maxLives);
        brick.setTint(MINTINT + 0x010101 * tintFactor);
        let mainGameScene = this.scene.scene.get('PlayGame');
        mainGameScene.sound.play("brick_bounce");
    }
};
