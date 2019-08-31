import config from '../config/game';

export default class ScoreUI extends Phaser.GameObjects.Container {
    constructor (scene, x, y) {
        super(scene, x, y);

        this._label = new Phaser.GameObjects.Text(scene, 0, 0, 'Score: ', { fontFamily: 'Arial, Sans'});

        this._score = new Phaser.GameObjects.Text(scene, 50, 0, '0', { fontFamily: 'Arial, Sans'});

        this.add(this._label);
        this.add(this._score);

        scene.scene.get('PlayGame').data.events.on(`changedata-${config.data.playerScoreKey}`, (scene, value) => {
            this._score.setText(value);
        });
    }
}