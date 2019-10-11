// The Brick Controller is concerned with evaluating brick collisions and determining their outcome in the form of potentially telling the brick sprint how to change it's display and/or emitting brick related events
export default class BrickController extends Phaser.Events.EventEmitter {
    onBrickCollision(ball, brick) {
        brick.lives--;
        var MINTINT = 0x666666;
        var tintFactor = Math.round(0x99 * brick.lives / brick.maxLives);
        brick.setTint(MINTINT + 0x010101 * tintFactor);
        console.log(brick.tintTopLeft);
        if (brick.lives == 0) {
            brick.destroy(true);
            this.emit('BrickDestroyed');
        }
    }
};
