// The Brick Controller is concerned with evaluating brick collisions and determining their outcome in the form of potentially telling the brick sprint how to change it's display and/or emitting brick related events
import config from '../config/game';

export default class BrickController extends Phaser.Events.EventEmitter {
    constructor (scene) {
        super();
        this.scene = scene;
        this.on('ballBrickCollision', (ball, brick) => {
            this.onBrickCollision(ball, brick);
        });
        this.on('BrickDestroyed', () => {
            // apply the score from breaking the brick
            let mainGameScene = scene.scene.get('PlayGame');
            mainGameScene.sound.play("brick_pop");
            mainGameScene.data.set(config.data.playerScoreKey, mainGameScene.data.get(config.data.playerScoreKey) + config.player.brickValue);

            // Check for level completion
            let { ball, brickGrid, paddle } = scene.gameObjects;
            let livingBrick = brickGrid.getFirstAlive();
            if (!livingBrick) {
                scene.events.emit('LevelComplete');
            }
        });
    }

    onBrickCollision(ball, brick) {
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
