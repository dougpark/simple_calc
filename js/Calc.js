/**************************************************************************************
* Calc Scene (Povin Super Calc)
* @author Doug Park, Povingames.com
* @email doug@povingames.com
* @version v1.0
* @desc Play the Povin Super Calc game
* @date 2018-10-10
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
        this.amemVal = 0;
        this.bmemVal = 0;
        this.binVal = 0;
        this.octVal = 0;
        this.hexVal = 0;
        this.decVal = 0;

        this.hexCSSValText = '';
        this.amemValText = '';
        this.bmemValText = '';
        this.binValText = '';
        this.octValText = '';
        this.hexValText = '';
        this.decValText = '';

        // set initial mode to Decimal
        GameOption.mode = 'Dec';
        GameOption.mode2 = 'Or';
    }

    preload() {
        //this.time.advancedTiming = true;
    }

    create() {

        // keyboard
        this.createKeyboardShortcuts();

        // audio
        this.createAudio();

        // background Tile
        this.createTiles();

        // header
        this.createHeader();

        this.createRGBColor();

        // Go button
        //this.createGoButton();

        // for all interactive objects
        this.createTouch();

        // Animate the invaders
        //this.createInvaders();

        //this.createHero();

       // this.createBat();

        this.createButtons();

        this.createAnswerText();
        
        // Scale Overlay
        this.scaleOverlay = new ScaleOverlay({
            ctx: game.ctx
        });
    
    } // end create

    createRGBColor() {
        this.hexCSS = this.add.rectangle(0, Povin.placeY(0), Povin.placeX(1), Povin.placeY(.02), GameStyle.answerCSSH).setOrigin(0,0); 
    }

    createAnswerText() {

        var ds = .75;
        var fontSize = 16*deviceScale;

        GameOption.minY = Povin.placeY(.082);
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
        

        this.amemHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.1), 'aMem:', {
            font: fontSize+GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.amemHeader.setOrigin(0, 0.5);
        this.amemText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.1), '0', {
            font: fontSize+GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.amemText.setOrigin(1, 0.5);

        this.bmemHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.2), 'bMem:', {
            font: fontSize + GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.bmemHeader.setOrigin(0, 0.5);
        this.bmemText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.2), '0', {
            font: fontSize + GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.bmemText.setOrigin(1, 0.5);

        this.orHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.3), 'Or:', {
            font: fontSize + GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.orHeader.setOrigin(0, 0.5);
        this.orText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.3), '0', {
            font: fontSize + GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.orText.setOrigin(1, 0.5);

        this.binHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.55), 'Bin:', {
            font: fontSize+GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.binHeader.setOrigin(0, 0.5);
        this.binText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.55), '0', {
            font: fontSize+GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.binText.setOrigin(1, 0.5);

        this.octHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.65), 'Oct:', {
            font: fontSize+GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.octHeader.setOrigin(0, 0.5);
        this.octText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.65), '0', {
            font: fontSize+GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.octText.setOrigin(1, 0.5);

         this.hexHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.75), 'Hex:', {
             font: fontSize+GameStyle.answerFont,
             fill: GameStyle.answerText,
             align: 'center'
         });
         this.hexHeader.setOrigin(0, 0.5);
         this.hexText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.75), '0', {
             font: fontSize+GameStyle.answerFont,
             fill: GameStyle.answerText,
             align: 'center'
         });
         this.hexText.setOrigin(1, 0.5);

          this.decHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.85), 'Dec:', {
              font: fontSize+GameStyle.answerFont,
              fill: GameStyle.answerText,
              align: 'center'
          });
          this.decHeader.setOrigin(0, 0.5);
          this.decText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.85), '0', {
              font: fontSize+GameStyle.answerFont,
              fill: GameStyle.answerText,
              align: 'center'
          });
          this.decText.setOrigin(1, 0.5);
        
         this.cmdHeader = this.add.text(GameOption.placeX(.02), GameOption.placeY(.95), GameOption.mode, {
             font: fontSize+GameStyle.answerFont,
             fill: GameStyle.answerText,
             align: 'center'
         });
         this.cmdHeader.setOrigin(0 , 0.5);
        this.cmdText = this.add.text(GameOption.placeX(.95), GameOption.placeY(.95), '0', {
            font: fontSize+GameStyle.answerFont,
            fill: GameStyle.answerText,
            align: 'center'
        });
        this.cmdText.setOrigin(1, 0.5);
    }

    createButtons() {
    
        //{scene, width, height, text, type, textFont, textStyle, 0xbackgroundColor}
        this.buttons = GameOption.createButtons();

        // custome position logic
        var dWidth = 8;
        var dX = game.config.width / dWidth;
        var dY = dX;
        var x = dX/2 ;
        var y = game.config.height+(dY/2);
        var yRow = -1;
        var fontSize = 20 * deviceScale;

        // create a new button for each key in buttons array
        for (let key of Object.keys(this.buttons)) {
            this.buttons[key].scene = this;
            this.buttons[key].width = dX*deviceScale-5;
            this.buttons[key].height = dX*deviceScale-5;
            this.buttons[key].textFont = fontSize+GameStyle.keyFont; 
            this.buttons[key].textStyle = GameStyle.keyText;
            this.buttons[key].backgroundColor = GameStyle.KeyBackgroundH;
            this.buttons[key].backgroundKeyOn = GameStyle.keyBackgroundOnH;

            if (this.buttons[key].backgroundKeyHighlight == true) { // special for clear and del keys
                this.buttons[key].backgroundKeyOn = GameStyle.keyBackgroundOn2H;
            }
            this.buttons[key].scale = 1;
            this.buttons[key].posX = x;
            this.buttons[key].posY = y;
            this.button = new CalcButton(this.buttons[key]);
            this.buttons[key].button = this.button;
            this.button.cmd = this.buttons[key].cmd;
            this.button.pVal = this.buttons[key].pVal;
            this.button.op = this.buttons[key].op;
            this.button.logicGroup = this.buttons[key].logicGroup;
            this.button.mode = this.buttons[key].mode;
            this.button.modeGroup = this.buttons[key].modeGroup;

            // special for clear and del keys
            if (this.buttons[key].backgroundKeyHighlight == true) {
                this.button.setOn();
            }

            // default on for Dec and Or keys
            if (this.buttons[key].default == true) {
                this.button.setOn();
            }

            // zig zag placement starting at lower left
            if (this.buttons[key].row != yRow) {
                yRow = this.buttons[key].row;
                y -= dY;
                x = dX/2;
            } else {
                x += dX;
            }
            this.button.x = x;
            this.button.y = y;  

            
        }

        // set GameOption.maxY to "lower height" of answer area
        GameOption.maxY = y-dY/2;   

        // default mode to Dec
        this.setKeyMode('Dec');

    }

    
    update() {
  
        
    } // end update

 
    nextScene() {
        //this.scene.start('Scores', true, false); // go to Scores
    }



    // eval cmdStr and then convert to other base values
    processEval() {

        this.processDec();
        this.processHex();
        this.processOct();
        this.processBin();
        this.processCSS();

        // update the display
        this.updateDisplayText();
    }

    // update the onscreen text 
    updateDisplayText() {

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

        this.binValText = this.getBinPretty(this.decVal);
       
    }

    getBinText(val) {
        // for display
        var r = '';
        if (val >= 0 && val < 65536) {
            var v2 = val.toString(2);
            var V = ('                ' + v2).slice(-16);
            r = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
                V.slice(8, 12) + ' ' + V.slice(12);
        } else {
            r = 'overflow';
        }

        return r;
    }
    getBinPretty(val) {
        // for display
        var r = '';
        if (val < 65536) {
            var v2 = val.toString(2);
            var V = ('0000000000000000' + v2).slice(-16);
            r = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
                V.slice(8, 12) + ' ' + V.slice(12);
        } else {
            r = 'overflow';
        }

        return r;
    }

    getBinVal(val) {
         var r = '';
         if (val >= 0 && val < 65536) {
             var v2 = val.toString(2);
             r = v2;
         } else {
             r = 'overflow';
         }

         return r;

    }

    processOct() {
        // convert to Oct
        this.octVal = '';
        var v2 = this.decVal.toString(8);
        this.octVal = v2;

        this.octValText = this.getOctText(this.decVal);
    }

    getOctText(val) {
        // for display
        var r = '';
        var v2 = val.toString(8);
        var V = ('                ' + v2).slice(-16);
        r = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
            V.slice(8, 12) + ' ' + V.slice(12);

        return r;
    }

    getOctVal(val) {
        // for display
        var r = '';
        var v2 = val.toString(8);
        r = v2;

        return r;
    }

    processHex() {

        // convert to hex
        this.hexVal = '';
        var v2 = this.decVal.toString(16).toUpperCase();
        this.hexVal = v2;

        this.hexValText = this.getHexText(this.decVal);
    }

    getHexText(val) {

        // for display
        var r = '';
        var v2 = val.toString(16).toUpperCase();
        var V = ('                ' + v2).slice(-16);
        r = V.slice(0, 4) + ' ' + V.slice(4, 8) + ' ' +
            V.slice(8, 12) + ' ' + V.slice(12);

        return r;
    }

    getHexVal(val) {

        // for display
        var r = '';
        var v2 = val.toString(16).toUpperCase();
        r = v2;

        return r;
    }

    processDec() {

        var v2 = 0;

        try {
         v2 = eval(this.cmdStr).toString(10);
         this.decVal = Number(v2);
         this.decValText = this.decVal;
           
         } catch(err) {}

         if (this.cmdStr == '') {
             this.decVal = 0;
             this.decValText = '0';
         }
    }

    getDecText(val) {
        // for display
        var r = '';
        r = val.toLocaleString('en', {
            maximumSignificantDigits: 21
        });

        return r;

    }

    getDecVal(val) {
        // for display
        var r = '';
        r = val;

        return r;

    }

    processClear() {
        // clear this.tokens array;
        this.tokens = [{key:'', val:''}];

        // build the cmdStr based on the token array
        this.buildCmdStr(this.tokens);
        
    }

    getModeVal(val) {
        switch (GameOption.mode) {

            case 'Dec':
                return this.getDecVal(val);
            break;
            case 'Hex':
                return this.getHexVal(val);
            break;
            case 'Oct':
                return this.getOctVal(val);
            break;
            case 'Bin':
                return this.getBinVal(val);
            break;
            case 'RGB':
                //return this.rgbText.text;
                return 0;
            break;
            default:

            break;
        }
    }

    getModeText(val) {
        switch (GameOption.mode) {

            case 'Dec':
                return this.getDecText(val);
                break;
            case 'Hex':
                return this.getHexText(val);
                break;
            case 'Oct':
                return this.getOctText(val);
                break;
            case 'Bin':
                return this.getBinPretty(val);
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
        //this.processEval();
        var ans = this.getModeVal(this.decVal);
        this.tokens = [];
        if (ans != 0) {
            this.tokens.push({key: 'pVal', val:ans});
        }
        this.buildCmdStr(this.tokens);
    }

    getaMemAnswer() {
        var mem = this.getModeVal(this.amemVal);
        this.tokens = [];
        this.tokens.push({key:'pVal', val:mem});
        this.buildCmdStr(this.tokens);
    }

    updateMemText(){
        this.updateaMemText();
        this.updatebMemText();
        this.updateOrText();
    }

    updateOrText() {
        
        var ans = 0;
        switch (GameOption.mode2) {
            case 'Or':
            ans = this.amemVal | this.bmemVal;
            this.orText.text = this.getModeText(ans);

            break
            case 'And':
            ans = this.amemVal & this.bmemVal;
            this.orText.text = this.getModeText(ans);
                
            break;
            case 'Xor':
            ans = this.amemVal ^ this.bmemVal;
            this.orText.text = this.getModeText(ans);   

            break;
            case 'Not':
            ans =  this.amemVal >> 1;
            this.orText.text = this.getModeText(ans);

            break;
        }

    }

    updateaMemText() {
        this.amemValText = this.getModeText(this.amemVal);
        this.amemText.text = this.amemValText;
    }
    updatebMemText() {
        this.amemValText = this.getModeText(this.amemVal);
        this.amemText.text = this.amemValText;
    }
    getbMemAnswer() {
        var mem = this.getModeVal(this.bmemVal);
        this.tokens = [];
        this.tokens.push({
            key: 'pVal',
            val: mem
        });
        this.buildCmdStr(this.tokens);
    }

    updatebMemText() {
        this.bmemValText = this.getModeText(this.bmemVal);
        this.bmemText.text = this.bmemValText;
    }

    processCmd(target) {

        var cmd = target.cmd;

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
            case 'aM+':
                this.amemVal = this.amemVal + this.decVal;
                this.updateMemText();
            break;
            case 'aM-':
                this.amemVal = this.amemVal - this.decVal;
                this.updateMemText();
            break;
            case 'aMC':
                this.amemVal = 0;
                this.updateMemText();
            break;
            case 'aMR':
                this.getaMemAnswer();
            break;
            case 'bM+':
                this.bmemVal = this.bmemVal + this.decVal;
                this.updateMemText();
            break;
            case 'bM-':
                this.bmemVal = this.bmemVal - this.decVal;
                this.updateMemText();
            break;
            case 'bMC':
                this.bmemVal = 0;
                this.updateMemText();
            break;
            case 'bMR':
                this.getbMemAnswer();
            break;
            case 'Or':
                // Set Or to on, others to off
                 this.setLogicGroupOff(target);
                 target.setOn();
                GameOption.mode2 = 'Or';
                this.orHeader.text = GameOption.mode2 + ':';
                this.updateMemText();
            break;
            case 'And':
                // Set And to on, others to off
                 this.setLogicGroupOff(target);
                 target.setOn();
                GameOption.mode2 = 'And';
                this.orHeader.text = GameOption.mode2 + ':';
                this.updateMemText();
            break;
            case 'Xor':
                // Set Xor to on, others to off
                 this.setLogicGroupOff(target);
                 target.setOn();
                GameOption.mode2 = 'Xor';
                this.orHeader.text = GameOption.mode2 + ':';
                this.updateMemText();
            break;
            case 'Not':
                // Set Not to on, others to off
                this.setLogicGroupOff(target);
                target.setOn();
                GameOption.mode2 = 'Not';
                this.orHeader.text = 'a'+GameOption.mode2 + ':';
                this.updateMemText();
            break;

            case 'RGB':
                // Set RGB to on, others to off
                this.setKeyMode('RGB');
                this.setModeGroupOff(target);
                target.setOn();
                GameOption.mode = 'RGB';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
                this.updateMemText();
            break;
             case 'Bin':
                // Set Bin to on, others to off
                this.setKeyMode('Bin');
                this.setModeGroupOff(target);
                target.setOn();
                // disable non Bin keys
                GameOption.mode = 'Bin';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
                this.updateMemText();

             break;
             case 'Oct':
             // Set Oct to on, others to off
             this.setKeyMode('Oct');
              this.setModeGroupOff(target);
              target.setOn();
             // disable non Oct keys
                GameOption.mode = 'Oct';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
                this.updateMemText();

             break;
             case 'Hex':
             // Set Hex to on, others to off
             this.setKeyMode('Hex');
             this.setModeGroupOff(target);
             target.setOn();

             // disable non Hex keys
                GameOption.mode = 'Hex';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
                this.updateMemText();

             break;
             case 'Dec':
             // Set Dec to on, others to off
             this.setKeyMode('Dec');
             this.setModeGroupOff(target);
             target.setOn();
             // disable non Dec keys
                GameOption.mode = 'Dec';
                this.cmdHeader.text = GameOption.mode;
                this.getAnswer();
                this.updateMemText();

             break;
            default: 
                

            break;

        }
    }

    setKeyMode(mode) {
         for (let key of Object.keys(this.buttons)) {
              switch (mode) {
                  case 'Bin':
                    try {
                        if (this.buttons[key].mode.Bin == false) {
                            this.buttons[key].button.setDisable();
                        } else {
                            this.buttons[key].button.setEnable();
                        }
                    } catch {}
                   break;
                   case 'Dec':
                   try {
                       if (this.buttons[key].mode.Dec == false) {
                           this.buttons[key].button.setDisable();
                       } else {
                           this.buttons[key].button.setEnable();
                       }
                   } catch {}
                   break;
                   case 'Oct':
                   try {
                       if (this.buttons[key].mode.Oct == false) {
                           this.buttons[key].button.setDisable();
                       } else {
                           this.buttons[key].button.setEnable();
                       }
                   } catch {}
                   break;
                   case 'Hex':
                   try {
                       if (this.buttons[key].mode.Hex == false) {
                           this.buttons[key].button.setDisable();
                       } else {
                           this.buttons[key].button.setEnable();
                       }
                   } catch {}
                   break;
                   case 'RGB':
                   try {
                       if (this.buttons[key].mode.RGB == false) {
                           this.buttons[key].button.setDisable();
                       } else {
                           this.buttons[key].button.setEnable();
                       }
                   } catch {}
                   break;
              }
         }

    }

    setModeGroupOff(target) {
        // mode = Bin, Oct, Dec, Hex, RGB
        for (let key of Object.keys(this.buttons)) {
            if (this.buttons[key].modeGroup == true) {
                this.buttons[key].button.setOff();
            }
        }
    }

    setLogicGroupOff(target) {
        // logic = And, Or, Xor, Not
        for (let key of Object.keys(this.buttons)) {
            if (this.buttons[key].logicGroup == true) {
                this.buttons[key].button.setOff();
            }
        }
    }

    setMode(mode) {
        // mode = Bin, Oct, Dec, Hex, RGB
    }

    // build the cmdStr based on the token array
    buildCmdStr(tokens) {

        this.cmdStr = '';
        this.modeCmdStr = '';
        var t = '';
        
        // loop through tokens array and build cmdStr
        for(var token of tokens) {
            // convert token to math function here
            // var expandedToken = this.expandToken(token);

            if (token.key == 'pVal') {
                t = t + token.val;
            } else if (token.key == 'op') {
                
                this.processT(t);
                this.cmdStr += token.val;
                this.modeCmdStr += token.val
                t = '';
            }
        }

        // catch the last pVal
        if (t != '' ) {
            this.processT(t);
        }

        // console.log(tokens);
        // console.log('cmdStr= '+this.cmdStr);
        // console.log('modeCmdStr= '+this.modeCmdStr);
        // // update the display with current modeCmdStr
         this.cmdText.text = this.modeCmdStr;

        // Process Equal
        this.processEval();
    }

    processT(t) {
        // ignore 
        if (t=='') {return}

        var modeToken = '';
        // for calculation - calculate in decimal
        var expandedToken = t;
        //if (!isNaN(this.getDecVal(expandedToken))) {
            expandedToken = this.getDecVal(expandedToken);
        //}

        this.cmdStr += expandedToken;


        // for display - display in current base mode
        modeToken = expandedToken;
        if (!isNaN(expandedToken)) {
            modeToken = this.getModeVal(expandedToken);
        }
        this.modeCmdStr += modeToken;

    }

    getDecVal(val) {

      switch (GameOption.mode) {

          case 'Dec':
              return Number(val);
              break;
          case 'Hex':
              return Number(parseInt(val, 16));
              break;
          case 'Oct':
              return Number(parseInt(val, 8));
              break;
          case 'Bin':
              return Number(parseInt(val, 2));
              break;
          case 'RGB':
              //return this.rgbText.text;
              return Number(0);
              break;
          default:

              break;
      }

    }

    processOp(target) {

        if (target.op == '+/-') {

            // last element must be pVal to perform this op
            var l = this.tokens[this.tokens.length - 1];
            if (l.key != 'pVal') {
                return
            }

            // remove the last token from array
            var v1 = this.tokens.pop();
            var v = ''+v1.val; // convert to string

            // check if token begins with '-'
            if (v.charAt(0) === '-') {
                // if yes then remove the first pos of the token string
                v = v.substring(1);
            }  
            else {
                // else add a '-' to the beginnng of the token
                v = '-' + v
                
            }

            this.tokens.push({key: 'pVal', val:v});

        }
        else {
            this.tokens.push({key: 'op', val:target.op});
        }

    }

    processKeyPress(target) {

        if (target.pVal) {

            
            this.tokens.push({key: 'pVal', val:target.pVal});


        } else if (target.op) {
            

            this.processOp(target);


        } else if (target.cmd) {
            
            this.processCmd(target);

        }

        // build the cmdStr based on the token array
        this.buildCmdStr(this.tokens);
    }


    //
    // for all interactive buttons
    //
    onObjectDown(pointer, target) {
        //console.log(target.cmd);

        game.ctx.processKeyPress(target);

        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale * .9 : .9),
            scaleY: (target.normScale ? target.normScale * .9 : .9),
            ease: 'Bounce.easeOut',
            duration: 50
        });
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            delay: 50,
            duration: 10
        });
    }
    // onObjectUp (pointer, target) {
    //     game.ctx.tweens.add({
    //         targets: target,
    //         scaleX: (target.normScale ? target.normScale : 1),
    //         scaleY: (target.normScale ? target.normScale : 1),
    //         ease: 'Sine.easeInOut',
    //         duration: 100
    //     });
    // }
    // onObjectOver (pointer, target) {
    //     // game.ctx.tweens.add({
    //     //     targets: target,
    //     //     scaleX: 1.1,
    //     //     scaleY: 1.1,
    //     //     ease: 'Sine.easeInOut',
    //     //     duration: 100
    //     // });
    //     ///target.setTint(0xeb0000);
    // }
    // onObjectOut (pointer, target) {
    //     game.ctx.tweens.add({
    //         targets: target,
    //         scaleX: (target.normScale ? target.normScale : 1),
    //         scaleY: (target.normScale ? target.normScale : 1),
    //         ease: 'Sine.easeInOut',
    //         duration: 100
    //     });
    //     /// target.setTint(0xffffff);
    // }

    createKeyboardShortcuts() {
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
        this.headerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.082), GameStyle.headerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.headerTile, 0.5, 0);
        // question Tile
        // this.questionTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        // Povin.place(this.questionTile, 0.5, 0.4);

        // // footer Tile
        // this.footerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.05), GameStyle.footerBackgroundH).setOrigin(.5, 0);
        // Povin.place(this.footerTile, 0.5, 0.95);
    }

    createHeader () {
        var fontSize = 26*deviceScale;
        this.titleHeading = this.add.text(0, 0, 'Povin Super Calc', {
            font: fontSize+GameStyle.headerFont,
            fill: GameStyle.headerText,
            align: 'center'
        });
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
        //this.input.on('gameobjectover', this.onObjectOver);
        //this.input.on('gameobjectout', this.onObjectOut);
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
        // this.timeInvader = this.add.sprite(0, 0, 'invader').play('fly').setScale(deviceScale);
        // this.timeInvader.setOrigin(0.5, 0.5);
        // Povin.place(this.timeInvader, .2, .81);
        // game.ctx.tweens.add({
        //     targets: this.timeInvader,
        //     x: Povin.placeX(.8),
        //     y: Povin.placeY(.81),
        //     ease: 'Phaser.Math.Easing.Linear',
        //     yoyo: true,
        //     repeat: -1,
        //     duration: GameOption.buzzer
        // });
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




