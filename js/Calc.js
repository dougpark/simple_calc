/**************************************************************************************
* Calc Scene (Povin Super Calc)
* @author Doug Park, Povingames.com
* @email doug@povingames.com
* @version v1.0
* @desc Play the Povin Speed Super Calc game
* @date 2018-09-06
**************************************************************************************/
"use strict"


    
var Calc = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function calc() {
        Phaser.Scene.call(this, {
            key: "Calc"
        });
    },

    init: function() {  
 
        game.ctx = this;
    },

    preload: function() {
        //this.time.advancedTiming = true;
    },

    create: function() 
    {

        // keyboard
        this.createKeyboard();

        // audio
        this.createAudio();

        // background Tile
        this.createTiles();

        // header
        this.createHeader();

        // Go button
        this.createGoButton();

        // for all interactive objects
        this.createTouch();

        // Animate the invaders
        this.createInvaders();
        
    
    }, // end create

    
    update: function() {
  
        
    }, // end update

 
    nextScene: function() {
        this.scene.start('Scores', true, false); // go to Scores
    },

    //
    // for all interactive buttons
    //
    onObjectDown: function (pointer, target) {
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale * .8 : .8),
            scaleY: (target.normScale ? target.normScale * .8 : .8),
            ease: 'Bounce.easeOut',
            duration: 100
        });
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            delay: 100,
            duration: 100
        });
    },
    onObjectUp: function (pointer, target) {
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            duration: 100
        });
    },
    onObjectOver: function (pointer, target) {
        // game.ctx.tweens.add({
        //     targets: target,
        //     scaleX: 1.1,
        //     scaleY: 1.1,
        //     ease: 'Sine.easeInOut',
        //     duration: 100
        // });
        ///target.setTint(0xeb0000);
    },
    onObjectOut: function (pointer, target) {
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            duration: 100
        });
        /// target.setTint(0xffffff);
    },

    createKeyboard: function() {
        this.input.keyboard.on('keydown_A', function (event) {
            game.ctx.actionOnClick1({
                ctx: game.ctx
            });
        });
        this.input.keyboard.on('keydown_S', function (event) {
            game.ctx.actionOnClick2({
                ctx: game.ctx
            });
        });
        this.input.keyboard.on('keydown_D', function (event) {
            game.ctx.actionOnClick3({
                ctx: game.ctx
            });
        });
        this.input.keyboard.on('keydown_SPACE', function (event) {
            game.ctx.actionOnClickGo({
                ctx: game.ctx
            });
        });
    },

    createAudio: function() {
        this.perfectSfx = this.sound.add('perfectSfx');
        this.wrongSfx = this.sound.add('wrongSfx');
        this.lateSfx = this.sound.add('lateSfx');
    },

    createTiles: function () {
        this.backTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(1), GameStyle.bodyBackgroundH).setOrigin(.5, 0);
        Povin.place(this.backTile, 0.5, 0);
        // header Tile
        this.headerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.headerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.headerTile, 0.5, 0);
        // question Tile
        // this.questionTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        // Povin.place(this.questionTile, 0.5, 0.4);
        // footer Tile
        this.footerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.footerTile, 0.5, 0.85);
    },

    createHeader: function () {
        this.titleHeading = this.add.text(0, 0, 'Povin Super Calc', {
            font: GameStyle.headerFont,
            fill: GameStyle.headerText,
            align: 'center'
        }).setScale(deviceScale);
        this.titleHeading.setOrigin(0.5, 0.5);
        Povin.place(this.titleHeading, 0.5, 0.07);
        // Speaker button to start/stop the background music
        this.buttonSpeaker = new SpeakerButton({
            scene: this,
            style: GameStyle.headerGraphicH,
        });
        this.buttonSpeaker.on('pointerdown', function () {
            Povin.actionOnClickSpeaker({
                target: this,
                ctx: game.ctx
            });
        });
        Povin.place(this.buttonSpeaker, 0.9, 0.07);
        Povin.setSpeakerFrame(this.buttonSpeaker);
        // Home button to return to the main menu
        this.buttonHome = new MenuButton({
            scene: this,
            style: GameStyle.headerGraphicH,
        });
        this.buttonHome.on('pointerdown', function () {
            Povin.actionOnClickHome({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonHome.nextScene = 'MainMenu';
        Povin.place(this.buttonHome, 0.07, 0.055);
    },

    createTouch: function () {
        this.input.on('gameobjectdown', this.onObjectDown);
        //this.input.on('gameobjectup', this.onObjectUp);
        this.input.on('gameobjectover', this.onObjectOver);
        this.input.on('gameobjectout', this.onObjectOut);
    },
    
    createInvaders: function () {
        var config = {
            key: 'fly',
            frames: this.anims.generateFrameNumbers('invader', {
                frames: [0, 1, 2, 3]
            }),
            frameRate: 20,
            repeat: -1
        };
        this.anims.create(config);
        // welcome invader
        this.invader = this.add.sprite(0, 0, 'invader').play('fly').setScale(deviceScale);
        this.invader.setOrigin(0.5, 0.5);
        Povin.place(this.invader, .5, .18);
        // Time invader
        this.timeInvader = this.add.sprite(0, 0, 'invader').play('fly').setScale(deviceScale);
        this.timeInvader.setOrigin(0.5, 0.5);
        Povin.place(this.timeInvader, .2, .81);
        game.ctx.tweens.add({
            targets: this.timeInvader,
            x: Povin.placeX(.8),
            y: Povin.placeY(.81),
            ease: 'Phaser.Math.Easing.Linear',
            yoyo: true,
            repeat: -1,
            duration: GameOption.buzzer
        });
    },

    createGoButton: function () {
        this.buttonGo = new TextButton({
            scene: this,
            width: Povin.placeX(.40),
            height: Povin.placeY(.08),
            text: 'Go',
            textFont: GameStyle.footerFont,
            textStyle: GameStyle.footerText,
            backgroundColor: GameStyle.footerTextBackgroundH
        });
        // //this.buttonGo.on('pointerdown', this.actionOnClickGo,this);
        this.buttonGo.on('pointerdown', function () {
            game.ctx.actionOnClickGo({
                target: this,
                ctx: game.ctx
            });
        });
        Povin.place(this.buttonGo, 0.5, 0.93);
        this.buttonGo.inputEnabled = true;
    }
  
});




