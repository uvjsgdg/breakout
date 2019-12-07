// Powerup Sprite is concerned about the display of the powerup
import config from '../config/game';
export default class PowerupSprite extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, type = 'ball') {
        // ball equals extra life powerup for now
        console.log(scene);
        super(scene, x, y, config.spriteAtlas.key, type);

        if (type == 'ball') {
            this.setTint(0xff0000);
        }
    }
}
