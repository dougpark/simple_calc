/**************************************************************************************
* CheckOrientation Scene
* @author Doug Park
* @version v1.0
* @desc On mobile force landscape orientation
* @date 2018-09-06
**************************************************************************************/
"use strict";

class CheckOrientation extends Phaser.Scene {
    constructor() {
        super("CheckOrientation");
    }

    create() {
    }

    update () {
        if (GameOptions.orientated) {
            this.scene.start('Logo');
        }
    }

};
