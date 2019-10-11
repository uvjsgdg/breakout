import Brick from '../sprites/brick';

export class BlueBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, 'blue_brick');

        this.maxLives = 1;
        this.lives = this.maxLives;
    }
}

export class GreenBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, 'green_brick');

        this.maxLives = 2;
        this.lives = this.maxLives;
    }
}

export class YellowBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, 'yellow_brick');

        this.maxLives = 3;
        this.lives = this.maxLives;
    }
}

export class OrangeBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, 'orange_brick');

        this.maxLives = 4;
        this.lives = this.maxLives;
    }
}

export class RedBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, 'red_brick');

        this.maxLives = 5;
        this.lives = this.maxLives;
    }
}

export class PurpleBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, 'purple_brick');

        this.maxLives = 6;
        this.lives = this.maxLives;
    }
}

export class WhiteBrick extends Brick {
    constructor (scene, x, y) {
        super(scene, x, y, 'white_brick');

        this.maxLives = 100;
        this.lives = this.maxLives;
    }
}
