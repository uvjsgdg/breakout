// Ball Sprite is concerned about the display of the ball
// import config from '../config/game';
export default class Ball extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'spriteatlas', 'ball');
    }
}
