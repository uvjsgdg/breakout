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
require('../../assets/sounds/brick_bounce.mp3');
require('../../assets/sounds/brick_pop.mp3');

// require('../../assets/json/tilemap.json');
// require('../../assets/images/tileset.png');
require('../../assets/json/spriteatlas.json');
require('../../assets/images/spriteatlas.png');
require('../../assets/images/play.png');

// levels
require('../../assets/json/levels/level_1.json');
require('../../assets/json/levels/level_2.json');
require('../../assets/json/levels/level_3.json');
require('../../assets/json/levels/level_4.json');
require('../../assets/json/levels/level_5.json');
require('../../assets/json/levels/level_6.json');
require('../../assets/json/levels/level_7.json');
require('../../assets/json/levels/level_8.json');
require('../../assets/json/levels/level_9.json');
require('../../assets/json/levels/level_10.json');
require('../../assets/json/levels/level_11.json');
require('../../assets/json/levels/level_12.json');
require('../../assets/json/levels/level_13.json');
require('../../assets/json/levels/level_14.json');
require('../../assets/json/levels/level_15.json');
require('../../assets/json/levels/level_16.json');
require('../../assets/json/levels/level_17.json');
require('../../assets/json/levels/level_18.json');
require('../../assets/json/levels/level_19.json');
require('../../assets/json/levels/level_20.json');
require('../../assets/json/levels/level_21.json');
require('../../assets/json/levels/level_22.json');
require('../../assets/json/levels/level_24.json');

export default class LoadingScene extends Phaser.Scene {
    constructor (config, key = 'Loading') {
        super({ key: key });
    }

    preload () {
        // Load Sound Files
        this.load.audio("paddle_bounce","paddle_bounce.mp3");
        this.load.audio("wall_bounce","wall_bounce.mp3");
        this.load.audio("brick_bounce","brick_bounce.mp3");
        this.load.audio("brick_pop","brick_pop.mp3");

        // load sprite atlas
        this.load.atlas(gameConfig.spriteAtlas.key, gameConfig.spriteAtlas.imageFile, gameConfig.spriteAtlas.jsonFile);
    }

    update () {
        this.scene.start('MainMenu');
    }
};
