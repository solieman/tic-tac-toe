let Board = {};

const gamePlay = {
    
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(600, 600, 600, 600);
        game.load.image('start', 'assets/start.png');
    },
    
    create: function(){
        
        
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
                Board[graphics.id] = graphics;
            }
        }
        
        console.log('First Board: ', Board);
        
        function onClick(target, pointer){
            if(target.exists){

                if (currentPlayer === "Human") {
                    //Draw X
                    drawX(target,itemWidth);
                    Board[target.id] = 1;
                    
                } else if (currentPlayer === "AI") {
                    //Draw O
                    drawO(target,itemWidth);
                    Board[target.id] = -1;
                }
                    
                //Remove the target after adding the new element
                
                target.exists = false;
                
                //Check
                // const result = checkWinner();
                const result = checkWinner(Board,currentPlayer);
                console.log('Result: ', result);
                
                if (result) {
                    //Show result
                    showResult(result);
                } else {
                    setTimeout(function(){console.log('Set Time Out...');changePlayer();},100);
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
                    const selectedItemIndex = bestSelection();
                    

                    let selectedItem = availableEmptyCells[selectedItemIndex];

                    onClick(selectedItem, null);    
                } else {
                    
                }
                
                
                // for (let key in Board) {
                //     if (Board.hasOwnProperty(key)) {
                //         if(typeof(Board[key]) != 'number') {
                //             onClick(Board[key], null);
                //             break;
                //         }
                //     }
                // }
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
            if(typeof(currentBoard[key]) !== 'number') {
                stillEmptyCells.push(currentBoard[key]);
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


function bestSelection() {
    //return Math.floor(availableCells.length * Math.random());
    const res = minimax(Board,'AI');
    console.log('bestSelection',res);
	return res;
}



function checkWinner(newBoard,currentPlayer){
    console.log(currentPlayer,'<--------------');

    //check rows
    for (let row = 0; row < numberOfItems; row++) {
        let sum = 0
        for (let column = 0; column < numberOfItems; column++) {
            sum += newBoard[column+''+row];
        }
        if(sum === numberOfItems){
            console.log('We have winner from row here!');
            return(true);
        } else if(sum === -1*numberOfItems) {
            console.log('We have other winner from row here!');
            return(true);
        }
    }
    
    //check columns
    for (let column = 0; column < numberOfItems; column++) {
        let sum = 0
        for (let row = 0; row < numberOfItems; row++) {
            sum += newBoard[column+''+row];
        }
        if(sum === numberOfItems){
            console.log('We have winner from columns here!');
            return(true);
        } else if(sum === -1*numberOfItems) {
            console.log('We have other winner from columns here!');
            return(true);
        }
    }

    //check diagonals
    let firstDiagonalSum = 0;
    let secondDiagonalSum = 0;
    
    for (let order = 0; order < numberOfItems; order++) {
        firstDiagonalSum += newBoard[order+''+order];
        secondDiagonalSum += newBoard[order+''+(numberOfItems -1 -order)];
        
        if(firstDiagonalSum === numberOfItems || secondDiagonalSum == numberOfItems){
            console.log('We have winner from diagonals here!');
            return(true);
        } else if(firstDiagonalSum === -1*numberOfItems  || secondDiagonalSum == -1*numberOfItems) {
            console.log('We have other winner from diagonals here!');
            return(true);
        }
    }
    
    //check available cells
    // let availableCells = numberOfItems*numberOfItems;
    // for (let key in newBoard) {
    //     if (newBoard.hasOwnProperty(key)) {
    //         if(typeof(newBoard[key]) != 'number') {
    //             break;
    //         } else {
    //             availableCells--;
    //         }
    //     }
    // }
    
    console.log('check: ', newBoard);
    
    let availableCells = emptyCells(newBoard).length;
    
    if (availableCells) {
        console.log('More Movies available');
        // return false;
        
    } else {
        console.log('No more moves...');
        // GameResult = "Draw!";
        showResult("Draw!");
        // return(false);
    }
    
    return(false);
}
        


function showResult(result) {
    if(result !== "Draw!"){
        GameResult = 'Winner is: '+ result;
    } else { GameResult = result; }
    let graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x686868,0.75);
    graphics.drawRect(0, 0, game.world._width, game.world._height);
    
    let textElement = new Phaser.Text(game, game.world.centerX, game.world.centerY, 'Winner is: '+result, {font: "40px Arial", fill: "#00ffff"});
    textElement.anchor.x = 0.5;
    textElement.anchor.y = 0.5;
    graphics.addChild(textElement);
    graphics.endFill();
    
    for (let key in Board) {
        if (Board.hasOwnProperty(key)) {
            if(typeof(Board[key]) != 'number') {
                console.log('-------> ',Board[key]);
                Board[key].events.onInputUp.removeAll();
            }
        }
    }
    
    const startBtn = game.add.button(game.world.centerX, 1.5 * game.world.centerY, 'start', scoreOfTheGame);
    startBtn.anchor.set(0.5, 0.5);
    const text = game.add.text(0, 0, "Try again!!!", {font: "18px Arial", fill: "#ffffff"});
    text.anchor.set(0.5, 0.5);
    startBtn.addChild(text);
}



function minimax(newBoard, player) {
	var availSpots = emptyCells(newBoard);
	console.log(availSpots);
	console.log(availSpots.length);

	if (checkWinner(newBoard, 'Human')) {
		return {score: -10};
	} else if (checkWinner(newBoard, 'AI')) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
	    
		//To-DO: Creat new board with one additonal selection
		
		
		var move = {};
		
// 		move.index = newBoard[availSpots[i]];
		move.index = availSpots[i];
// 		newBoard[availSpots[i]] = player;
        if (player === 'Human') {
		    newBoard[availSpots[i].id]=  1;
		} else {
		    newBoard[availSpots[i].id]=  -1;
		}

		if (player == 'AI') {
		    console.log('AI');
// 			var result = minimax(newBoard, 'AI');
// 			move.score = result;
		} else {
		    console.log('Human');
// 			var result = minimax(newBoard, 'Human');
// 			move.score = result.score;
		}

		newBoard[availSpots[i].id] = move.index;

		moves.push(move);
	}
	
	console.log(moves,newBoard);

	var bestMove;
	if(player === 'AI') {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	
	console.log('bestMove: ',bestMove);

// 	return moves[bestMove];
    return 1;
}