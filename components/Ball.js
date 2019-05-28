var Ball = function(game, player) {
    this.game = game;
    this.player = player;
    
    this.ballName = ['ball1', 'ball2', 'ball3'];
    this.ball;
    this.maxspeed = 2;
}

    Ball.prototype = {

        create: function() {
            let { width, height } = this.game.sys.game.canvas;

            if(this.ball != null) {
                this.ball.destroy();
            }

            let ballNumber = Phaser.Math.Between(0, 2);
            this.ball = this.game.physics.add.sprite(this.player.x, this.player.y - 250, this.ballName[ballNumber]).setOrigin(0.5).setScale(0.7);
            this.ball.body.gravity.set(0, Phaser.Math.Between(200, 400));
            this.ball.setBounce(1.5);
            this.ball.body.collideWorldBounds = true;
            this.ball.body.setMaxVelocity(150, 850);
            this.ball.setDepth(5);

            this.game.physics.add.collider(this.player, this.ball, this.game.playerVsBall.bind(this.game, this.ball));     
        },

    }