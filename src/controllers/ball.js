// The Ball Controller is concerned with evaluating ball collisions and determining their outcome in the form of potentially telling the ball sprint how to change it's display and/or emitting ball related events

export default class BallController extends Phaser.Events.EventEmitter {
    constructor(scene, ball) {
        super();
        this.ball = ball;
        this.ball.setData('onPaddle', true);
        scene.physics.world.on('worldbounds', (body, up, down) => { this.destroy_ball(body, up, down) });
    }

    destroy_ball(body, up, down) {
        if (down) {
            // Do a thing
            body.gameObject.destroy();
            this.emit('BallDestroyed');
        }
    }
}
