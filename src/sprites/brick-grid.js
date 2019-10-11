// The Brick Grid is concerned with display of a grid of bricks 
import config from '../config/game';
import {BlueBrick, GreenBrick, YellowBrick, OrangeBrick, RedBrick, PurpleBrick, WhiteBrick} from './coloredBrick';

export default class BrickGrid extends Phaser.Physics.Arcade.StaticGroup {
    constructor (scene, x, y, level) {
        super(scene.physics.world, scene);

        this.x = x;
        this.y = y;
        this.level = level;

        this.initGrid();
    }

    initGrid () {
        const map = this.scene.make.tilemap({key: this.level});
        const layer = map.getLayer(config.brickGrid.tiledLayerName);

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const tile = layer.data[y][x];
                const tileType = tile.properties.type;
                if (!tileType || tileType !== 'brick') {
                    continue;
                }

                const brick = this.createBrick(tile.properties.color, this.x + tile.width / 2 + x * tile.width, this.y + tile.height / 2 + y * tile.height);
                this.add(brick);
                this.scene.add.existing(brick);
            }
        }
    }

    createBrick (brickType, x, y) {
        const map = {
            "blue": BlueBrick,
            "green": GreenBrick,
            "yellow": YellowBrick,
            "orange": OrangeBrick,
            "red": RedBrick,
            "purple": PurpleBrick,
            "white": WhiteBrick
        };

        const BrickClass = map[brickType];

        return new BrickClass(this.scene, x, y);
    }
}
