/**************************************************************************************
 * ScaleOverlay
 * @author Doug Park
 * @version v1.0
 * @desc Show a scale overlay grid to help scale and place items on scene
 * @date 2018-09-29
 **************************************************************************************/
"use strict";

class ScaleOverlay {
    constructor(config) {

        this.show = true;
        // pointers and touch
        // one pointer is automatic, add a second to make two!
        config.ctx.input.addPointer(2);

        config.ctx.input.on('pointerdown', function (pointer) {

            // if three fingers down then show
            if (config.ctx.input.pointer2.isDown) {

                if (this.show) {
                    this.displayChart(config);
                    this.displayInfo(config);
                    this.displayInfo2(config);
                    this.show = false;
                } else {
                    this.clearChart(config);
                    this.clearInfo(config);
                    this.clearInfo2(config);
                    this.show = true;
                }
            }

        }, this);

        // add keyboard listener to scene
        config.ctx.input.keyboard.on('keydown_P', function (event) {
            if (this.show) {              
                this.displayChart(config);
                this.displayInfo(config);
                this.displayInfo2(config);
                this.show = false;
            } else {
                this.clearChart(config);
                this.clearInfo(config);
                this.clearInfo2(config);
                this.show = true;
            }
        }, this);

    }

    clearChart(config) {
        config.ctx.chart.clear();
    }

    displayChart(config) {
        // add chart to scene
        config.ctx.chart = config.ctx.add.graphics(Povin.placeX(0), Povin.placeY(0));
        // clear every time
        // slow, need to make a sprite or something faster
        config.ctx.chart.clear();
        // place the outline of the chart grid on the screen
        Povin.place(config.ctx.chart, Povin.placeX(0), Povin.placeY(0));
        config.ctx.chart.lineStyle(2, 0xebebeb, 1);
        config.ctx.chart.fillStyle(0x333333, .5);
        config.ctx.chart.fillRect(0, 0, Povin.placeX(1), Povin.placeY(1));

        // touch point rectangle
        config.ctx.chart.lineStyle(1, 0xebebeb, 1);


        // position horiz numbers
        var basehX = Povin.placeX(.185);
        var basehY = Povin.placeY(.26);

        // position vertical numbers
        var basevX = Povin.placeX(.115);
        var basevY = Povin.placeY(.30);

        var iCount = 0;

        // store vertical and horiz numbers in an array so can manage them individually
        config.ctx.hText = {};

        // vertical lines across x axis
        for (var x = 0; x <= Povin.placeX(1); x += Povin.placeX(1) / 10) {
            config.ctx.chart.lineStyle(1, 0xebebeb, .5);
            config.ctx.chart.beginPath();
            config.ctx.chart.moveTo(x, 0);
            config.ctx.chart.lineTo(x, Povin.placeY(1));
            config.ctx.chart.closePath();
            config.ctx.chart.strokePath();
        }

        // horizontal lines down y axis
        for (var y = 0; y <= Povin.placeY(1); y += Povin.placeY(1) / 10) {
            config.ctx.chart.lineStyle(1, 0xebebeb, .5);
            config.ctx.chart.beginPath();
            config.ctx.chart.moveTo(0, y);
            config.ctx.chart.lineTo(Povin.placeX(1), y);
            config.ctx.chart.closePath();
            config.ctx.chart.strokePath();
        }

    }

    displayInfo(config) {

        config.ctx.dbs = 'Scale Info\n' +
            'width x height = ' + width + ' x ' + height + '\n' +
            'w x h ratio = ' + (width / height) + '\n' +
            'devicePixelRatio = ' + window.devicePixelRatio + '\n' +
            'touchPoint = ' + 44 * window.devicePixelRatio + ' x ' + 44 * window.devicePixelRatio + '\n' +
            'zoom = ' + zoom + '\n' +
            'deviceScale = ' + deviceScale + '\n' +
            'Povin.placeX(1) = ' + Povin.placeX(1) + '\n' +
            'Povin.placeY(1) = ' + Povin.placeY(1) + '\n' +
            '';
        config.ctx.aText = config.ctx.add.text(0, 0, config.ctx.dbs, {
            font: '40px ' + config.ctx.myFont,
            fill: '#ebebeb'
        });
        config.ctx.aText.setOrigin(0, 0);
        Povin.place(config.ctx.aText, 0.1, 0.20);
    }

    clearInfo(config) {

        config.ctx.aText.text = '';
    }

    displayInfo2(config) {
        // center
        config.ctx.hString = 'x ' + '(' + Povin.placeX(.5) + ',' + Povin.placeY(.5) + ')';
        config.ctx.hText = config.ctx.add.text(0, 0, config.ctx.hString, {
            font: '30px ' + config.ctx.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        config.ctx.hText.setOrigin(0, 0.5);
        Povin.place(config.ctx.hText, 0.5, 0.5);

        // top left
        config.ctx.h2String = 'x ' + '(' + Povin.placeX(0) + ',' + Povin.placeY(0) + ')';
        config.ctx.h2Text = config.ctx.add.text(0, 0, config.ctx.h2String, {
            font: '30px ' + config.ctx.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        config.ctx.h2Text.setOrigin(0, 0);
        Povin.place(config.ctx.h2Text, 0, 0);

        // top right
        config.ctx.h3String = '(' + Povin.placeX(1) + ',' + Povin.placeY(0) + ')' + ' x';
        config.ctx.h3Text = config.ctx.add.text(0, 0, config.ctx.h3String, {
            font: '30px ' + config.ctx.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        config.ctx.h3Text.setOrigin(1, 0);
        Povin.place(config.ctx.h3Text, 1, 0);

        // bottom left
        config.ctx.h4String = 'x ' + '(' + Povin.placeX(0) + ',' + Povin.placeY(1) + ')';
        config.ctx.h4Text = config.ctx.add.text(0, 0, config.ctx.h4String, {
            font: '30px ' + config.ctx.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        config.ctx.h4Text.setOrigin(0, 1);
        Povin.place(config.ctx.h4Text, 0, 1);

        // bottom right
        config.ctx.h5String = '(' + Povin.placeX(1) + ',' + Povin.placeY(1) + ')' + ' x';
        config.ctx.h5Text = config.ctx.add.text(0, 0, config.ctx.h5String, {
            font: '30px ' + config.ctx.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        config.ctx.h5Text.setOrigin(1, 1);
        Povin.place(config.ctx.h5Text, 1, 1);


    }

    clearInfo2(config) {

        config.ctx.hText.text = '';
        config.ctx.h2Text.text = '';
        config.ctx.h3Text.text = '';
        config.ctx.h4Text.text = '';
        config.ctx.h5Text.text = '';
    }

}
