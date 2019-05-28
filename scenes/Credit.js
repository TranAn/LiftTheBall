class Credit extends Phaser.Scene {

    constructor() {
        super({ key: 'Credit', active: false});

        this.bgMusic;
        this.buttonWav;
    }

    preload() {
        
    }

    create() {
        let { width, height } = this.sys.game.canvas;

        this.createBg();
        this.addSE();

        let backBtn  = this.add.sprite(55, 55, 'backBtn').setOrigin(0.5).setInteractive().setScale(0.6);
        backBtn.on('pointerdown', function(pointer) {
            this.buttonWav.play();
            this.scene.start('Home');
            this.scene.stop();
            this.bgMusic.stop();
        }, this);
    }

    addSE() {
        this.bgMusic = this.sound.add('bgMusic');
        this.bgMusic.setLoop(true);
        this.bgMusic.play();
        this.bgMusic.setVolume(0.5);

        this.buttonWav = this.sound.add('buttonWav');
    }

    createBg() {
        document.body.style.backgroundImage = 'url(/assets/Credit/bg.png)';
    }
    
}