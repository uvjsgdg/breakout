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

export default class LoadingScene extends Phaser.Scene {
    constructor (config, key = 'Loading') {
        super({ key: key });
    }

    init () {
        // font loading
        this.areFontsLoaded = true;
    }

    preload () {
        // Load Sound Files
        this.load.audio("paddle_bounce","paddle_bounce.mp3");
        this.load.audio("wall_bounce","wall_bounce.mp3");
        this.load.audio("brick_pop","brick_pop.mp3");

        // load sprite atlas
        this.load.atlas(gameConfig.spriteAtlas.key, gameConfig.spriteAtlas.imageFile, gameConfig.spriteAtlas.jsonFile);

        // load json configuration files
        // this.cache.json.add('assetsConfig', assetsConfig);

        // load web fonts
        /* WebFont.load({
            active: function () {
                this.webfontsLoaded();
            }.bind(this),
            custom: {
                families: ['font name'],
                urls: ['fonts.css']
            }
        }); */
    }

    webfontsloaded () {
        this.areFontsLoaded = true;
    }

    update () {
        if (this.areFontsLoaded) {
            this.input.stopPropagation();
            this.scene.start('MainMenu');
        }
    }
};
