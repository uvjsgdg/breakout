// The Keyboard Controller is concerned capturing Keyboard events
export default class KeyBoardController {
    constructor (scene) {
        this.scene = scene;
        let leftObj = scene.input.keyboard.addKey('LEFT');
        leftObj.on ('down', (event) => { scene.events.emit('downLeft');  });
        leftObj.on ('up',   (event) => { scene.events.emit('upLeft');    });
        let rightObj = scene.input.keyboard.addKey('RIGHT');
        rightObj.on('down', (event) => { scene.events.emit('downRight'); });
        rightObj.on('up',   (event) => { scene.events.emit('upRight');   });
        let spaceObj = scene.input.keyboard.addKey('SPACE');
        spaceObj.on('down', (event) => { scene.events.emit('downFire');  });
        spaceObj.on('up',   (event) => { scene.events.emit('upFire');    });

        // Cheater hook for PowerUp: PaddleGrow
        let fObj = scene.input.keyboard.addKey('F');
        fObj.on('down', (event) => { scene.events.emit('puPaddleGrow');  });
    }
}
