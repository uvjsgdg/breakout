// The Powerup Controller
import gameConfig from '../config/game';

export default class PowerupController extends Phaser.Events.EventEmitter {
    constructor(scene, powerup) {
        super();
        this.scene = scene;
        this.powerup = powerup;
    }

    onLeftWorld(body) {
        console.log("Powerup left the world");
    }

    onPaddleCollision(body) {
        let gamedata = this.scene.scene.get('PlayGame').data;
        let livesKey = gameConfig.data.playerLivesKey;

        console.log("Powerup hit paddle");
        gamedata.set(livesKey, gamedata.get(livesKey) + 1);
        body.destroy();
        console.log("Powerup destroyed");
    }
}
