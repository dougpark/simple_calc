/**************************************************************************************
* MainMenu Scene (Povin Super Calc)
* @author Doug Park
* @version v1.0
* @desc Display Menu Options
* @date 2018-09-06
**************************************************************************************/
"use strict";

var MainMenu = new Phaser.Class({
            Extends: Phaser.Scene,
            initialize: function mainMenu() {
                Phaser.Scene.call(this, {
                    key: "MainMenu"
                });
            },

    init: function () {
        
        GameOption.level += GameOption.next; // increase the level from last game
        this.boundLevel();

        // save scene context for callback functions
        game.ctx = this;    
    },

    preload: function () {

    },

    create: function () {

        this.input.keyboard.on('keydown_SPACE', function (event) {
            this.nextScene();
        },this);

        

        // background Tile
        this.backTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(1), GameStyle.bodyBackgroundH).setOrigin(.5, 0);
        Povin.place(this.backTile, 0.5, 0);

        // header Tile
        this.headerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.headerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.headerTile, 0.5, 0);

        // footer Tile
        this.footerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.footerTile, 0.5, 0.85);

        // Title Heading
        this.titleHeading = this.add.text(0, 0, 'Povin Super Calc', {
            font: GameStyle.headerFont,
            fill: GameStyle.headerText,
            align: 'center'
        }).setScale(deviceScale);
        this.normScale = this.scaleX;
        this.titleHeading.setOrigin(0.5, 0.5);
        //this.titleHeading.setScale(deviceScale);
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
        this.buttonHome.nextScene = 'Scores';
        Povin.place(this.buttonHome, 0.07, 0.055);

        // Go Button
        // this.buttonGo = this.add.text(0, 0, '      Go      ', {
        //      font: GameStyle.footerFont,
        //      fill: GameStyle.footerText,
        //      backgroundColor: GameStyle.footerTextBackground,
        //      align: 'center'
        //  }).setInteractive();

         this.buttonGo = new TextButton({
             scene: this,
             width: Povin.placeX(.40),
             height: Povin.placeY(.08),
             text: 'Go',
             textFont: GameStyle.footerFont,
             textStyle: GameStyle.footerText,
             backgroundColor: GameStyle.footerTextBackgroundH
         });

         this.buttonGo.on('pointerdown', this.nextScene, this);
         //this.buttonGo.fixedHeight=(Povin.placeY(.1));
         //this.buttonGo.setFixedSize(Povin.placeX(.2),Povin.placeY(.1));
         //this.buttonGo.setOrigin(0.5, 0.5);
         Povin.place(this.buttonGo, 0.5, 0.93);
       

        //
        // Test Type Heading
        //
        this.testTypeHeading = this.add.text(0, 0, 'Test Type', { 
            font: GameStyle.bodyFont, 
            fill: GameStyle.bodyHeading, 
            align: 'center' 
        }).setScale(deviceScale);
        this.normScale = this.scaleX;
        this.testTypeHeading.setOrigin(0.5, 0.5);
        Povin.place(this.testTypeHeading, 0.5, 0.25);

        // Test Type Text
        this.testTypeString = GameOption.arithmeticArray[GameOption.arithmeticType];
        this.testTypeText = this.add.text(0, 0, this.testTypeString, { 
            font: GameStyle.bodyFont, 
            fill: GameStyle.bodyText, 
            align: 'center' 
        }).setScale(deviceScale);
        this.normScale = this.scaleX;
        this.testTypeText.setOrigin(0.5, 0.5);
        Povin.place(this.testTypeText, 0.5, 0.30);

        // Test Type Plus Button
        this.buttonTestTypePlus = new RoundButton({
            scene:this, 
            style:GameStyle.bodyGraphicH,
            type:'plus'
        });
        this.buttonTestTypePlus.on('pointerdown', function () {
            game.ctx.actionOnClickTestType({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonTestTypePlus.direction = 1;
        Povin.place(this.buttonTestTypePlus, 0.9, 0.30);
        
        // Test Type Minus Button
        this.buttonTestTypeMinus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'minus'
        });
        this.buttonTestTypeMinus.on('pointerdown', function () {
            game.ctx.actionOnClickTestType({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonTestTypeMinus.direction = -1;
        Povin.place(this.buttonTestTypeMinus, 0.1, 0.30);
        
        
        //
        // Factor Heading
        //
        this.factorHeading = this.add.text(0, 0, 'Factors', { 
            font: GameStyle.bodyFont, 
            fill: GameStyle.bodyHeading, 
            align: 'center' 
        }).setScale(deviceScale);
        this.normScale = this.scaleX;
        this.factorHeading.setOrigin(0.5, 0.5);
        Povin.place(this.factorHeading, 0.5, 0.55);
        // Factor Text
        this.factorString = GameOption.minFactor + " to "+ GameOption.factor;
        this.factorText = this.add.text(0, 0, this.factorString, { 
            font: GameStyle.bodyFont, 
            fill: GameStyle.bodyText, 
            align: 'center' 
        }).setScale(deviceScale);
        this.normScale = this.scaleX;
        this.factorText.setOrigin(0.5, 0.5);
        Povin.place(this.factorText, 0.5, 0.60);

        // factor Plus Button
        this.buttonfactorPlus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'plus'
        });
        this.buttonfactorPlus.on('pointerdown', function () {
            game.ctx.actionOnClickFactor({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonfactorPlus.type = 'max';
        this.buttonfactorPlus.direction = 1;
        Povin.place(this.buttonfactorPlus, 0.9, 0.60);
        
        // factor Minus Button
        this.buttonfactorMinus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'minus'
        });;
        this.buttonfactorMinus.on('pointerdown', function () {
            game.ctx.actionOnClickFactor({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonfactorMinus.type = 'max';
        this.buttonfactorMinus.direction = -1;
        Povin.place(this.buttonfactorMinus, 0.75, 0.60);
       
        // minFactor Plus Button
        this.buttonMinFactorPlus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'plus'
        });;
        this.buttonMinFactorPlus.on('pointerdown', function () {
            game.ctx.actionOnClickFactor({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonMinFactorPlus.type = 'min';
        this.buttonMinFactorPlus.direction = 1;
        Povin.place(this.buttonMinFactorPlus, 0.25, 0.60);
       
        // minFactor Minus Button
        this.buttonMinFactorMinus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'minus'
        });;
        this.buttonMinFactorMinus.on('pointerdown', function () {
             game.ctx.actionOnClickFactor({
                 target: this,
                 ctx: game.ctx
             });
         });
        this.buttonMinFactorMinus.type = 'min';
        this.buttonMinFactorMinus.direction = -1;
        Povin.place(this.buttonMinFactorMinus, 0.1, 0.60);
        

        //
        // Level Heading
        //
        this.levelHeading = this.add.text(0, 0, 'Level', { 
            font: GameStyle.bodyFont, 
            fill: GameStyle.bodyHeading, 
            align: 'center' 
        }).setScale(deviceScale);
        this.levelHeading.setOrigin(0.5, 0.5);
        Povin.place(this.levelHeading, 0.5, 0.40);
        // Level Text
        this.levelString = GameOption.level;
        this.levelText = this.add.text(0, 0, this.levelString, { 
            font: GameStyle.bodyFont, 
            fill: GameStyle.bodyText, 
            align: 'center' 
        }).setScale(deviceScale);
        this.normScale = this.scaleX;
        this.levelText.setOrigin(0.5, 0.5);
        Povin.place(this.levelText, 0.5, 0.45);

        // level Plus Button
        this.buttonlevelPlus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'plus'
        });
        this.buttonlevelPlus.on('pointerdown', function () {
            game.ctx.actionOnClickLevel({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonlevelPlus.direction = 1;
        Povin.place(this.buttonlevelPlus, 0.9, 0.45);
       
        // level Minus Button
        this.buttonlevelMinus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'minus'
        });;
        this.buttonlevelMinus.on('pointerdown', function () {
            game.ctx.actionOnClickLevel({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonlevelMinus.direction = -1;
        Povin.place(this.buttonlevelMinus, 0.1, 0.45);
       
        //
        // Time Goal Heading
        //
        this.tgHeading = this.add.text(0, 0, 'Time Goal', {
            font: GameStyle.bodyFont,
            fill: GameStyle.bodyHeading,
            align: 'center'
        }).setScale(deviceScale);
        this.normScale = this.scaleX;
        this.tgHeading.setOrigin(0.5, 0.5);
        Povin.place(this.tgHeading, 0.5, 0.70);
        // Time Goal Text
        this.tgString = GameOption.timeGoalArray[GameOption.timeGoal];
        this.tgText = this.add.text(0, 0, this.tgString, {
            font: GameStyle.bodyFont,
            fill: GameStyle.bodyText,
            align: 'center'
        }).setScale(deviceScale);
        this.normScale = this.scaleX;
        this.tgText.setOrigin(0.5, 0.5);
        Povin.place(this.tgText, 0.5, 0.75);

        // Tg Plus Button
        this.buttonTgPlus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'plus'
        });
        this.buttonTgPlus.on('pointerdown', function () {
            game.ctx.actionOnClickTg({
                target:this, 
                ctx:game.ctx});
        });
        this.buttonTgPlus.direction = 1;
        Povin.place(this.buttonTgPlus, 0.9, 0.75);

        // Tg Minus Button
        this.buttonTgMinus = new RoundButton({
            scene: this,
            style: GameStyle.bodyGraphicH,
            type: 'minus'
        });;
        this.buttonTgMinus.on('pointerdown', function () {
             game.ctx.actionOnClickTg({
                 target: this,
                 ctx: game.ctx
             });
         });
        this.buttonTgMinus.direction = -1;
        Povin.place(this.buttonTgMinus, 0.1, 0.75);
        
        //
        // For a specific interactive button
        //
        // this.buttonTgMinus.on('pointerover', function (pointer) {
        //     game.ctx.tgOver({pointer:pointer, target:this, ctx:game.ctx});
        // });
        // this.buttonTgMinus.on('pointerout', function (pointer) {
        //     game.ctx.tgOut({pointer:pointer, target:this, ctx:game.ctx});
        // });
        // this.buttonTgMinus.on('pointerdown', function (pointer) {
        //     game.ctx.tgDown({pointer:pointer, target:this, ctx:game.ctx});
        // });
        // this.buttonTgMinus.on('pointerup', function (pointer) {
        //     game.ctx.tgUp({pointer:pointer, target:this, ctx:game.ctx});
        // });

        // for all interactive objects
        this.input.on('gameobjectdown', this.onObjectDown);
        //this.input.on('gameobjectup', this.onObjectUp);
        this.input.on('gameobjectover', this.onObjectOver);
        this.input.on('gameobjectout', this.onObjectOut);

        // Animate the invader
        var config = {
            key: 'fly',
            frames: this.anims.generateFrameNumbers('invader', {
                frames: [0, 1, 2, 3]
            }),
            frameRate: 20,
            repeat: -1
        };

        this.anims.create(config);
        this.invader = this.add.sprite(400, 100, 'invader').play('fly');
        this.invader.setScale(deviceScale);
        this.normScale = this.scaleX;
        this.invader.setOrigin(0.5, 0.5);
        Povin.place(this.invader, .5, .18);

        // Scale Overlay
        this.scaleOverlay = new ScaleOverlay({ctx: game.ctx});   

    }, // end create:

    //
    // for all interactive buttons
    //
    onObjectDown: function (pointer, target) {    
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale*.8 : target.scaleX*.8),
            scaleY: (target.normScale ? target.normScale*.8: target.scaleY*.8),
            ease: 'Bounce.easeOut',
            duration: 100
        });
         game.ctx.tweens.add({
             targets: target,
             scaleX: (target.normScale ? target.normScale : target.scaleX * 1.25),
             scaleY: (target.normScale ? target.normScale : target.scaleY * 1.25),
             ease: 'Sine.easeInOut',
             delay: 100,
             duration: 100
         });
    },
    onObjectUp: function (pointer, target) {
        // game.ctx.tweens.add({
        //     targets: target,
        //     scaleX: (target.normScale ? target.normScale : target.scaleX*1.25),
        //     scaleY: (target.normScale ? target.normScale : target.scaleY*1.25),
        //     ease: 'Sine.easeInOut',
        //     duration: 100
        // });
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
        // game.ctx.tweens.add({
        //     targets: target,
        //     scaleX: (target.normScale ? target.normScale : target.scaleX*1.2)5,
        //     scaleY: (target.normScale ? target.normScale : target.scaleY*1.25),
        //     ease: 'Sine.easeInOut',
        //     duration: 100
        // });
       /// target.setTint(0xffffff);
    },

    

    actionOnClickTestType: function (config) {
        GameOption.arithmeticType += config.target.direction;
        if (GameOption.arithmeticType > 4) {
            GameOption.arithmeticType = 1;
        }
        if (GameOption.arithmeticType < 1) {
            GameOption.arithmeticType = 4;
        }
        config.ctx.testTypeText.text = GameOption.arithmeticArray[GameOption.arithmeticType];
    },

    actionOnClickFactor: function (config) {
        if (config.target.type == 'max') {
            GameOption.factor += config.target.direction;
            if (GameOption.factor > 15) {
                GameOption.factor = GameOption.minFactor;
            }
            if (GameOption.factor < GameOption.minFactor) {
                GameOption.factor = 15;
            }
            
        } else {
            GameOption.minFactor += config.target.direction;
            if (GameOption.minFactor > GameOption.factor) {
                GameOption.minFactor = 1;
            }
            if (GameOption.minFactor < 1) {
                GameOption.minFactor = GameOption.factor;
            }
        }
        config.ctx.factorText.text = GameOption.minFactor + " to " + GameOption.factor;
    },

    // used by Factor min and max buttons
    boundLevel: function() {
        if (GameOption.level > 15) {
            GameOption.level = 1;
        }
        if (GameOption.level < 1) {
            GameOption.level = 15;
        }

    },

    actionOnClickLevel: function (config) {
        GameOption.level += config.target.direction;
        config.ctx.boundLevel();
        config.ctx.levelText.text = GameOption.level;

    },

    actionOnClickTg: function (config) {
        GameOption.timeGoal += config.target.direction;
        if (GameOption.timeGoal > 5) {
            GameOption.timeGoal = 1;
        }
        if (GameOption.timeGoal < 1) {
            GameOption.timeGoal = 5;
        }
        config.ctx.tgText.text = GameOption.timeGoalArray[GameOption.timeGoal];
    },


    update: function () {
    },
 

    render2: function () {
        var debug = this.this.debug;
        debug.text('height ' + game.config.height, 10, 120);
       
        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.this.renderType], 10, 540, 'white', debug.font);

    },

    nextScene: function () {
        GameOption.buzzer = GameOption.timeGoalValues[GameOption.timeGoal] * 1000;
        GameOption.id = GameOption.playerIdArray[GameOption.playuerId] + '.';
        //GameOption.level = GameOption.maxLevel; // x 
        //GameOption.min = GameOption.minFactor; // y
        GameOption.questionType = GameOption.arithmeticType;
        this.scene.start('Calc');
    },
});