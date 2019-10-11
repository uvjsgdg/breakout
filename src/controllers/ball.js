// The Ball Controller is concerned with evaluating ball collisions and determining their outcome in the form of potentially telling the ball sprint how to change it's display and/or emitting ball related events

export default class BallController extends Phaser.Events.EventEmitter {
    constructor(scene, ball) {
        super();
        this.ball = ball;
        this.ball.setData('onPaddle', true);
        scene.physics.world.on('worldbounds', (body, up, down) => { this.worldBounds(body, up, down) });
    }

    worldBounds(body, up, down) {
        if (down) {
            this.emit('BallDestroyed');
        }
    }
}
