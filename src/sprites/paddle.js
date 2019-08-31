// Paddle Sprite is concerned about the display of the paddle

export default class Paddle extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'spriteatlas', 'paddle');
    }
}
