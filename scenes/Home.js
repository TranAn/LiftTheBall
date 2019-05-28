class Home extends Phaser.Scene {

    constructor() {
        super({ key: 'Home', active: false });

        this.sceneWidth;
        this.sceneHeigh;

        this.bgMusic;
        this.buttonWav;

        this.playBtn;
        this.soundSetting = true;
    }

    preload() {
        
    }

    create() {
        let { width, height } = this.sys.game.canvas;
        this.sceneWidth = width;
        this.sceneHeigh = height;

        this.createBg();
        this.addSE();

        let title = this.add.sprite(width / 2, 120, 'title').setOrigin(0.5).setScale(0.75);
        this.playBtn = this.add.sprite(width / 2, height / 2 - 50, 'playBtn').setOrigin(0.5).setInteractive().setScale(1.2);
        let avatar = this.add.image(width / 2 + 20, height / 2 + 120, 'avatar').setOrigin(0.5);

        let soundBtn = this.add.sprite(width / 2 - 120, height - 100, 'soundOnBtn').setOrigin(0.5).setInteractive().setScale(1.1);
        if(this.soundSetting) {
            soundBtn.setTexture('soundOnBtn');
        }
        else {
            soundBtn.setTexture('soundOffBtn');
        }

        let creditBtn = this.add.sprite(width / 2, height - 100, 'questionBtn').setOrigin(0.5).setInteractive().setScale(1.1);

        let infoBtn = this.add.sprite(width / 2 + 120, height - 100, 'infoBtn').setOrigin(0.5).setInteractive().setScale(1.1);

        this.playBtn.on('pointerdown', function (pointer) {
            this.buttonWav.play();

            this.scene.start('Game');
            this.scene.stop();
            this.bgMusic.destroy();
        }, this);

        soundBtn.on('pointerdown', function (pointer) {
            if(this.soundSetting) {
                this.sound.setMute(true);
                soundBtn.setTexture('soundOffBtn');
                this.soundSetting = false;
            }
            else {
                this.buttonWav.play();
                this.sound.setMute(false);
                soundBtn.setTexture('soundOnBtn');
                this.soundSetting = true;
            }
        }, this);

        creditBtn.on('pointerdown', function (pointer) {
            this.buttonWav.play();

            this.scene.start('Credit');
            this.scene.stop();
            this.bgMusic.destroy();
        }, this);

        infoBtn.on('pointerdown', function (pointer) {
            this.buttonWav.play();

            this.scene.start('Instruction');
            this.scene.stop();
            this.bgMusic.destroy();
        }, this);

        this.makeTween();
    }

    createBg() {
        document.body.style.backgroundImage = 'url(/assets/Home/title_bg.png)';
    }

    addSE() {
        this.bgMusic = this.sound.add('bgMusic');
        this.bgMusic.setLoop(true);
        this.bgMusic.play();
        this.bgMusic.setVolume(0.5);

        this.buttonWav = this.sound.add('buttonWav');
    }

    makeTween() {
        this.tweens.add({
            targets: this.playBtn,
            y: this.playBtn.y + 15,
            yoyo: true,
            duration: 1200,
            repeat: -1
        });
    }

}
 
    