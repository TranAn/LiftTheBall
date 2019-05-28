window.onload = function(){
    
    var config = {
        scale: {
            parent: 'phaser-app',
            // mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 9 * 45,
            height: 16 * 45
        },
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        transparent: true,
        scene: [Loading, Home, Game, End, Instruction, Credit],
    };

    game = new Phaser.Game(config);   

}