// The Powerup Controller
import gameConfig from '../config/game';
import PowerupSprite from '../sprites/powerup';
import { BombPowerup } from '../sprites/powerupTypes';

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

    checkPowerup(x, y, tile) {
        switch(tile.type) {
            case "brick":
                this.generatePowerupFromBrickTile(x, y, tile);
                break;
            case "powerup":
                this.generatePowerupFromPowerupTile(x, y, tile);
                break;
        }
        
    }

    generatePowerup(x, y, PowerupClass = PowerupSprite, collisionCallback = () => {}) {
        // create new powerup
        let powerup = new PowerupClass(this.scene, x, y);
        this.scene.add.existing(powerup);
        this.scene.physics.add.existing(powerup);

        // push it down to the bottom
        powerup.setVelocity(0, 100);

        // let the paddle collide with it
        this.scene.physics.add.collider(powerup, this.paddleSprite, (powerup, paddle) => {
            collisionCallback(powerup, paddle);

            this.onPaddleCollision(powerup, paddle);
        }, null, this.scene);
    }

    generatePowerupFromBrickTile(x, y, tile) {
        // eventually this will check the brick tile to see if there is a particular powerup to drop, right now just drops the default one (extra life)
        this.generatePowerup(x, y);
    } 

    generatePowerupFromPowerupTile(x, y, tile) {
        let PowerupClass;
        switch(tile.subtype) {
            case "bomb":
                PowerupClass = BombPowerup;
                break;
        }

        // don't try to use a powerup that doesn't exists
        if (!PowerupClass) {
            throw new Error("could not find powerup", tile);
        }

        this.generatePowerup(x, y, PowerupClass, (powerup, paddle) => {
            this.scene.events.emit("BallIsExplosiveStarted");
        });
    } 
}
