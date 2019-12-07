import config from "../config/game.json";

export default class Cheats {
    constructor (playGameScene) {
        this.playGame = playGameScene;

        if (config.enableCheats === true) {
            Phaser.DOM.DOMContentLoaded(() => {
                console.log("Cheats enabled. Use the console.cheats namespace to access them,");

                console.cheats = {};

                console.cheats.change_level = (level = 1) => {
                    this.changeLevel(level);
                };

                console.cheats.set_infinite_lives = (enable = true) => {
                    this.setInfiniteLives(enable);
                };
            });
        }
    }

    changeLevel (level) {
        console.log("change level", level);

        this.playGame.events.emit("ChangeLevel", { level });
    }

    setInfiniteLives (enable) {
        console.log("set inifinite lives", enable);

        this.playGame.events.emit("SetInfiniteLives", { enable });
    }
}