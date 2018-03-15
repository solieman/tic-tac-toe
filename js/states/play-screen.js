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
        
        
        var items = game.add.group();

        
        
        const itemWidth = game.world._width / numberOfItems;
        console.log(itemWidth);
        
        var graphics = game.add.graphics(0, 0);
        // draw a rectangle
        graphics.lineStyle(2, 0x0000FF, 1);
        for(let x=0; x< numberOfItems; x++){ 
            for(let y = 0;y<numberOfItems;y++){
                console.log(x,y);
                graphics.drawRect(x*itemWidth, y*itemWidth, itemWidth, itemWidth);
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