/**************************************************************************************
 * GameOptions Class
 * @author Doug Park
 * @version v1.0
 * @desc Global game options go here
 * @date 2018-10-10
 **************************************************************************************/

 // game defined options
var GameOption = {};

GameOption.next = 5;
GameOption.level = 0;
GameOption.gameLevel= 1;

GameOption.timeGoal = 3;
GameOption.timeGoalValues = [0, 1, 1.5, 2, 2.5, 3];
GameOption.timeGoalArray = ['Error', '1 Second', '1.5 Seconds', '2 Seconds', '2.5 Seconds', '3 Seconds'];
GameOption.getTimeGoal = function () {
    return GameOption.timeGoalArray[GameOption.timeGoal]
};

GameOption.playerId = 1;
GameOption.playerIdArray = ['Error', 'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'];
GameOption.getPlayerId = function () {
    return GameOption.playerIdArray[GameOption.playerId]
};

GameOption.arithmeticType = 3;
GameOption.arithmeticArray = ['Error', 'Add +', 'Subtract -', 'Multiply x', 'Divide ÷'];
GameOption.arithmeticSymbol = ['e', '+', '-', 'x', '÷'];
GameOption.getTypeId = function () {
    return GameOption.arithmeticType
}
GameOption.getTypeSym = function (id = GameOption.arithmeticType) {
    return GameOption.arithmeticSymbol[id];
};
GameOption.getTypeSt = function (id = GameOption.arithmeticType) {
    return GameOption.arithmeticArray[id];
};

GameOption.level = 5;
GameOption.factor = 10;
GameOption.minFactor = 2;

GameOption.buzzer = GameOption.getTimeGoal() * 1000;
GameOption.id = GameOption.getPlayerId() + '.';
//GameOption.level = GameOption.maxLevel; // x 
//GameOption.factor = GameOption.factor; // y
GameOption.questionType = GameOption.arithmeticType;

GameOption.scoreArr = {};

GameOption.createButtons = function() {

    this.buttons = [{
            text: 'C',
            cmd: 'XC',
            backgroundKeyHighlight: true,
            row: 0
        },
        {
            text: '',
            pVal: '',
            row: 0
        },
        
        {
            text: '0',
            pVal: '0',
            mode: {Bin: true, Oct: true, Dec: true, Hex: true},
            row: 0
        },
        {
            text: '.',
            pVal: '.',
            mode: {
                Bin: false,
                Oct: false,
                Dec: true,
                Hex: false
            },
            row: 0
        },
        {
            text: '',
            cmd: '',
            row: 0
        },
        {
            text: '=',
            cmd: '=',
            row: 0
        },
        
        
        {
            text: '',
            cmd: '',
            row: 0
        },
        {
            text: 'Del',
            cmd: 'Del',
            backgroundKeyHighlight: true,
            row: 0
        },
        
        
        {
            text: 'aMR',
            cmd: 'aMR',
            row: 1
        },
        {
            text: 'bMR',
            cmd: 'bMR',
            row: 1
        },
        {
            text: '1',
            pVal: '1',
            mode: {
                Bin: true,
                Oct: true,
                Dec: true,
                Hex: true
            },
            row: 1
        },
        {
            text: '2',
            pVal: '2',
            mode: {
                Bin: false,
                Oct: true,
                Dec: true,
                Hex: true
            },
            row: 1
        },
        {
            text: '3',
            pVal: '3',
            mode: {
                Bin: false,
                Oct: true,
                Dec: true,
                Hex: true
            },
            row: 1
        },
        {
            text: 'A',
            pVal: 'A',
            mode: {
                Bin: false,
                Oct: false,
                Dec: false,
                Hex: true
            },
            row: 1
        },
        {
            text: 'D',
            pVal: 'D',
            mode: {
                Bin: false,
                Oct: false,
                Dec: false,
                Hex: true
            },
            row: 1
        },
        {
            text: '+',
            op: '+',
            row: 1
        },
        
        
        
        
        {
            text: 'aMC',
            cmd: 'aMC',
            row: 2
        },
        {
            text: 'bMC',
            cmd: 'bMC',
            row: 2
        },
        {
            text: '4',
            pVal: '4',
            mode: {
                Bin: false,
                Oct: true,
                Dec: true,
                Hex: true
            },
            row: 2
        },
        {
            text: '5',
            pVal: '5',
            mode: {
                Bin: false,
                Oct: true,
                Dec: true,
                Hex: true
            },
            row: 2
        },
        {
            text: '6',
            pVal: '6',
            mode: {
                Bin: false,
                Oct: true,
                Dec: true,
                Hex: true
            },
            row: 2
        },
        {
            text: 'B',
            pVal: 'B',
            mode: {
                Bin: false,
                Oct: false,
                Dec: false,
                Hex: true
            },
            row: 2
        },
        {
            text: 'E',
            pVal: 'E',
            mode: {
                Bin: false,
                Oct: false,
                Dec: false,
                Hex: true
            },
            row: 2
        },
        {
            text: '-',
            op: '-',
            row: 2
        },
        
        
        
        {
            text: 'aM+',
            cmd: 'aM+',
            row: 3
        },
        {
            text: 'bM+',
            cmd: 'bM+',
            row: 3
        },
        {
            text: '7',
            pVal: '7',
            mode: {
                Bin: false,
                Oct: true,
                Dec: true,
                Hex: true
            },
            row: 3
        },
        {
            text: '8',
            pVal: '8',
            mode: {
                Bin: false,
                Oct: false,
                Dec: true,
                Hex: true
            },
            row: 3
        },
        {
            text: '9',
            pVal: '9',
            mode: {
                Bin: false,
                Oct: false,
                Dec: true,
                Hex: true
            },
            row: 3
        },
        {
            text: 'C',
            pVal: 'C',
            mode: {
                Bin: false,
                Oct: false,
                Dec: false,
                Hex: true
            },
            row: 3
        },
        {
            text: 'F',
            pVal: 'F',
            mode: {
                Bin: false,
                Oct: false,
                Dec: false,
                Hex: true
            },
            row: 3
        },
        {
            text: 'X',
            op: '*',
            row: 3
        },
        
        
        
        {
            text: 'aM-',
            cmd: 'aM-',
            row: 4
        },
        {
            text: 'bM-',
            cmd: 'bM-',
            row: 4
        },
        {
            text: 'And',
            cmd: 'And',
            logicGroup: true,
            row: 4
        },
        {
            text: 'Or',
            cmd: 'Or',
            logicGroup: true,
            default: true,
            row: 4
        },
        {
            text: 'Xor',
            cmd: 'Xor',
            logicGroup: true,
            row: 4
        },
        {
            text: 'Not',
            cmd: 'Not',
            logicGroup: true,
            row: 4
        },
        {
            text: '',
            pVal: '',
            row: 4
        },
        
        
        
        {
            text: '/',
            op: '/',
            row: 4
        },
        
        
        
        {
            text: '+/-',
            op: '+/-',
            row: 5
        },
        {
            text: 'Dec',
            cmd: 'Dec',
            modeGroup: true,
            default: true,
            row: 5
        },
        {
            text: 'Hex',
            cmd: 'Hex',
            modeGroup: true,
            row: 5
        },
        {
            text: 'Oct',
            cmd: 'Oct',
            modeGroup: true,
            row: 5
        },
        {
            text: 'Bin',
            cmd: 'Bin',
            modeGroup: true,
            row: 5
        },
        {
            text: 'RGB',
            cmd: 'RGB',
            modeGroup: true,
            row: 5
        },
        
        
        
        
        {
            text: '(',
            op: '(',
            row: 5
        },
        {
            text: ')',
            op: ')',
            row: 5
        },
        
    ];

    return this.buttons;

}