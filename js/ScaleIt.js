/**************************************************************************************
 * ScaleIt Scene (Povin Super Calc)
 * @author Doug Park
 * @version v1.0
 * @desc Display Menu Options
 * @date 2018-09-06
 **************************************************************************************/
"use strict";

var ScaleIt = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function scaleIt() {
        Phaser.Scene.call(this, {
            key: "ScaleIt"
        });
    },

    init: function () {

        this.myFont = 'Courier';

        // copy level array into history array
        // this.copyToHistory();
        // this.typeId = GameOption.getTypeId(); // current typeId
        game.ctx = this;

    },

    copyToHistory: function () {
        for (let key of Object.keys(GameOption.scoreArr)) {
            Povin.historyArr[key] = GameOption.scoreArr[key];
        }
    },

    preload: function () {

    },

    create: function () {

        this.input.keyboard.on('keydown_SPACE', function (event) {
            game.ctx.nextScene();
        });

        // background Tile
        this.backTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(1), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.backTile, 0.5, 0);

        // header Tile
        this.headerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.headerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.headerTile, 0.5, 0);

        // question Tile
        // this.questionTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.75), GameStyle.resultBackgroundH).setOrigin(.5, 0);
        // Povin.place(this.questionTile, 0.5, 0.24);

        // footer Tile
        // this.footerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        // Povin.place(this.footerTile, 0.5, 0.85);

        // Title Heading
        this.titleHeading = this.add.text(0, 0, 'Povin ScaleIt', {
            font: '30px ' + this.myFont,
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

        // for all interactive objects
        this.input.on('gameobjectdown', this.onObjectDown);
        //this.input.on('gameobjectup', this.onObjectUp);
        this.input.on('gameobjectover', this.onObjectOver);
        this.input.on('gameobjectout', this.onObjectOut);

        this.dbs = 'Scale Info\n'+
                        'width x height = ' + width + ' x ' + height + '\n'+
                        'w x h ratio = ' + (width/height) + '\n'+
                        'devicePixelRatio = ' + window.devicePixelRatio + '\n' + 
                        'touchPoint = ' + 44 * window.devicePixelRatio + ' x ' + 44 * window.devicePixelRatio + '\n'+
                        'zoom = ' + zoom + '\n' + 
                        'deviceScale = ' + deviceScale + '\n' + 
                        'Povin.placeX(1) = ' + Povin.placeX(1) + '\n' + 
                        'Povin.placeY(1) = ' + Povin.placeY(1) + '\n' + 
                        '';
        this.aText = this.add.text(0, 0, this.dbs, {
            font: '40px ' + this.myFont,
            fill: '#ebebeb'
        });
        this.aText.setOrigin(0, 0);
        Povin.place(this.aText, 0.1, 0.20);

        this.a1String = '10px Font ABCDEFGHIJKLMNOPQRstuvwxyz';;
        this.a1Text2 = this.add.text(0, 0, this.a1String, {
            font: '10px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        this.a1Text2.setOrigin(0, 0);
        Povin.place(this.a1Text2, 0.1, 0.48);

        this.aString = '20px Font ABCDEFGHIJKLMNOPQRstuvwxyz';;
        this.aText2 = this.add.text(0, 0, this.aString, {
            font: '20px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        this.aText2.setOrigin(0, 0);
        Povin.place(this.aText2, 0.1, 0.50);

        this.bString = '30px Font ABCDEFGHIJKLMNOPQRstuvwxyz';;
        this.bText2 = this.add.text(0, 0, this.bString, {
            font: '30px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        this.bText2.setOrigin(0, 0);
        Povin.place(this.bText2, 0.1, 0.55);

        this.cString = '40px Font ABCDEFGHIJKLMNOPQRstuvwxyz';;
        this.cText2 = this.add.text(0, 0, this.cString, {
            font: '40px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        this.cText2.setOrigin(0, 0);
        Povin.place(this.cText2, 0.1, 0.60);

        this.dString = '20px Font Scale(2) ABCDEFGHIJKLMNOPQRstuvwxyz';;
        this.dText2 = this.add.text(0, 0, this.dString, {
            font: '20px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        }).setScale(2);
        this.dText2.setOrigin(0, 0);
        Povin.place(this.dText2, 0.1, 0.65);

         //this.chart.fillRect(Povin.placeX(.25), Povin.placeY(.90), 44 * window.devicePixelRatio, 44 * window.devicePixelRatio);

        this.buttonGo = new TextButton({
            scene: this,
            width: 44 * window.devicePixelRatio,
            height: 44 * window.devicePixelRatio,
            text: 'Touch\nPoint',
            textFont: '20px ' + this.myFont,
            textStyle: GameStyle.footerText,
            backgroundColor: GameStyle.footerTextBackgroundH,
            scale: 1,
            zoom: 1
        });
        Povin.place(this.buttonGo,.25,.90); 

        this.buttonGo2 = new TextButton({
            scene: this,
            width: 44 * window.devicePixelRatio,
            height: 44 * window.devicePixelRatio,
            text: 'Touch\nPoint',
            textFont: '20px ' + this.myFont,
            textStyle: GameStyle.footerText,
            backgroundColor: GameStyle.footerTextBackgroundH,
            scale: 1,
            zoom: 1
        });
        Povin.place(this.buttonGo2, .5, .90);

        this.buttonGo3 = new TextButton({
            scene: this,
            width: 44 * window.devicePixelRatio,
            height: 44 * window.devicePixelRatio,
            text: 'Touch\nPoint',
            textFont: '20px ' + this.myFont,
            textStyle: GameStyle.footerText,
            backgroundColor: GameStyle.footerTextBackgroundH,
            scale: 1,
            zoom: 1
        });
        Povin.place(this.buttonGo3, .75, .90);


        // TestType Heading
        // this.aString = GameOption.getTypeSt();
        // this.aText = this.add.text(0, 0, this.aString, {
        //     font: '20px ' + this.myFont,
        //     fill: '#ad0000',
        //     align: 'center'
        // }).setScale(deviceScale);
        // this.aText.setOrigin(0.5, 0.5);
        // Povin.place(this.aText, 0.5, 0.20);

        // // Ar Plus Button
        // this.buttonArPlus = new RoundButton({
        //     scene: this,
        //     style: GameStyle.bodyGraphicH,
        //     type: 'plus'
        // });
        // this.buttonArPlus.on('pointerdown', function () {
        //     game.ctx.actionOnClickAr({
        //         target: this,
        //         ctx: game.ctx
        //     });
        // });
        // this.buttonArPlus.direction = 1;
        // Povin.place(this.buttonArPlus, 0.9, 0.20);

        // // ArMinus
        // this.buttonArMinus = new RoundButton({
        //     scene: this,
        //     style: GameStyle.bodyGraphicH,
        //     type: 'minus'
        // });
        // this.buttonArMinus.on('pointerdown', function () {
        //     game.ctx.actionOnClickAr({
        //         target: this,
        //         ctx: game.ctx
        //     });
        // });
        // this.buttonArMinus.direction = -1;
        // Povin.place(this.buttonArMinus, 0.1, 0.20);

        

        // top left
        this.h2String = 'x ' + '(' + Povin.placeX(0) + ',' + Povin.placeY(0) + ')';
        this.h2Text = this.add.text(0, 0, this.h2String, {
            font: '30px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        this.h2Text.setOrigin(0, 0);
        Povin.place(this.h2Text, 0, 0);

        // top right
         this.h3String = '(' +Povin.placeX(1) + ',' + Povin.placeY(0) + ')' + ' x';
         this.h3Text = this.add.text(0, 0, this.h3String, {
             font: '30px ' + this.myFont,
             fill: '#ebebeb',
             align: 'center'
         });
         this.h3Text.setOrigin(1, 0);
         Povin.place(this.h3Text, 1, 0);

         // bottom left
         this.h4String = 'x ' + '(' + Povin.placeX(0) + ',' + Povin.placeY(1) + ')';
         this.h4Text = this.add.text(0, 0, this.h4String, {
             font: '30px ' + this.myFont,
             fill: '#ebebeb',
             align: 'center'
         });
         this.h4Text.setOrigin(0, 1);
         Povin.place(this.h4Text, 0, 1);

         // bottom right
         this.h5String = '(' + Povin.placeX(1) + ',' + Povin.placeY(1) + ')'+' x';
         this.h5Text = this.add.text(0, 0, this.h5String, {
             font: '30px ' + this.myFont,
             fill: '#ebebeb',
             align: 'center'
         });
         this.h5Text.setOrigin(1, 1);
         Povin.place(this.h5Text, 1, 1);

        this.hyText = this.add.text(0, 0, '', {
            font: '14px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        }).setScale(deviceScale);
        this.hyText.setOrigin(0, 0);
        Povin.place(this.hyText, 0.1, 0.28);

        this.hxText = this.add.text(0, 0, '', {
            font: '14px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        }).setScale(deviceScale);
        this.hxText.setOrigin(0, 0);
        Povin.place(this.hxText, 0.15, 0.28);

        // create a new graphics obj for the chart grid
        this.chart = this.add.graphics(Povin.placeX(0), Povin.placeY(0));

        this.displayChart();

        //this.displayHistory();

    }, // end create:

    // button Go
    actionOnClickGo: function (config) {
        config.ctx.nextScene();
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

    },
    onObjectOut: function (pointer, target) {
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            duration: 100
        });

    },


    actionOnClickAr: function (config) {
        config.ctx.typeId += config.target.direction;
        if (config.ctx.typeId > 4) {
            config.ctx.typeId = 1;
        }
        if (config.ctx.typeId < 1) {
            config.ctx.typeId = 4;
        }
        config.ctx.aText.text = GameOption.getTypeSt(config.ctx.typeId);

        config.ctx.displayChart();
        config.ctx.displayHistory();
    },

    // draw the chart grid
    displayChart: function () {
        // clear every time
        // slow, need to make a sprite or something faster
        this.chart.clear();
        // place the outline of the chart grid on the screen
        Povin.place(this.chart, Povin.placeX(0), Povin.placeY(0));
        this.chart.lineStyle(2, 0xebebeb, 1);
        this.chart.strokeRect(0, 0, Povin.placeX(1), Povin.placeY(1));

        // touch point rectangle
        this.chart.lineStyle(1, 0xebebeb, 1);
       

        // position horiz numbers
        var basehX = Povin.placeX(.185);
        var basehY = Povin.placeY(.26);

        // position vertical numbers
        var basevX = Povin.placeX(.115);
        var basevY = Povin.placeY(.30);

        var iCount = 0;

        // store vertical and horiz numbers in an array so can manage them individually
        this.hText = {};

        // vertical lines across x axis
        for (var x = 0; x <= Povin.placeX(1); x += Povin.placeX(1) / 10) {
            this.chart.lineStyle(1, 0xebebeb, .5);
            this.chart.beginPath();
            this.chart.moveTo(x, 0);
            this.chart.lineTo(x, Povin.placeY(1));
            this.chart.closePath();
            this.chart.strokePath();
        }

         // horizontal lines down y axis
         for (var y = 0; y <= Povin.placeY(1); y += Povin.placeY(1) / 10) {
             this.chart.lineStyle(1, 0xebebeb, .5);
             this.chart.beginPath();
             this.chart.moveTo(0,y);
             this.chart.lineTo(Povin.placeX(1),y );
             this.chart.closePath();
             this.chart.strokePath();
         }
/*
        // for (var i = 0; i <= Povin.placeY(1); i += Povin.placeX(1)/10) {
        //     iCount++;

            // show the vertical numbers down left side of grid
            // this.hText[i] = {
            //     num: this.add.text(0, 0, '', {
            //         font: '12px ' + this.myFont,
            //         fill: '#ebebeb',
            //         align: 'center'
            //     }).setScale(deviceScale)
            // }
            // this.hText[i].num.text = iCount;
            // this.hText[i].num.setOrigin(0.5, 0.5);
            // this.hText[i].num.x = basevX;
            // this.hText[i].num.y = basevY + i * deviceScale;

            // // show the horiz numbers across top of grid        
            // this.hText[i + 16] = {
            //     num: this.add.text(0, 0, '', {
            //         font: '12px ' + this.myFont,
            //         fill: '#ebebeb',
            //         align: 'center'
            //     }).setScale(deviceScale)
            // }
            // this.hText[i + 16].num.text = iCount;
            // this.hText[i + 16].num.setOrigin(0.5, 0.5);
            // this.hText[i + 16].num.x = basehX + i * deviceScale;
            // this.hText[i + 16].num.y = basehY;

            // draw internal lines of grid
            //var j = i * deviceScale;
        //     var j=i;
        //     this.chart.lineStyle(1, 0xebebeb, .5);
        //     this.chart.beginPath();
        //     this.chart.moveTo(0, j);
        //     this.chart.lineTo(Povin.placeX(1), j);
        //     this.chart.moveTo(j, 0);
        //     this.chart.lineTo(j, Povin.placeY(1));
        //     this.chart.closePath();
        //     this.chart.strokePath();

        // }
*/
    },

    // fill in the little red/green rectangles based on the score
    drawRect: function (x, y, color) {

        var myColor;
        var baseX = Povin.placeX(.185);
        var baseY = Povin.placeY(.26);
        var myX = 3 + (x - 1) * 20;
        var myY = 3 + (y - 1) * 20;

        if (color == 1) {
            myColor = '0x005300'
        }
        if (color == 2) {
            myColor = '0xad0000'
        }

        this.chart.lineStyle(1, myColor, 1);
        this.chart.fillStyle(myColor, 1);
        this.chart.fillRect(myX * deviceScale, myY * deviceScale, 15 * deviceScale, 15 * deviceScale);
    },


    // process history array for current type and display on grid
    displayHistory: function () {
        var x;
        var y;
        var key;
        var playerId = GameOption.getPlayerId() + '.';
        var type = ' ' + GameOption.getTypeSym(this.typeId) + ' ';
        var color = 1;
        var count = 0;
        var avg = 0;
        var totAvg = 0;

        //console.log('displayHistory')

        for (y = 1; y <= 15; y++) {

            for (x = 1; x <= 15; x++) {
                key = playerId + x + type + y;

                // test code to fill all rectangles with alt red/green colors
                // if (x) {
                //     if (x%2==0) {color = 2} else {color =1}
                //     this.drawRect(x, y, color);
                // }

                if (Povin.historyArr[key]) {
                    if (Povin.historyArr[key].totCount > 1) {
                        color = 2
                    } else {
                        color = 1
                    }
                    // draw rectangle
                    this.drawRect(x, y, color);
                    count++;
                    avg += Povin.historyArr[key].runningTimeAvg;
                }
            }

        }

        // calc avg time for all problems
        totAvg = avg / count;
        this.q.text = this.qString + (totAvg / 1000).toFixed(4); // update text with avg time
    },

    update: function () {},


    render2: function () {
        var debug = this.game.debug;
        debug.text('height ' + game.world.height, 10, 120);
        debug.text('gameLevel ' + GameOption.gameLevel, 10, 140);
        debug.text('Povin ' + Povin, 10, 160);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);

    },

    nextScene: function () {

        // reset and ready to play again
        GameOption.scoreArr = {};
        GameOption.next = 1; // add one to the next level number

        this.scene.start('MainMenu', true, false);
    },

});