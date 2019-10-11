// Powerup Sprite is concerned about the display of the powerup
// import config from '../config/game';
export default class PowerupSprite extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'spriteatlas', 'ball');
        this.setTint(0xff0000);
    }
}
