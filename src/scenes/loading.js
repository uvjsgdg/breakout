// json imports
import gameConfig from '../config/game.json';

// web fonts
// import WebFont from 'webfontloader';
// require('../../assets/css/fonts.css');
// require('../../assets/fonts/[font].ttf');

// require in other assets to be included but not added to cache at this time

// Load Sound files
require('../../assets/sounds/paddle_bounce.mp3');
require('../../assets/sounds/wall_bounce.mp3');
require('../../assets/sounds/brick_pop.mp3');

// require('../../assets/json/tilemap.json');
// require('../../assets/images/tileset.png');
require('../../assets/json/spriteatlas.json');
require('../../assets/images/spriteatlas.png');
require('../../assets/images/play.png');

// levels
require('../../assets/json/levels/level_1.json');
require('../../assets/json/levels/level_2.json');

export default class LoadingScene extends Phaser.Scene {
    constructor (config, key = 'Loading') {
        super({ key: key });
    }

    preload () {
        // Load Sound Files
        this.load.audio("paddle_bounce","paddle_bounce.mp3");
        this.load.audio("wall_bounce","wall_bounce.mp3");
        this.load.audio("brick_pop","brick_pop.mp3");

        // load sprite atlas
        this.load.atlas(gameConfig.spriteAtlas.key, gameConfig.spriteAtlas.imageFile, gameConfig.spriteAtlas.jsonFile);
    }

    update () {
        this.scene.start('MainMenu');
    }
};
