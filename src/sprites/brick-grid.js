// The Brick Grid is concerned with display of a grid of bricks 
import config from '../config/game';
import { BlueBrick, GreenBrick, YellowBrick, OrangeBrick, RedBrick, PurpleBrick, WhiteBrick, BrownBrick } from './coloredBrick';
import { BombPowerup } from './powerupTypes';

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

                if (!tileType || !tileType.match(/^(brick|powerup)$/)) {
                    continue;
                }

                let tileSprite;
                switch(tileType) {
                    case "brick":
                        tileSprite = this.createBrick(tile.properties.color, this.x + tile.width / 2 + x * tile.width, this.y + tile.height / 2 + y * tile.height);
                        break;
                    case "powerup":
                        tileSprite = this.createPowerup(tile.properties.subtype, this.x + tile.width / 2 + x * tile.width, this.y + tile.height / 2 + y * tile.height);
                        break;
                }

                this.add(tileSprite);
                this.scene.add.existing(tileSprite);
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
            "white": WhiteBrick,
            "brown": BrownBrick
        };

        const BrickClass = map[brickType];

        return new BrickClass(this.scene, x, y);
    }

    createPowerup (powerupType, x, y) {
        const map = {
            "bomb": BombPowerup
        };

        const PowerupClass = map[powerupType];

        return new PowerupClass(this.scene, x, y);
    }
}
