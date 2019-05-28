var Platforms = function(game){
    this.game = game;
    this.pltGroup = new Array();
};

    Platforms.prototype = {
        create: function(){
            let { width, height } = this.game.sys.game.canvas;

            for(let i = 0; i <= 10; i++) {
                let platform = this.game.physics.add.staticImage(0, 0, 'platform').setOrigin(0.5);
                let x = i > 0 ? Phaser.Math.Between(platform.width / 2 + 20, width - 20 - platform.width / 2) : width / 2;
                let y = i > 0 ? this.pltGroup[i-1].y - Phaser.Math.Between(height / 6, height / 5) : height - platform.height;
                platform.x = x;
                platform.y = y;
                platform.scaleX = platform.scaleX * 1.4;
                platform.scaleY = platform.scaleY * 1.3;
                platform.setOffset(x, y);
                platform.body.checkCollision.down = false;
                platform.body.checkCollision.left = false;
                platform.body.checkCollision.right = false;
                this.pltGroup[i] = platform;
            }
        },
        
        platformCreate: function(){
            let { width, height } = this.game.sys.game.canvas;            

            this.pltGroup[0].destroy();
            this.pltGroup.splice(0, 1);
            let platform = this.game.physics.add.staticImage(0, 0, 'platform').setOrigin(0.5);
            let x = Phaser.Math.Between(platform.width / 2 + 20, width - 20 - platform.width / 2);
            let y = this.pltGroup[this.pltGroup.length-1].y - Phaser.Math.Between(height / 6, height / 5);
            platform.x = x;
            platform.y = y;
            platform.scaleX = platform.scaleX * 1.4;
            platform.scaleY = platform.scaleY * 1.3;
            platform.setOffset(x, y);
            platform.body.checkCollision.down = false;
            platform.body.checkCollision.left = false;
            platform.body.checkCollision.right = false;
            this.pltGroup.push(platform);
            
            return platform;
        },
        
        update: function(callback){
            if(this.pltGroup[0].y > this.game.cameras.main.scrollY + this.game.sys.game.canvas.height - this.pltGroup[0].height/2) {
                callback(this.platformCreate());
            }
        },
        
    }