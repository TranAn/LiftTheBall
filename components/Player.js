var Player = function(game){
    this.game = game;
    this.player;
    this.cursor;
    this.playerOriginY;
    this.playerTravelDistance;
    this.cameraOriginY;
    this.cameraMinY;

    this.sceneWidth;
    this.sceneHeigh;
};

    Player.prototype = {
        
        create: function(){ 
            let { width, height } = this.game.sys.game.canvas;
            this.sceneWidth = width;
            this.sceneHeigh = height;

            this.player = this.game.physics.add.sprite(width/2, 300, 'player_pose1', 1).setOrigin(0.5).setScale(1);
            this.player.body.collideWorldBounds = true;
            this.player.body.gravity.set(0, Phaser.Math.Between(500,600));
            //this.handleBounce(2);
            
            this.cursor = this.game.input.keyboard.createCursorKeys();
            
            this.playerOriginY = this.player.y;
            this.playerTravelDistance = 0;
            this.cameraOriginY = this.game.cameras.main.scrollY;
            this.cameraMinY = 100000;
        },
        
        handleBounce: function(i){
              this.player.body.bounce.set(1,i);    
        },
        
        update: function(){
            if(this.player.y < this.playerOriginY) {
                this.playerTravelDistance = Math.max(this.playerTravelDistance, Math.abs(this.playerOriginY - this.player.y));
                this.cameraMinY = Math.min(this.cameraMinY, this.cameraOriginY - this.playerTravelDistance);
                this.game.cameras.main.scrollY = this.cameraMinY;
                this.game.physics.world.setBounds(0, 0 - this.sceneHeight - this.playerTravelDistance, this.sceneWidth, this.sceneHeight * 2.5 + this.playerTravelDistance);
            }
        },
        
        handleMovement: function(){
            if(this.cursor.left.isDown){
                this.player.setFrame(4);

                if(this.player.x - this.player.width/2 >= 0) {
                    this.player.body.velocity.x = -150;
                }
                else {
                    this.player.body.velocity.x = 0;
                }
            }
            else if(this.cursor.right.isDown){
                this.player.setFrame(3);

                if(this.player.x + this.player.width/2 <= this.game.sys.game.canvas.width) {
                    this.player.body.velocity.x = 150;
                }
                else {
                    this.player.body.velocity.x = 0;
                }
            }
            else{
                this.player.setFrame(1);
                this.player.body.velocity.x = 0;
            }
        },
        
    } 