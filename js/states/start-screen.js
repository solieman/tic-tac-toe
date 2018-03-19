const gameStart = {
    
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setMinMax(600, 600, 600, 600);
        game.load.image('start', 'assets/start.png');
    },
    
    create: function(){
        const startBtn = game.add.button(game.world.centerX, game.world.centerY, 'start', this.startTheGame);
        startBtn.anchor.set(0.5, 0.5);
        const text = game.add.text(0, 0, "Can you do it?", {font: "18px Arial", fill: "#ffffff"});
        text.anchor.set(0.5, 0.5);
        startBtn.addChild(text);
    },
    
    update: function(){
        
    },
    
    render: function(){
        
    },
    
    startTheGame: function() {
        console.log('will do!!');
        document.getElementById("board-width").style.display = 'none';
        game.state.start('gamePlay');
    }
}