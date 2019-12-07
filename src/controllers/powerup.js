// The Powerup Controller
import gameConfig from '../config/game';
import PowerupSprite from '../sprites/powerup';

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

    checkPowerup(x, y) {
        let powerup = new PowerupSprite(this.scene, x, y);
        let { ball, brickGrid, paddle } = this.scene.gameObjects;
        this.scene.add.existing(powerup);
        this.scene.physics.add.existing(powerup);
        powerup.setVelocity(0, 100);
        this.scene.physics.add.collider(powerup, paddle, (powerup, paddle) => {
            this.onPaddleCollision(powerup, paddle);
        }, null, this.scene);
    }

}
