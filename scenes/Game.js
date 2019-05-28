class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game', active: false });

        this.sceneWidth;
        this.sceneHeight;

        this.player = new Player(this);
        this.platforms = new Platforms(this);
        this.fruits = new Fruits(this);
        this.coconuts;
        this.ball;

        //Game HUD properties
        this.scoreText;
        this.lifeIcons = new Array();
        this.playerHp = 3;

        this.score = 0;
        this.isPause = false;
        this.isEnd = false;

        //Sounds properties
        this.bgSE;
        this.jumpSE;
        this.collectSE;
        this.endSE;
        this.ballBumpSE;

        //track number mobile input down event
        this.touchCount;
    }

    preload() {
        
    }

    resetScore() {
        this.playerHp = 3;
        this.score = 0;
        this.scoreText.setText('0');
        this.isEnd = false;
    }

    create() {
        let { width, height } = this.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeight = height;

        this.createBg();
        this.createUI();
        this.addMobileInput();
        this.addSE();

        this.platforms.create();
        this.player.create();
        this.fruits.create();

        // this.coconuts = new Coconuts(this, this.player.player);
        // this.coconuts.loopSpawn();

        this.physics.world.setBounds(0, 0 - this.sceneHeight, this.sceneWidth, this.sceneHeight * 2.5);
        this.ball = new Ball(this, this.player.player);
        this.ball.create();

        this.addCollider();
        this.addFruitOverLap();

        this.resetScore();
    }

    update() {
        this.player.update();     
        this.platforms.update((platform) => this.addPlatformCallback(platform));
        this.fruits.update(() => this.addFruitsCallback());

        //Check game over condition
        if(this.player.player.y > this.cameras.main.scrollY + this.sceneHeight) {
            this.endGame(2000);
        }

        //Check ball fall down
        if(this.ball.ball != null && this.ball.ball.y > this.cameras.main.scrollY + this.sceneHeight) {
            this.playerHp--;
            if(this.playerHp < 0) {
                this.player.player.body.enable = false;
                this.endGame(2000);
            }
            else {
               this.lifeIcons[this.playerHp].destroy();
               this.ball.create();
            }
        }
    }

    createBg() {
        document.body.style.backgroundImage = 'url(/assets/Game/bg.png)';
    }

    createUI() {
        this.scoreText = this.add.text(this.sceneWidth/2, this.sceneHeight - this.sceneHeight/6, "0", { fontFamily: "Ballon", fontSize: 52, color: "#39d179" });
        this.scoreText.setStroke('#ffffff', 5);
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(10);
        this.scoreText.x = this.sceneWidth/2 - this.scoreText.width/2;

        let pauseBtn = this.add.sprite(10, 10, 'pause').setOrigin(0).setInteractive();
        pauseBtn.setScale(0.7);
        pauseBtn.setScrollFactor(0);
        pauseBtn.setDepth(10);
        pauseBtn.on('pointerdown', function (pointer) {
            if(this.isPause) {
                this.player.player.body.enable = true;
                this.ball.ball.body.enable = true;
                //this.coconuts.resumeSpawn();
                this.isPause = false;
            }
            else {
                this.player.player.body.enable = false;
                this.ball.ball.body.enable = false;
                //this.coconuts.stopSpawn();
                this.isPause = true;
            }
        }, this);

        for(let i = 0; i < 3 ; i++) {
            let ballname = 'ball' + (i + 1);
            let lifeIco = this.add.image(0, 10, ballname).setOrigin(1, 0).setScale(0.5);
            lifeIco.setScrollFactor(0);
            lifeIco.setDepth(10);
            lifeIco.x = i > 0 ? this.lifeIcons[i - 1].x - this.lifeIcons[i - 1].width/2 - 5 : this.sceneWidth - 5;
            this.lifeIcons[i] = lifeIco;
        }
    }

    addMobileInput() {
        this.touchCount = 0;
        this.inputLeft = this.add.sprite(60, this.sceneHeight - 80, 'mbinput').setOrigin(0.5).setInteractive();
        this.inputLeft.setScrollFactor(0);
        this.inputLeft.setDepth(8);
        this.inputLeft.setAlpha(0.5);
        this.inputLeft.setName('inputL');
        this.inputLeft.on('pointerdown', function (pointer) {
            this.player.player.setTexture('player_pose1');
            this.player.player.body.velocity.x = -150;
            this.touchCount++;
        }, this);
        this.inputLeft.on('pointerup', function (pointer) {
            this.touchCount = this.touchCount > 0 ? this.touchCount - 1 : 0;
            if( this.touchCount == 0) {
                //this.player.player.setTexture('player_pose0');
                this.player.player.body.velocity.x = 0;
            }
        }, this);

        this.inputRight = this.add.sprite(this.sceneWidth - 60, this.sceneHeight - 80, 'mbinput').setOrigin(0.5).setInteractive();
        this.inputRight.setAngle(180);
        this.inputRight.setScrollFactor(0);
        this.inputRight.setDepth(8);
        this.inputRight.setAlpha(0.5);
        this.inputRight.setName('inputR');
        this.inputRight.on('pointerdown', function (pointer) {
            this.player.player.setTexture('player_pose2');
            this.player.player.body.velocity.x = 150;
            this.touchCount++;
        }, this);
        this.inputRight.on('pointerout', function (pointer) {
            this.touchCount = this.touchCount > 0 ? this.touchCount - 1 : 0;
            if( this.touchCount == 0) {
                //this.player.player.setTexture('player_pose0');
                this.player.player.body.velocity.x = 0;
            }
        }, this);
    }

    addSE() {
        // this.bgMusic = this.sound.add('bgMusic');
        // this.bgMusic.setLoop(true);
        // this.bgMusic.play();
        // this.bgMusic.setVolume(0.5);

        this.jumpSE = this.sound.add('jump');
        this.collectSE = this.sound.add('collect');
        this.endSE = this.sound.add('gameOver');
        this.ballBumpSE = this.sound.add('ballbump');

        this.ballBumpSE.setVolume(0.4);
    }

    addCollider() {
        for(let i = 0; i < this.platforms.pltGroup.length; i++) {
            this.physics.add.collider(this.player.player, this.platforms.pltGroup[i], this.playerVsPlatforms.bind(this, this.platforms.pltGroup[i]));      
        }
    }

    addFruitOverLap() {
        for(let j = 0; j < this.fruits.fruitGroup.length; j++) {
            this.physics.add.overlap(this.player.player, this.fruits.fruitGroup[j], this.playerVsFruit.bind(this, this.fruits.fruitGroup[j]));    
        }
    }

    addScore(scorePoint) {
        this.score += scorePoint;
        this.scoreText.setText(this.score);
        this.scoreText.x = this.sceneWidth/2 - this.scoreText.width/2;
    }

    playerVsPlatforms(platform) {
        if(this.player.player.body.velocity.y >= 0 && this.player.player.y + this.player.player.height/2 <= platform.y - platform.height/2) {
            this.player.player.body.velocity.y -= Phaser.Math.Between(650, 750);
            this.jumpSE.play();
        }
    }

    playerVsFruit(fruit) {
        this.collectSE.play();
        this.fruits.removeFruit(fruit);
        this.addScore(5);
    }

    playerVsCoconut(coconut) {
        coconut.body.velocity.x = 800;
        coconut.body.velocity.y = 150;
        this.playerHp--;
        this.lifeIcons[this.playerHp].destroy();
        coconut.body.checkCollision.none = true;
        this.player.player.body.velocity.y += 100;

        if(this.playerHp <= 0) {
            this.endSE.play();
            this.endGame(2000);
        }
    }

    playerVsBall(ball) {
        this.ballBumpSE.play();
        ball.body.velocity.x = (this.player.player.x - ball.x) * -10;
    }

    addPlatformCallback(platform) {
        this.physics.add.collider(this.player.player, platform, this.playerVsPlatforms.bind(this, platform));    
        this.children.bringToTop(this.player.player);
        //this.addScore(5);
    }

    addFruitsCallback() {
        this.addFruitOverLap();
    }

    endGame(delayTime) {
        if(this.isEnd == false) {
            this.endSE.play();
            this.isEnd = true;
        }

        var timer = this.time.addEvent({
            delay: delayTime,    // ms
            callback: () => 
            {
                this.scene.stop;
                this.scene.start('End', { score: this.score });
            },
        });
    }

}
 