import config from '../config/game.json';
import Brick from '../sprites/brick';

export class BlueBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, '01_blue_brick');

        this.maxLives = config.brick.colors.blue.maxLives;
        this.breakable = config.brick.colors.blue.breakable;
        this.lives = this.maxLives;
    }
}

export class GreenBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, '02_green_brick');

        this.maxLives = config.brick.colors.green.maxLives;
        this.breakable = config.brick.colors.green.breakable;
        this.lives = this.maxLives;
    }
}

export class YellowBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, '07_yellow_brick');

        this.maxLives = config.brick.colors.yellow.maxLives;
        this.breakable = config.brick.colors.yellow.breakable;
        this.lives = this.maxLives;
    }
}

export class OrangeBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, '03_orange_brick');

        this.maxLives = config.brick.colors.orange.maxLives;
        this.breakable = config.brick.colors.orange.breakable;
        this.lives = this.maxLives;
    }
}

export class RedBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, '05_red_brick');

        this.maxLives = config.brick.colors.red.maxLives;
        this.breakable = config.brick.colors.red.breakable;
        this.lives = this.maxLives;
    }
}

export class PurpleBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, '04_purple_brick');

        this.maxLives = config.brick.colors.purple.maxLives;
        this.breakable = config.brick.colors.purple.breakable;
        this.lives = this.maxLives;
    }
}

export class WhiteBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, '06_white_brick');

        this.maxLives = config.brick.colors.white.maxLives;
        this.breakable = config.brick.colors.white.breakable;
        this.lives = this.maxLives;
    }
}

export class BrownBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, '08_brown_brick');

        this.maxLives = config.brick.colors.brown.maxLives;
        this.breakable = config.brick.colors.brown.breakable;
        this.lives = this.maxLives;
    }
}
