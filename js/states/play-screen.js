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
        
        
        let items = game.add.group();

        
        
        const itemWidth = game.world._width / numberOfItems;
        console.log(itemWidth);
        
        
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
            }
        }
        
        function onClick(target, pointer){
            if(target.exists){
                if (Math.random( )> 0.5) {
                    // draw a O
                    let graphics = game.add.graphics(0, 0);
                    graphics.lineStyle(0);
                    graphics.beginFill(0xFFFF0B, 1);
                    graphics.drawCircle(target.x + itemWidth/2, target.y + itemWidth/2, itemWidth);
                    
                    graphics.beginFill(0x000000, 1);
                    graphics.drawCircle(target.x + itemWidth/2, target.y + itemWidth/2, itemWidth/2);
                    graphics.endFill();
                    
                } else {
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
                    
                //Remove the target after adding the new element
                target.exists = false;
            } else {
                console.log(target.id, ' already dead');
            }
        }
    },
    
    update: function(){
        
    },
    
    render: function(){
        
    },
    
    startTheGame: function() {
        console.log('Done!!');
        game.state.start('gameScore');
    }
}