// Ball Sprite is concerned about the display of the ball
import config from '../config/game';
export default class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, config.spriteAtlas.key, 'ball');

        this.velocityMultiplier = 1;

        let ee = scene.events;
        ee.on('increaseVelocity',     () => { 
            if (!this.body) {
                this.scene.physics.add.existing(this);
            }
            this.velocityMultiplier = this.velocityMultiplier * 1.5;
            // console.log("increase speed, " + this.velocityMultiplier);
            this.setVelocityY((this.body.velocity.y * this.velocityMultiplier));
            this.setVelocityX((this.body.velocity.x * this.velocityMultiplier));
            // console.log("x,y speed: " + this.body.velocity.x + ", " + this.body.velocity.y);
        });
        ee.on('decreaseVelocity',     () => { 
            if (!this.body) {
                this.scene.physics.add.existing(this);
            }
            // console.log(this);
            this.velocityMultiplier = this.velocityMultiplier * .6666666666666666666666666666666666666;
            // console.log("decrease speed, " + this.velocityMultiplier);
            this.setVelocityY((this.body.velocity.y * this.velocityMultiplier));
            this.setVelocityX((this.body.velocity.x * this.velocityMultiplier));
            // console.log("x,y speed: " + this.body.velocity.x + ", " + this.body.velocity.y);
        });

        this._isExplosive = false;

        this.setupEventListeners();
    }

    setIsExplosive (isExplosive) {
        this._isExplosive = isExplosive;

        if (isExplosive === true) {
            let particles = this.scene.add.particles(config.spriteAtlas.key, 'muzzleflash3');

            this.particleEmitter = particles.createEmitter({
                alpha: { start: 1, end: 0 },
                scale: { start: 0.2, end: 0.75 },
                accelerationY: -300,
                angle: { min: -85, max: -95 },
                rotate: { min: -180, max: 180 },
                blendMode: 'ADD',
                frequency: 110
            });

            this.particleEmitter.startFollow(this); 
        }
    }

    get isExplosive () { return this._isExplosive; }

    setupEventListeners () {
        this.scene.events.on("BallIsExplosiveStarted", () => {
            this.setIsExplosive(true);
        });
    }
}
