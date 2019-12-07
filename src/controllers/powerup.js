// The Powerup Controller
import gameConfig from '../config/game';
import PowerupSprite from '../sprites/powerup';

export default class PowerupController extends Phaser.Events.EventEmitter {
    constructor(scene, paddle, brickGrid) {
        super();
        this.scene = scene;
        this.paddleSprite = paddle;
        this.brickGridSprite = brickGrid;
    }

    onPaddleCollision(body) {
        let gamedata = this.scene.scene.get('PlayGame').data;
        let livesKey = gameConfig.data.playerLivesKey;

        gamedata.set(livesKey, gamedata.get(livesKey) + 1);
        body.destroy();
    }

    checkPowerup(x, y) {
        // create new powerup
        let powerup = new PowerupSprite(this.scene, x, y);
        this.scene.add.existing(powerup);
        this.scene.physics.add.existing(powerup);

        // push it down to the bottom
        powerup.setVelocity(0, 100);

        // let the paddle collide with it
        this.scene.physics.add.collider(powerup, this.paddleSprite, (powerup, paddle) => {
            this.onPaddleCollision(powerup, this.paddleSprite);
        }, null, this.scene);
    }

}
