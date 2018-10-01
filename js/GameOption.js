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