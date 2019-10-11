// The Powerup Controller
import gameConfig from '../config/game';

export default class PowerupController extends Phaser.Events.EventEmitter {
    constructor(scene, powerup) {
        super();
        this.scene = scene;
        this.powerup = powerup;
    }

    onPaddleCollision(body) {
        let gamedata = this.scene.scene.get('PlayGame').data;
        let livesKey = gameConfig.data.playerLivesKey;

        gamedata.set(livesKey, gamedata.get(livesKey) + 1);
        body.destroy();
    }
}
