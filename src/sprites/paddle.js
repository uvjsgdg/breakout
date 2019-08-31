// Paddle Sprite is concerned about the display of the paddle

export default class Paddle extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'spriteatlas', 'paddle');
    }
}
