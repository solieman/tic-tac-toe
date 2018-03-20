
function minimax(newBoard, player, depth) {
	let availSpots = emptyCells(clone(newBoard));
	depth += 1;

    if (checkWinner(newBoard).status) {
        if (player === 'AI'){
            return {score: 10 - depth };
        } else if (player === 'Human') {
            return {score: depth -10 };
        } else  {
        	return { score: 0 };
        }
	} else if (availSpots.length === 0) {
		return {score: 0 };
	}


	
	let moves = [];
	for (let i = 0; i < availSpots.length; i++) {
    // for (let i = 0; i < 2; i++) {
		let move = {};
		move.index = availSpots[i];
		
		
        // Creat new board with one additonal selection and find its MiniMax
		if (player === 'Human') {
		    newBoard[availSpots[i]] =  -1;
			let result = minimax(clone(newBoard), 'AI', depth);
			move.score = result.score;
		} else {
		    newBoard[availSpots[i]] =  1;
		    
			let result = minimax(clone(newBoard), 'Human', depth);
			move.score = result.score;
		}

// 		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	let bestMove;
	if(player === 'AI') {
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


