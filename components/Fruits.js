var Fruits = function(game) {
    this.game = game;
    this.fruitGroup = new Array();
    this.fruitName = ['item1', 'item2', 'item3', 'item4', 'item5'];
}

    Fruits.prototype = {
        create: function(){
            let { width, height } = this.game.sys.game.canvas;
            this.fruitGroup = new Array();

            for(let i = 0; i <= 16; i++) {
                let fruitNumber = Phaser.Math.Between(0, 4);
                let fruit = this.game.physics.add.staticImage(0, 0, this.fruitName[fruitNumber]).setOrigin(0.5).setScale(0.4);
                let x = Phaser.Math.Between(fruit.width / 2, width - fruit.width / 2);
                let y = i > 0 ? this.fruitGroup[i-1].y - Phaser.Math.Between(50, 100) : height / 2;
                fruit.x = x;
                fruit.y = y;
                fruit.setDepth(2);
                fruit.setOffset(x, y);
               
                this.fruitGroup[i] = fruit;
            }
        },

        fruitsCreate: function() {
            let { width, height } = this.game.sys.game.canvas;

            let fidx = this.fruitGroup.length;
            for(let i = fidx; i < fidx + 1; i++) {
                let fruitNumber = Phaser.Math.Between(0, 4);
                let fruit = this.game.physics.add.staticImage(0, 0, this.fruitName[fruitNumber]).setOrigin(0.5).setScale(0.4);
                let x = Phaser.Math.Between(fruit.width / 2, width - fruit.width / 2);
                let y = this.fruitGroup[i-1].y - Phaser.Math.Between(50, 100);
                fruit.x = x;
                fruit.y = y;
                fruit.setDepth(2);
                fruit.setOffset(x, y);
               
                this.fruitGroup[i] = fruit;
            }
        },

        update: function(callback){
            if(this.fruitGroup[0].y > this.game.cameras.main.scrollY + this.game.sys.game.canvas.height - this.fruitGroup[0].height/2) {
                this.fruitGroup[0].destroy();
                this.fruitGroup.splice(0, 1);
                this.fruitsCreate();
                callback.call();
            }
        },

        removeFruit: function(fruit) {
            fruit.destroy();
        },
    }