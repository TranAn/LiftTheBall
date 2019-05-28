var Coconuts = function(game, player) {
    this.game = game;
    this.player = player;
    this.isPause = false;
}

    Coconuts.prototype = {
        loopSpawn: function() {
            var timer = this.game.time.addEvent({
                delay: 6500,    // ms
                callback: this.spawnCoconut.bind(this),
                //args: [],
                //callbackScope: thisArg,
                loop: true
            });
        },

        spawnCoconut: function() {
            if(this.isPause) {
                return;
            }

            let { width, height } = this.game.sys.game.canvas;
            let ranNum = Phaser.Math.Between(1, 3);

            for(let i = 1; i <= ranNum; i++) {
                let coconut = this.game.physics.add.sprite(0, 0, 'coconut').setOrigin(0.5);
                let x = Phaser.Math.Between(coconut.width / 2, width - coconut.width / 2);
                let y = this.game.cameras.main.scrollY - Phaser.Math.Between(200, 400);
                coconut.x = x;
                coconut.y = y;
                coconut.body.gravity.set(0, Phaser.Math.Between(600, 1000));
                coconut.body.velocity.x = Phaser.Math.Between(-150, 150);
                this.game.physics.add.collider(this.player, coconut, this.game.playerVsCoconut.bind(this.game, coconut));     
            }
        },

        stopSpawn: function() {
            this.isPause = true;
        },

        resumeSpawn: function() {
            this.isPause = false;
        },

    }