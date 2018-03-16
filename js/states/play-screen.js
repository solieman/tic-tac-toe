const gamePlay = {
    
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(600, 600, 600, 600);
        game.load.image('start', 'assets/start.png');
    },
    
    create: function(){
        const startBtn = game.add.button(game.world.centerX, game.world.centerY, 'start', this.startTheGame);
        startBtn.anchor.set(0.5, 0.5);
        const text = game.add.text(0, 0, "Good for you!!!", {font: "18px Arial", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        startBtn.addChild(text);
        
        let Board = {};
        
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
        
        function onClick(target, pointer){
            if(target.exists){
                console.log(currentPlayer);
                if (currentPlayer === "Human") {
                    // draw a O
                    let graphics = game.add.graphics(0, 0);
                    graphics.lineStyle(0);
                    graphics.beginFill(0xFFFF0B, 1);
                    graphics.drawCircle(target.x + itemWidth/2, target.y + itemWidth/2, itemWidth);
                    
                    graphics.beginFill(0x000000, 1);
                    graphics.drawCircle(target.x + itemWidth/2, target.y + itemWidth/2, itemWidth/2);
                    graphics.endFill();
                    Board[target.id] = 1;
                    
                } else if (currentPlayer === "AI") {
                    // draw a X
                    let graphics = game.add.graphics(0, 0);
                    graphics.beginFill(0xFF00FF);
                    graphics.drawRect(target.x, target.y, itemWidth, itemWidth);
                    
                    let textElement = new Phaser.Text(game, target.x + itemWidth/2, target.y + itemWidth/2, "X", {font: itemWidth+"px Arial", fill: "#ffffff"});
                    textElement.anchor.x = 0.5;
                    textElement.anchor.y = 0.5;
                    graphics.addChild(textElement);
                    graphics.endFill();
                    Board[target.id] = -1;
                }
                    
                //Remove the target after adding the new element
                
                target.exists = false;
                
                //Check
                const result = checkWinner();
                
                if (result) {
                    //Show result
                    console.log('Winner is: ', result);
                } else {
                    changePlayer();
                }
                
            } else {
                console.log(target.id, ' already dead');
            }
        }
        
        
        function checkWinner(){
            
            console.log(Board);
            
            //check rows
            for (let row = 0; row < numberOfItems; row++) {
                let sum = 0
                for (let column = 0; column < numberOfItems; column++) {
                    sum += Board[column+''+row];
                }
                if(sum === numberOfItems){
                    console.log('We have winner from row here!');
                    return(currentPlayer);
                } else if(sum === -1*numberOfItems) {
                    console.log('We have other winner from row here!');
                    return(currentPlayer);
                }
            }
            
            //check columns
            for (let column = 0; column < numberOfItems; column++) {
                let sum = 0
                for (let row = 0; row < numberOfItems; row++) {
                    sum += Board[column+''+row];
                }
                if(sum === numberOfItems){
                    console.log('We have winner from columns here!');
                    return(currentPlayer);
                } else if(sum === -1*numberOfItems) {
                    console.log('We have other winner from columns here!');
                    return(currentPlayer);
                }
            }
    
            //check diagonals
            let firstDiagonalSum = 0;
            let secondDiagonalSum = 0;
            
            for (let order = 0; order < numberOfItems; order++) {
                firstDiagonalSum += Board[order+''+order];
                secondDiagonalSum += Board[order+''+(numberOfItems -1 -order)];
                
                if(firstDiagonalSum === numberOfItems || secondDiagonalSum == numberOfItems){
                    console.log('We have winner from diagonals here!');
                    return(currentPlayer);
                } else if(firstDiagonalSum === -1*numberOfItems  || secondDiagonalSum == -1*numberOfItems) {
                    console.log('We have other winner from diagonals here!');
                    return(currentPlayer);
                }
            }
            
            //check available cells
            let availableCells = numberOfItems*numberOfItems;
            for (let key in Board) {
                if (Board.hasOwnProperty(key)) {
                    if(typeof(Board[key]) != 'number') {
                        break;
                    } else {
                        availableCells--;
                    }
                }
            }
            
            if (availableCells) {
                
            } else {
                console.log('No more moves...');
                return(0);
            }
        }
        
        
        function changePlayer() {
            currentPlayer = currentPlayer === "Human" ? "AI" : "Human";
            
            if(currentPlayer === "AI") {
                //AI play!!
                for (let key in Board) {
                    if (Board.hasOwnProperty(key)) {
                        if(typeof(Board[key]) != 'number') {
                            onClick(Board[key], null);
                            break;
                        }
                    }
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
    
    startTheGame: function() {
        console.log('Done!!');
        game.state.start('gameScore');
    }
}