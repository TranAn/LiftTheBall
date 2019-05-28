class Loading extends Phaser.Scene {

    constructor() {
        super({ key: 'Loading', active: true});
    }

    preload() {
        let { width, height } = this.sys.game.canvas;

        //Add loading bg
        this.createBg();

        //Load Home scene assets
        // this.load.image('background', 'assets/Home/title_bg.png');
        this.load.image('title', 'assets/Home/menu-title.png');
        this.load.image('playBtn', 'assets/Home/play.png');
        this.load.image('soundOnBtn', 'assets/Home/soundOn.png');
        this.load.image('soundOffBtn', 'assets/Home/soundOff.png');
        this.load.image('questionBtn', 'assets/Home/howToPlay.png');
        this.load.image('infoBtn', 'assets/Home/credit.png');
        this.load.image('avatar', 'assets/Home/avatar.png');

        //Load Game scene assets
        // this.load.image('bg', 'assets/Game/bg.png');
        // this.load.image('cactus', 'assets/Game/cactus.png');
        // this.load.spritesheet('monkey', 'assets/Game/monkey.png', { frameWidth: 62, frameHeight: 68} );
        // this.load.image('player_pose0', 'assets/Game/player_pose0.png');
        this.load.image('player_pose1', 'assets/Game/player_pose1.png');
        this.load.image('player_pose2', 'assets/Game/player_pose2.png');
        this.load.image('platform', 'assets/Game/platform.png');
        // this.load.image('life', 'assets/Game/life.png');
        this.load.image('pause', 'assets/Game/pause.png');
        this.load.image('item1', 'assets/Game/item1.png');
        this.load.image('item2', 'assets/Game/item2.png');
        this.load.image('item3', 'assets/Game/item3.png');
        this.load.image('item4', 'assets/Game/item4.png');
        this.load.image('item5', 'assets/Game/item5.png');
        // this.load.image('coconut', 'assets/Game/coconut.png');
        this.load.image('ball1', 'assets/Game/ball1.png');
        this.load.image('ball2', 'assets/Game/ball2.png');
        this.load.image('ball3', 'assets/Game/ball3.png');
        this.load.image('mbinput', 'assets/Game/mobile_input.png');

        //Load Introduction scene assets
        this.load.image('backBtn', 'assets/Introduction/backward.png');

        //Load End scene assets
        this.load.image('endTitle', 'assets/End/end_title.png');
        this.load.image('moreBtn', 'assets/End/b_More.png');
        this.load.image('restartBtn', 'assets/End/restart.png');

        //Load sound assets
        this.load.audio('bgMusic', 'assets/SE/bg_music.mp3');
        this.load.audio('buttonWav', 'assets/SE/button.mp3');
        this.load.audio('collect', 'assets/SE/collect.mp3');
        this.load.audio('gameOver', 'assets/SE/game_over.mp3');
        this.load.audio('jump', 'assets/SE/jump.mp3');
        this.load.audio('ballbump', 'assets/SE/ball_bump.mp3');

        //Create preload text
        let loadingText = this.add.text(width/2, height/2, "Loading - 0%", { fontFamily: "Ballon", fontSize: 35, color: "#f34733" });
        // loadingText.setStroke('#3ac4d1', 5);
        loadingText.setStroke('#ffffff', 5);
        loadingText.setScrollFactor(0);
        loadingText.y = height/2 - loadingText.height/2;

        //Register load event
        this.load.on('progress', function (value) {
            //console.log(value);
            loadingText.setText('Loading - ' + Math.floor( value * 100 )+ '%');
            loadingText.x = width/2 - loadingText.width/2;
        });
                    
        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
        });
         
        this.load.on('complete', function () {
            //console.log('load complete');
            this.scene.stop();
            this.scene.start('Home');
        }, this);

        //Support 2 touch event
        this.input.addPointer(1);
    }

    createBg() {
        document.body.style.backgroundImage = 'url(/assets/Home/title_bg.png)';
    }
    
}