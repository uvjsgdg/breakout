import config from '../config/game.json';
import Powerup from './powerup';

export class BombPowerup extends Powerup {
    constructor (scene, x, y) {
        super(scene, x, y, '09_powerup_bomb');

        this.maxLives = config.powerup.types.bomb.maxLives;
        this.breakable = config.powerup.types.bomb.breakable;
        this.lives = this.maxLives;
    }
}