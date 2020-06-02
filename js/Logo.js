/**************************************************************************************
* Logo Scene (Povin Super Calc)
* @author Doug Park
* @version v1.0
* @desc Show logo
* @date 2018-09-06
**************************************************************************************/
"use strict";

class Logo extends Phaser.Scene {
        constructor() {
            super("Logo");
        }

    create() {
        this.logo = this.add.sprite(10, 5, "logo").setOrigin(0.5, 0.5);
       
        this.logo.setScale(0.5 * deviceScale);
        //this.logo.anchor.setTo(0.5, 0.5);
        Povin.place(this.logo, 0.5, .5)  
    }

    update() {
        //this.time.events.add(1000, this.nextScene, this);   
        var timedEvent = this.time.addEvent({
            delay: 250,
            callback: this.nextScene,
            callbackScope: this
        });
 
    }

    nextScene() {
        this.scene.start('Calc');
    }

};
