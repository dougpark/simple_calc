class CalcButton extends Phaser.GameObjects.Container {
    constructor(config) { // {scene, width, height, text, textFont, textStyle, 0xbackgroundColor, 0xbackgroundKeyOn}
        super(config.scene, 0, 0);

        this.frame = 0; // default frame
        this.enable = true; // defalt to enabled
        this.on = false; // default to off

        var myZoom = (config.zoom ? config.zoom : zoom);

        var b1 = config.scene.add.rectangle(0, 0, config.width * myZoom, config.height * myZoom, config.backgroundColor);
        var b1on = config.scene.add.rectangle(0, 0, config.width * myZoom, config.height * myZoom, config.backgroundKeyOn);
        b1on.visFrame =1;

        var b2 = config.scene.add.text(0, 0, config.text, {
            font: config.textFont,
            fill: config.textStyle,
            align: 'center',
        });
        b2.setOrigin(.5, .5);

        var b3disable = config.scene.add.rectangle(0, 0, config.width * myZoom, config.height * myZoom, config.backgroundColor,.75);
        b3disable.visFrame = 3;

        this.add([b1, b1on, b2, b3disable]);
        this.setSize(config.width * myZoom, config.height * myZoom); 
        this.setScale(config.scale ? config.scale : deviceScale);
        this.normScale = this.scaleX;
        this.setEnable();
        config.scene.add.existing(this);
    }

    // on = frame 1
    setOn() {
        this.setFrame(1);
        this.on = true;
    }

    // off = frame 0
    setOff() {
        this.setFrame(0);
        this.on = false;
    }

    setOnToggle() {
        if (this.on == false) {
            this.setOn();
        } else {
            this.setOff();
        }
    }


    // enable = frame 0, normal, default
    setEnable() {
        this.setFrame(0);
        this.setInteractive();
        this.enable = true;
    }

    // disable = frame 3
    setDisable() {
        this.setFrame(3);
        this.disableInteractive();
        this.enable = false;
    }

    setEnableToggle() {
        if (this.enable == false) {
            this.setEnable();
        } else {
            this.setDisable();
        }
    }

    setFrame(frame) {
        this.getAll().forEach(function (item) {
            if (item.visFrame == frame) {
                item.visible = true;
            } else {
                item.visible = false;
            }
            if (item.visFrame === undefined) {
                item.visible = true;
            }

        }, this);
        this.frame=frame;

    }
};

class TextButton extends Phaser.GameObjects.Container {
    constructor(config) { // {scene, width, height, text, textFont, textStyle, 0xbackgroundColor}
        super(config.scene, 0, 0);

        var myZoom = (config.zoom ? config.zoom : zoom);

    // config.frame;
    // off
        var b1 = config.scene.add.rectangle(0, 0, config.width * myZoom, config.height * myZoom, config.backgroundColor);
        var b2 = config.scene.add.text(0, 0, config.text, {
            font: config.textFont,
            fill: config.textStyle,
            align: 'center',
        });
        b2.setOrigin(.5, .5);

        this.add([b1, b2]);
        this.setSize(config.width * myZoom, config.height * myZoom);
        this.setInteractive();
        this.setScale(config.scale ? config.scale : deviceScale);
        this.normScale = this.scaleX;
        config.scene.add.existing(this);
    }

    // on

   

    // disabled
};

class RoundButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        var b1 = config.scene.add.arc(0, 0, 20, 0, 360, false);
        b1.setStrokeStyle(2, config.style);
        if (config.type == 'plus') {
            var b2 = config.scene.add.line(0, 0, 0, 20, 0, 0);
            var b3 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);

        } else if (config.type == 'minus') {
            var b2 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            var b3 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);

        } else if (config.type == 'select') {
            var b2 = config.scene.add.rectangle(0, 0, 20, 20);
            b2.visFrame = 1;
            var b3 = config.scene.add.rectangle(0, 0, 20, 20);
            b3.visFrame = 1;
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);
        }
        this.add([b1, b2, b3]);
        this.setSize(40, 40);
        this.setInteractive();
        config.scene.add.existing(this);
        this.setScale(deviceScale);
        this.normScale = this.scaleX;
        this.setFrame(0);
    }

    setFrame(frame) {
        this.getAll().forEach(function (item) {
            if (item.visFrame == frame) {
                item.visible = true;
            } else {
                item.visible = false;
            }
            if (item.visFrame === undefined) {
                item.visible = true;
            }

        }, this);

    }
};

class MenuButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);
        //var b2 = scene.add.rectangle(0, 0, 20, 20);
        var b1 = config.scene.add.line(0, 0, 0, 0, 30, 0);
        var b2 = config.scene.add.line(0, 0, 0, 10, 30, 10);
        var b3 = config.scene.add.line(0, 0, 0, 20, 30, 20);
        b1.setStrokeStyle(1, config.style);
        b2.setStrokeStyle(1, config.style);
        b3.setStrokeStyle(1, config.style);

        this.add([b1, b2, b3]);
        this.setSize(40, 40);
        this.setInteractive();
        config.scene.add.existing(this);
        this.setScale(deviceScale);
        this.normScale = this.scaleX;


    }
};

class SpeakerButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);

        //var b2 = scene.add.rectangle(0, 0, 20, 20);
        var b1 = config.scene.add.line(8, 0, 0, 20, 20, 0, config.style);
        b1.setLineWidth(2, 2);
        b1.visFrame = 1;

        var b1a = config.scene.add.line(8, 0, 0, 0, 20, 20, config.style);
        b1a.setLineWidth(2, 2);
        b1a.visFrame = 1;

        var b2 = config.scene.add.line(0, 0, 0, 0, 15, 0, config.style);
        b2.setLineWidth(1, 9);
        var b2c = config.scene.add.rectangle(-4, 1, 7, 7, config.style);

        var b2a = config.scene.add.arc(10, 0, 8, 270, 450, false);
        b2a.setStrokeStyle(1, config.style);

        var b2b = config.scene.add.arc(14, 0, 10, 270, 450, false);
        b2b.setStrokeStyle(1, config.style);
        config.scene.tweens.add({
            targets: [b2a, b2b],
            scaleX: 1.2,
            scaleY: 1,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'

        });

        // add the graphicObjects to the container
        this.add([b1, b1a, b2, b2a, b2b, b2c]);
        this.setSize(40, 40);
        this.setInteractive();
        this.setScale(deviceScale);
        this.normScale = this.scaleX;

        // add container to the scene
        config.scene.add.existing(this);

        // set initial frame to show
        this.setFrame(0);

    }

    setFrame(frame) {
        this.getAll().forEach(function (item) {
            if (item.visFrame == frame) {
                item.visible = true;
            } else {
                item.visible = false;
            }
            if (item.visFrame === undefined) {
                item.visible = true;
            }

        }, this);

    }
};