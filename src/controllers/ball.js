// The Ball Controller is concerned with evaluating ball collisions and determining their outcome in the form of potentially telling the ball sprint how to change it's display and/or emitting ball related events

export default class BallController extends Phaser.Events.EventEmitter {
    constructor(scene, ball) {
        super();
        this.ball = ball;

        scene.physics.world.on('worldbounds', (body, up, down, left, right) => { this.worldBounds(body, up, down, left, right) });
    }

    worldBounds(body, up, down, left, right) {
        if (down) {
            this.emit('BallDestroyed');
        }
        if (left || right || up) {
            this.emit('WallBounce');
        }
    }
}
