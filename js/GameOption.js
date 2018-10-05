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
            row: 0
        },
        {
            text: 'Del',
            cmd: 'Del',
            row: 0
        },
        {
            text: '0',
            pVal: '0',
            row: 0
        },
        {
            text: '.',
            pVal: '.',
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
            text: 'Dec',
            cmd: 'Dec',
            row: 0
        },
        
        {
            text: '',
            cmd: '',
            row: 0
        },
        
        {
            text: 'MR',
            cmd: 'MR',
            row: 1
        },
        {
            text: '',
            cmd: '',
            row: 1
        },
        {
            text: '1',
            pVal: '1',
            row: 1
        },
        {
            text: '2',
            pVal: '2',
            row: 1
        },
        {
            text: '3',
            pVal: '3',
            row: 1
        },
        {
            text: '+',
            op: '+',
            row: 1
        },
        {
            text: 'Hex',
            cmd: 'Hex',
            row: 1
        },
        {
            text: 'Not',
            op: '~',
            row: 1
        },
        
        
        {
            text: 'MC',
            cmd: 'MC',
            row: 2
        },
        {
            text: '',
            cmd: '',
            row: 2
        },
        {
            text: '4',
            pVal: '4',
            row: 2
        },
        {
            text: '5',
            pVal: '5',
            row: 2
        },
        {
            text: '6',
            pVal: '6',
            row: 2
        },
        {
            text: '-',
            op: '-',
            row: 2
        },
        {
            text: 'Oct',
            cmd: 'Oct',
            row: 2
        },
        {
            text: 'And',
            op: '&',
            row: 2
        },
        
        {
            text: 'M+',
            cmd: 'M+',
            row: 3
        },
        {
            text: '',
            cmd: '',
            row: 3
        },
        {
            text: '7',
            pVal: '7',
            row: 3
        },
        {
            text: '8',
            pVal: '8',
            row: 3
        },
        {
            text: '9',
            pVal: '9',
            row: 3
        },
        {
            text: 'X',
            op: '*',
            row: 3
        },
        {
            text: 'Bin',
            cmd: 'Bin',
            row: 3
        },
        {
            text: 'Or',
            op: '|',
            row: 3
        },
        
        {
            text: 'M-',
            cmd: 'M-',
            row: 4
        },
        {
            text: '',
            cmd: '',
            row: 4
        },
        {
            text: 'A',
            pVal: 'A',
            row: 4
        },
        {
            text: 'B',
            pVal: 'B',
            row: 4
        },
        {
            text: 'C',
            pVal: 'C',
            row: 4
        },
        {
            text: '/',
            op: '/',
            row: 4
        },
        {
            text: 'RGB',
            cmd: 'RGB',
            row: 4
        },
        {
            text: 'Xor',
            op: '^',
            row: 4
        },
        
        {
            text: '+/-',
            op: '+/-',
            row: 5
        },
        {
            text: '',
            op: '',
            row: 5
        },
        {
            text: 'D',
            pVal: 'D',
            row: 5
        },
        {
            text: 'E',
            pVal: 'E',
            row: 5
        },
        {
            text: 'F',
            pVal: 'F',
            row: 5
        },
        {
            text: '(',
            pVal: '(',
            row: 5
        },
        {
            text: ')',
            pVal: ')',
            row: 5
        },
        {
            text: '',
            pVal: '',
            row: 5
        },
    ];

    return this.buttons;

}