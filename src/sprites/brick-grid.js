// The Brick Grid is concerned with display of a grid of bricks 
import config from '../config/game';
import {BlueBrick, GreenBrick, YellowBrick, OrangeBrick, RedBrick, PurpleBrick, WhiteBrick} from './coloredBrick';

export default class BrickGrid extends Phaser.Physics.Arcade.StaticGroup {
    constructor (scene, x, y) {
        super(scene.physics.world, scene);

        this.x = x;
        this.y = y;

        this.initGrid();
    }

    initGrid () {
        const numBricks = 11;

        for (let r = numBricks; r > 0; r--) {
            for (let i = 1; i <= r; i++) {
                let newBrick = new BlueBrick(this.scene, this.x + 64 * i + (32 * (numBricks - r)), this.y + (32 * (numBricks - r)));
                this.add(newBrick);
                this.scene.add.existing(newBrick);
            }
        }
    }
}
