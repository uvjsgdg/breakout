// The Brick Controller is concerned with evaluating brick collisions and determining their outcome in the form of potentially telling the brick sprint how to change it's display and/or emitting brick related events
export default class BrickController extends Phaser.Events.EventEmitter {
    onBrickCollision(ball, brick) {
        brick.destroy(true);

        this.emit('BrickDestroyed');
    }
};
