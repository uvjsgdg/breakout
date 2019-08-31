// Paddle Sprite is concerned about the display of the paddle

export default class Paddle extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'spriteatlas', 'paddle');

        // visual and interaction modifiers
        this.state = {
          onFire: false,
          isSticky: false,
          isDouble: false,
          isTriple: false,
          isIcy: false,
          isBouncy: false,
          color: 'default',
          width: 100,
          height: 25,
        }

        this.frameWidth = this.state.width;
        this.frameHeight = this.state.height;

    }

    updateState( state, value ){
      if( 'on_fire' === state && value ){
        this.state.onFire = true;
        // todo: do something
        this.emit('PADDLE_ON_FIRE');
      }else if( 'on_fire' === state && !value ){
        this.state.onFire = false;
        // todo: do something
        this.emit('PADDLE_NORMAL');
      }
    }
}
