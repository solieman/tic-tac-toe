
let graphicsBoard = {};

const gamePlay = {
    
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(600, 600, 600, 600);
        game.load.image('start', 'assets/start.png');
    },
    
    create: function(){
        let Board = {};
        currentPlayer = 'Human';
        
        // let items = game.add.group();

        const itemWidth = game.world._width / numberOfItems;

        // draw a rectangle
        
        for(let x=0; x< numberOfItems; x++){ 
            for(let y = 0;y<numberOfItems;y++){
                //Draw Rectangle
                let graphics = game.add.graphics(x*itemWidth, y*itemWidth);
                graphics.id = x+''+y;
                graphics.lineStyle(2, 0x0000FF, 1);
                graphics.beginFill(0xFF0000);
                graphics.drawRect(0, 0, itemWidth, itemWidth);
                graphics.inputEnabled = true;
                graphics.input.useHandCursor = true;
                graphics.events.onInputUp.add(onClick, this);
                graphics.endFill();
                graphicsBoard[graphics.id] = graphics;
                Board[graphics.id] = 0;
            }
        }
        
        
        let stepsDiv = document.getElementById('steps-div');
        stepsDiv.innerHTML = '';

        function onClick(target, pointer){
            
            if(target.exists){
                
                stepsDiv.innerHTML += (target.id + ',');

                if (currentPlayer === "Human") {
                    //Draw X
                    drawX(target,itemWidth);
                    Board[target.id] = -1;
                    
                } else if (currentPlayer === "AI") {
                    //Draw O
                    drawO(target,itemWidth);
                    Board[target.id] = 1;
                }
                
                //Remove the target after adding the new element
                
                target.exists = false;
                
                //Check
                const result = checkWinner(Board);

                if (result) {
                    //Show result
                    showResult(currentPlayer);
                } else {
                    if (emptyCells(Board).length) {
                        changePlayer();
                        // setTimeout(function(){console.log('Set Time Out...');changePlayer();},100);
                    } else {
                        showResult("Draw!");
                    }
                    
                    //changePlayer();
                }
                
            } else {
                console.log(target.id, ' already dead');
            }
        }
        
        
        function changePlayer() {
            currentPlayer = currentPlayer === "Human" ? "AI" : "Human";
            
            if(currentPlayer === "AI") {
                //AI play!!
                const availableEmptyCells = emptyCells(Board);

                if (availableEmptyCells && availableEmptyCells.length > 0) {
                    //TO-DO: Select from MiniMax
                    
                    const bestSelectionItem = bestSelection(Board);
                    let selectedItem = bestSelectionItem.index;

                    onClick(graphicsBoard[selectedItem], null);    
                } else {
                    
                }
            }
        }
    },
    
    update: function(){
        //console.log('update');
        
    },
    
    render: function(){
        //console.log('render');
    },
}

function emptyCells(currentBoard) {
	let stillEmptyCells = [];
	for (let key in currentBoard) {
        if (currentBoard.hasOwnProperty(key)) {
            if(currentBoard[key] === 0){//'number') {
                stillEmptyCells.push(key);
            }
        }
    }
    return stillEmptyCells;
}

function scoreOfTheGame() {
    game.state.start('gameScore');
}

function drawO(target, itemWidth) {
    // draw a O
    let graphics = game.add.graphics(0, 0);
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF0B, 1);
    graphics.drawCircle(target.x + itemWidth/2, target.y + itemWidth/2, itemWidth);
    
    graphics.beginFill(0x000000, 1);
    graphics.drawCircle(target.x + itemWidth/2, target.y + itemWidth/2, itemWidth/2);
    graphics.endFill();
}

function drawX(target, itemWidth) {
    // draw a X
    let graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFF00FF);
    graphics.drawRect(target.x, target.y, itemWidth, itemWidth);
    
    let textElement = new Phaser.Text(game, target.x + itemWidth/2, target.y + itemWidth/2, "X", {font: itemWidth+"px Arial", fill: "#ffffff"});
    textElement.anchor.x = 0.5;
    textElement.anchor.y = 0.5;
    graphics.addChild(textElement);
    graphics.endFill();
}


function bestSelection(newBoard) {
    //Random
    if (numberOfItems > 4) {
        const randomNumber = Math.floor(emptyCells(newBoard).length * Math.random());
        return {
            index: emptyCells(newBoard)[randomNumber]
        };
    } else {
        //MiniMax
        const res = minimax(clone(newBoard),'AI');
        console.log('bestSelection - res: ',res);
    	return res;
    }
}

function checkWinner(newBoard){
        //check rows
        for (let row = 0; row < numberOfItems; row++) {
            let sum = 0
            for (let column = 0; column < numberOfItems; column++) {
                sum += newBoard[column+''+row];
            }
            
            if(Math.abs(sum) === numberOfItems){
                return(true);
            }
        }
        
        //check columns
        for (let column = 0; column < numberOfItems; column++) {
            let sum = 0
            for (let row = 0; row < numberOfItems; row++) {
                sum += newBoard[column+''+row];
            }
            
            if(Math.abs(sum) === numberOfItems){
                return(true);
            }
        }
    
        //check diagonals
        let firstDiagonalSum = 0;
        let secondDiagonalSum = 0;
        
        for (let order = 0; order < numberOfItems; order++) {
            firstDiagonalSum += newBoard[order+''+order];
            secondDiagonalSum += newBoard[order+''+(numberOfItems -1 -order)];
            
            if(Math.abs(firstDiagonalSum) === numberOfItems || Math.abs(secondDiagonalSum) === numberOfItems){
                return(true);
            }
        }
    return(false);
}
        
function showResult(result) {
    if(result !== "Draw!"){
        GameResult = 'Winner is: '+ result;
    } else { 
        GameResult = result;
    }
    
    let graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x686868,0.75);
    graphics.drawRect(0, 0, game.world._width, game.world._height);
    
    let textElement = new Phaser.Text(game, game.world.centerX, game.world.centerY, 'Winner is: '+result, {font: "40px Arial", fill: "#00ffff"});
    textElement.anchor.x = 0.5;
    textElement.anchor.y = 0.5;
    graphics.addChild(textElement);
    graphics.endFill();
    
    for (let key in graphicsBoard) {
        if (graphicsBoard.hasOwnProperty(key)) {
            if(typeof(graphicsBoard) != 'number') {
                graphicsBoard[key].events.onInputUp.removeAll();
            }
        }
    }
    
    const startBtn = game.add.button(game.world.centerX, 1.5 * game.world.centerY, 'start', scoreOfTheGame);
    startBtn.anchor.set(0.5, 0.5);
    const text = game.add.text(0, 0, "Try again!!!", {font: "18px Arial", fill: "#ffffff"});
    text.anchor.set(0.5, 0.5);
    startBtn.addChild(text);
}

//Helpers functions
function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor(); 
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}