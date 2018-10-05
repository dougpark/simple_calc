/**************************************************************************************
* Calc Scene (Povin Super Calc)
* @author Doug Park, Povingames.com
* @email doug@povingames.com
* @version v1.0
* @desc Play the Povin Speed Super Calc game
* @date 2018-09-06
**************************************************************************************/
"use strict"

class Calc extends Phaser.Scene {
    constructor() {
            super("Calc");
    }

    init() {  
 
        game.ctx = this;
        this.cmdStr = '';
        this.tokens = [];

        this.hexCSSVal = '';
        this.memVal = '';
        this.binVal = '';
        this.octVal = '';
        this.hexVal = '';
        this.decVal = 0;

        this.hexCSSValText = '';
        this.memValText = '';
        this.binValText = '';
        this.octValText = '';
        this.hexValText = '';
        this.decValText = '';

        // set initial mode to Decimal
        GameOption.mode = 'Dec';
    }

    preload() {
        //this.time.advancedTiming = true;
    }

    create() {

        // keyboard
        this.createKeyboard();

        // audio
        this.createAudio();

        // background Tile
        this.createTiles();

        // header
        this.createHeader();

        this.createCSSColor();

        // Go button
        //this.createGoButton();

        // for all interactive objects
        this.createTouch();

        // Animate the invaders
        this.createInvaders();

        //this.createHero();

       // this.createBat();

       

        this.createButtons();

        this.createAnswerText();
        
        // Scale Overlay
        this.scaleOverlay = new ScaleOverlay({
            ctx: game.ctx
        });
    
    } // end create

    createCSSColor() {

        this.hexCSS = this.add.rectangle(0, Povin.placeY(0), Povin.placeX(1), Povin.placeY(.02), GameStyle.answerCSSH).setOrigin(0,0);

        
    }

    createAnswerText() {

        var ds = .75;

        GameOption.minY = Povin.placeY(.1);
        GameOption.norY = GameOption.maxY - GameOption.minY;
        GameOption.scaleY = function (percent, offset = 0) {
            var y = GameOption.norY * percent;
            y += offset;
            return y;
        }
        GameOption.placeY = function (percent, offset = 0) {
                var y = GameOption.norY * percent + GameOption.minY;
                y += offset;
                return y;
            }
        GameOption.placeX = function (percent, offset = 0) {
                var x = game.config.width * percent;
                x += offset;
                return x;
            }

        this.cmdTile = this.add.rectangle(GameOption.placeX(0), GameOption.placeY(.9), game.config.width, GameOption.scaleY(.1), '0xe6e6e6').setOrigin(0, 0);
        

        this.memHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.1), 'Mem:', {
            font: GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        }).setScale(deviceScale * ds);
        this.memHeader.setOrigin(0, 0.5);
        this.memText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.1), '0000000000', {
            font: GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        }).setScale(deviceScale * ds);
        this.memText.setOrigin(1, 0.5);

        this.binHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.55), 'Bin:', {
            font: GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        }).setScale(deviceScale * ds);
        this.binHeader.setOrigin(0, 0.5);
        this.binText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.55), '0', {
            font: GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        }).setScale(deviceScale * ds);
        this.binText.setOrigin(1, 0.5);

        this.octHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.65), 'Oct:', {
            font: GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        }).setScale(deviceScale * ds);
        this.octHeader.setOrigin(0, 0.5);
        this.octText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.65), '0', {
            font: GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        }).setScale(deviceScale * ds);
        this.octText.setOrigin(1, 0.5);

         this.hexHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.75), 'Hex:', {
             font: GameStyle.answerFont,
             fill: GameStyle.answerText,
             align: 'center'
         }).setScale(deviceScale * ds);
         this.hexHeader.setOrigin(0, 0.5);
         this.hexText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.75), '0', {
             font: GameStyle.answerFont,
             fill: GameStyle.answerText,
             align: 'center'
         }).setScale(deviceScale * ds);
         this.hexText.setOrigin(1, 0.5);

          this.decHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.85), 'Dec:', {
              font: GameStyle.answerFont,
              fill: GameStyle.answerText,
              align: 'center'
          }).setScale(deviceScale * ds);
          this.decHeader.setOrigin(0, 0.5);
          this.decText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.85), '0', {
              font: GameStyle.answerFont,
              fill: GameStyle.answerText,
              align: 'center'
          }).setScale(deviceScale * ds);
          this.decText.setOrigin(1, 0.5);
        
         this.cmdHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.95), GameOption.mode, {
             font: GameStyle.answerFont,
             fill: GameStyle.answerText,
             align: 'center'
         }).setScale(deviceScale * ds);
         this.cmdHeader.setOrigin(0 , 0.5);
        this.cmdText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.95), '0', {
            font: GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        }).setScale(deviceScale * ds);
        this.cmdText.setOrigin(1, 0.5);



        
       

    }

    createButtons() {
    
        //{scene, width, height, text, type, textFont, textStyle, 0xbackgroundColor}
        this.buttons = GameOption.createButtons();

        var dWidth = 8;
        var dX = game.config.width / dWidth;
        var dY = dX;
        var x = dX/2 ;
        var y = game.config.height+(dY/2);
        var yRow = -1;

        // create a new button for each key in buttons array
        for (let key of Object.keys(this.buttons)) {
            this.buttons[key].scene = this;
            this.buttons[key].width = dX-5;
            this.buttons[key].height = dX-5;
            this.buttons[key].textFont = GameStyle.keyFont;
            this.buttons[key].textStyle = GameStyle.keyText;
            this.buttons[key].backgroundColor = GameStyle.KeyBackgroundH;
            this.buttons[key].posX = x;
            this.buttons[key].posY = y;
            this.button = new TextButton(this.buttons[key]);
            this.button.cmd = this.buttons[key].cmd;
            this.button.pVal = this.buttons[key].pVal;
            this.button.op = this.buttons[key].op;

            if (this.buttons[key].row != yRow) {
                yRow = this.buttons[key].row;
                y -= dY;
                x = dX/2;
            } else {
                x += dX;
            }
            //Povin.place(this.button, x, y);
            this.button.x = x;
            this.button.y = y;  

            
        }

        // set GameOption.maxY to "lower height" of answer area
        GameOption.maxY = y-dY/2;   

    }

    
    update() {
  
        
    } // end update

 
    nextScene() {
        //this.scene.start('Scores', true, false); // go to Scores
    }

    processOp(op) {


    }

    processEqual() {

         try {
             //this.decText.text = eval(this.cmdStr).toString(10);
             var v2 = eval(this.cmdStr).toString(10);
             var v3 = 0;
            //  var c = 1;

            //  if (v2.length > 30) {
            //     for (var i = v2.length-1; i > -1; i--) {
            //         v3 = v2.charAt(i) + v3;
            //         if (c%3 == 0) {
            //             v3 = ',' + v3;
            //         }
            //         c++;
            //     }
            //     if (v3.charAt(0) == ',') {
            //         v3 = v3.slice(1);
            //     }
            // } else {
                 v3 = Number(v2);
            // }
            this.decText.text = v3.toLocaleString('en', {
                maximumSignificantDigits: 21
            });
         } catch {}

        try {
            var v2 = eval(this.cmdStr).toString(16);
            var V = ('0000000000000000' + v2).slice(-16);
            this.hexText.text = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
                V.slice(8, 12) + ' ' + V.slice(12);
             
         } catch {}

         try {
             
             var v2 = eval(this.cmdStr).toString(8);
             var V = ('                ' + v2).slice(-16);
             this.octText.text = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
                 V.slice(8, 12) + ' ' + V.slice(12);
         } catch {}

         try {
              var v3 = eval(this.cmdStr).toString(10);
              if (v3<65536) {
                var v2 = eval(this.cmdStr).toString(2);
                var V = ('0000000000000000' + v2).slice(-16);
                this.binText.text = V.slice(0,4) + ' ' + V.slice(4,8)+ ' ' + 
                V.slice(8,12) +' ' + V.slice(12);
              } else {
                  this.binText.text = 'overflow';
              }

         } catch {}

         try {
             this.hexCSS.fillColor = '0x' + eval(this.cmdStr).toString(16);
         } catch {}


    }

    // eval cmdStr and then convert to other base values
    processEval() {

        this.processDec();
        this.processHex();
        this.processOct();
        this.processBin();
        this.processCSS();

        // update the display
        this.processText();
    }

    // update the onscreen text 
    processText() {

        this.decText.text = this.decValText;
        this.hexText.text = this.hexValText;
        this.octText.text = this.octValText;
        this.binText.text = this.binValText;

    }
    

    processCSS() {
        // convert to CSS color
        this.hexCSSVal = '0x' + this.hexVal;

        // for display
        this.hexCSS.fillColor = this.hexCSSVal;

    }

    processBin() {
        // convert to Bin
        this.binVal = '';
        var v3 = this.decVal.toString(2);
        this.binVAl = v3;

        // for display
        if (this.decVal>= 0 && this.decVal < 65536) {
            var v2 = this.decVal.toString(2);
            var V = ('0000000000000000' + v2).slice(-16);
            this.binValText = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
                V.slice(8, 12) + ' ' + V.slice(12);
        } else {
            this.binValText = 'overflow';
        }
    }

    processOct() {
        // convert to Oct
        this.octVal = '';
        var v2 = this.decVal.toString(8);
        this.octVal = v2;

        // for display
        var V = ('                ' + v2).slice(-16);
        this.octValText = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
            V.slice(8, 12) + ' ' + V.slice(12);
    }

    processHex() {

        // convert to hex
        this.hexVal = '';
        var v2 = this.decVal.toString(16);
        this.hexVal = v2;

        // for display
        var V = ('0000000000000000' + v2).slice(-16);
        this.hexValText = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
            V.slice(8, 12) + ' ' + V.slice(12);

    }

    processDec() {

        var v2 = 0;

        try {
         v2 = eval(this.cmdStr).toString(10);
         this.decVal = Number(v2);
       

            // for display
            var v3 = Number(v2);
            this.decValText = v3.toLocaleString('en', {
                maximumSignificantDigits: 21
            });
         } catch {}
    }

    processClear() {
        // clear this.tokens array;
        this.tokens = ['0'];

        // this.cmdVal = '';
        //this.decVal = 0;
        // this.hexVal = '0';
        // this.octVal = '0';
        // this.binVal = '0';
        // this.hexCSSVal = GameStyle.answerCSSH;

        // build the cmdStr based on the token array
        this.buildCmdStr(this.tokens);
        
    }

    getModeAnswer() {
        switch (GameOption.mode) {

            case 'Dec':
                return this.decText.text;
            break;
            case 'Hex':
                return this.hexText.text;       
            break;
            case 'Oct':
                return this.octText.text;
            break;
            case 'Bin':
                return this.binText.text;
            break;
            case 'RGB':
                //return this.rgbText.text;
                return 0;
            break;
            default:

            break;
        }
    }

    getAnswer() {
        this.processEval();
        var ans = this.getModeAnswer();
        this.tokens = [];
        this.tokens.push(ans);
        this.buildCmdStr(this.tokens);
    }
    getMemAnswer() {
        var ans = this.memText.text;
        this.tokens = [];
        this.tokens.push(ans);
        this.buildCmdStr(this.tokens);
    }

    processCmd(cmd) {

        switch (cmd) {
            case '=':
            case 'Ans':
                this.getAnswer();   
            break;
            case 'XC':
                this.processClear();    
            break;
            case 'Del':
                // remove last token from this.tokens
                this.tokens.pop();
                // build the cmdStr based on the token array
                this.buildCmdStr(this.tokens);
             break;
             case 'M+':
                this.memText.text = Number(this.memText.text) + Number(this.getModeAnswer());

             break;
             case 'M-':
              this.memText.text = Number(this.memText.text) - Number(this.getModeAnswer());

             break;
             case 'MC':
                this.memText.text = '';

             break;
             case 'MR':
                this.getMemAnswer();
             break;
            case 'RGB':
                GameOption.mode = 'RGB';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
            break;
             case 'Bin':
                GameOption.mode = 'Bin';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
             break;
             case 'Oct':
                GameOption.mode = 'Oct';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
             break;
             case 'Hex':
                GameOption.mode = 'Hex';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
             break;
             case 'Dec':
                GameOption.mode = 'Dec';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
             break;
            default: 
                

            break;

        }
    }

    // build the cmdStr based on the token array
    buildCmdStr(tokens) {

        this.cmdStr = '';
        

        // loop through tokens array and build cmdStr
        for(var token of tokens) {
            // convert token to math function here
            // var expandedToken = this.expandToken(token);

            var expandedToken = token; // remove when expand is implemented
            this.cmdStr += expandedToken;
        }

        // update the display with current cmStr
         this.cmdText.text = this.cmdStr;

        // Process Equal
        this.processEval();
    }

    processOp(target) {

        if (target.op == '+/-') {
            // remove the last token from array
            var v = this.tokens.pop();

            // check if token begins with '-'
            if (v.charAt(0) === '-') {
                // if yes then remove the first pos of the token string
                v = v.substring(1);
            }  
            else {
                // else add a '-' to the beginnng of the token
                v = '-' + v
                
            }

            this.tokens.push(v);

        }
        else {
            this.tokens.push(target.op);
        }

    }

    processKey(target) {

        if (target.pVal) {

            this.tokens.push(target.pVal);


        } else if (target.op) {

            this.processOp(target);

           


        } else if (target.cmd) {

            //this.tokens.push(target.cmd);
            this.processCmd(target.cmd);

        }

        // build the cmdStr based on the token array
        this.buildCmdStr(this.tokens);


    }


    //
    // for all interactive buttons
    //
    onObjectDown(pointer, target) {
        //console.log(target.cmd);

        game.ctx.processKey(target);

        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale * .9 : .9),
            scaleY: (target.normScale ? target.normScale * .9 : .9),
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
    }
    onObjectUp (pointer, target) {
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            duration: 100
        });
    }
    onObjectOver (pointer, target) {
        // game.ctx.tweens.add({
        //     targets: target,
        //     scaleX: 1.1,
        //     scaleY: 1.1,
        //     ease: 'Sine.easeInOut',
        //     duration: 100
        // });
        ///target.setTint(0xeb0000);
    }
    onObjectOut (pointer, target) {
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            duration: 100
        });
        /// target.setTint(0xffffff);
    }

    createKeyboard() {
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
    }

    createAudio() {
        this.perfectSfx = this.sound.add('perfectSfx');
        this.wrongSfx = this.sound.add('wrongSfx');
        this.lateSfx = this.sound.add('lateSfx');
    }

    createTiles () {
        this.backTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(1), GameStyle.bodyBackgroundH).setOrigin(.5, 0);
        Povin.place(this.backTile, 0.5, 0);

        // header Tile
        this.headerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.10), GameStyle.headerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.headerTile, 0.5, 0);
        // question Tile
        // this.questionTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        // Povin.place(this.questionTile, 0.5, 0.4);

        // // footer Tile
        // this.footerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.05), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        // Povin.place(this.footerTile, 0.5, 0.95);
    }

    createHeader () {
        this.titleHeading = this.add.text(0, 0, 'Povin Super Calc', {
            font: GameStyle.headerFont,
            fill: GameStyle.headerText,
            align: 'center'
        }).setScale(deviceScale);
        this.titleHeading.setOrigin(0.5, 0.5);
        Povin.place(this.titleHeading, 0.5, 0.05);
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
        Povin.place(this.buttonSpeaker, 0.9, 0.05);
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
        Povin.place(this.buttonHome, 0.07, 0.035);
    }

    createTouch () {
        this.input.on('gameobjectdown', this.onObjectDown);
        //this.input.on('gameobjectup', this.onObjectUp);
        this.input.on('gameobjectover', this.onObjectOver);
        this.input.on('gameobjectout', this.onObjectOut);
    }
    
    createInvaders () {
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
    }

    createHero() {
        var config = {
            key: 'idle',
            frames: this.anims.generateFrameNumbers('hero', {
                frames: [0, 1, 2, 3,4,5,7]
            }),
            frameRate: 5,
            repeat: -1
        };
        this.anims.create(config);
        // welcome hero
        this.hero = this.add.sprite(0, 0, 'hero').play('idle').setScale(deviceScale);
        this.hero.setOrigin(0.5, 0.5);
        Povin.place(this.hero, .1, .18);
        
    }

    createBat() {
        var config = {
            key: 'batFly',
            frames: this.anims.generateFrameNumbers('bat', {
                frames: [0, 1, 2, 3]
            }),
            frameRate: 8,
            repeat: -1
        };
        this.anims.create(config);
        // welcome bat
        this.bat = this.add.sprite(0, 0, 'bat').play('batFly').setScale(deviceScale*2);
        this.bat.setOrigin(0.5, 0.5);
        Povin.place(this.bat, .2, .20);

    }

    createGoButton () {
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
  
};




