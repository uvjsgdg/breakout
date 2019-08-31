// The Brick Sprite is concerned with display of one brick
import config from '../config/game';
export default class Brick extends Phaser.GameObjects.Sprite {
  constructor (scene, x,  y) {
    super(scene, x, y, config.spriteAtlas.key, 'brick')
  }
}