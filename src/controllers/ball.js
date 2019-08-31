// The Ball Controller is concerned with evaluating ball collisions and determining their outcome in the form of potentially telling the ball sprint how to change it's display and/or emitting ball related events

export default class BallController {
    constructor(scene, ball) {
        this.ball = ball;
        this.ball.setData('onPaddle', true);
    }
}
