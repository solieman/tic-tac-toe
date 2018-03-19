
function minimax(newBoard, player) {
	let availSpots = emptyCells(clone(newBoard));
// 	console.log('minimax - availSpots: ', availSpots)

    if (checkWinner(newBoard)) {
        if (player === 'Human') {
            return {score: -10};
        } else if (player === 'AI'){
            return {score: 10};
        }
	} else if (availSpots.length === 0) {
		return {score: 0};
	}

	
	let moves = [];
	for (let i = 0; i < availSpots.length; i++) {
    // for (let i = 0; i < 2; i++) {
		let move = {};
		move.index = availSpots[i];
		
		
        // Creat new board with one additonal selection and find its MiniMax
		if (player === 'Human') {
		    newBoard[availSpots[i]] =  -1;
			let result = minimax(clone(newBoard), 'AI');
			move.score = result.score;
		} else {
		    newBoard[availSpots[i]] =  1;
		    
			let result = minimax(clone(newBoard), 'Human');
			move.score = result.score;
		}

// 		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if(player === 'Human') {
		let bestScore = -10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	
	return moves[bestMove];
    // return 1;
}


