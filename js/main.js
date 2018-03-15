/*global Phaser */

let numberOfItems = 3;

function init() {
    // body...
    
}

console.log('script loadded');

const game = new Phaser.Game(600, 600, Phaser.CANVAS, 'game-main-div');//, { preload: preload, create: create, update: update, render: render });


game.state.add('gameStart', gameStart);
game.state.add('gamePlay', gamePlay);
game.state.add('gameScore', gameScore);
game.state.start('gameStart');




