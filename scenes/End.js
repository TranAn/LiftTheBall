class End extends Phaser.Scene {

    constructor() {
        super({ key: 'End', active: false});

        this.score;
        this.highScore;

        this.bgMusic;
        this.buttonWav;
    }

    init(data) {
        this.score = data.score;
        this.saveHighScore();
    }

    saveHighScore() {
        this.highScore = localStorage.getItem('jumper-highscore');
        if(this.highScore == null) {
            this.highScore = this.score;
            localStorage.setItem('jumper-highscore', this.score);
        }
        else {
            if(this.highScore < this.score) {
                this.highScore = this.score;
                localStorage.setItem('jumper-highscore', this.score);
            }
        }
    }

    preload() {
        
    }

    create() {
        let { width, height } = this.sys.game.canvas;

        this.createBg();
        this.addSE();

        let title = this.add.sprite(width / 2, 120, 'endTitle').setOrigin(0.5).setScale(0.75);

        this.highScrText = this.add.text(width/2, height/2 - 40, "Điểm cao nhất - 0", { fontFamily: "Ballon", fontSize: 32, color: "#39d179" }).setOrigin(0.5);
        this.highScrText.setStroke('#ffffff', 5);
        this.highScrText.setText("Điểm cao nhất - " + this.highScore);

        this.yourScrText = this.add.text(width/2, height/2 + 40, "Điểm của bạn - 0", { fontFamily: "Ballon", fontSize: 32, color: "#39d179" }).setOrigin(0.5);
        this.yourScrText.setStroke('#ffffff', 5);
        this.yourScrText.setText("Điểm của bạn - " + this.score);

        let restartBtn  = this.add.sprite(50, height - 50, 'restartBtn').setOrigin(0.5).setInteractive().setScale(0.6);
        restartBtn.on('pointerdown', function(pointer) {
            this.scene.start('Game');
            this.bgMusic.stop();
            this.scene.stop();
        }, this);

        let homeBtn  = this.add.sprite(width - 50, height - 50, 'moreBtn').setOrigin(0.5).setInteractive().setScale(0.6);
        homeBtn.on('pointerdown', function(pointer) {
            this.scene.start('Home');
            this.bgMusic.stop();
            this.scene.stop();
        }, this);
    }

    createBg() {
        document.body.style.backgroundImage = 'url(/assets/End/bg.png)';
    }

    addSE() {
        this.bgMusic = this.sound.add('bgMusic');
        this.bgMusic.setLoop(true);
        this.bgMusic.play();
        this.bgMusic.setVolume(0.5);

        this.buttonWav = this.sound.add('buttonWav');
    }
    
}