class EasyGame extends Phaser.Scene{
    constructor(){
        super("EasyGame"); 
    }

    monster1; 
    path;
    turrets;
    ArrowTower;
    BombTower;
    FrostTower;
    selectedTower = 2;
    BULLET_DAMAGE = 50;
    Bomb;
    Arrow;
    Frost;
    nextMonster; 
    timer; 

    eMonster;
    mMonster;
    hMonster;
    bMonster; 

    currentWave; 
    currentWaveImage; 


    saveButton;
    quitButton; 
    cancelButton; 

    map =[[ 0,-1, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1, 0, 0, 0, 0, 0, 0, 0],
            [ 0,-1,-1,-1,-1,-1,-1,-1, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
			[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];

    preload() {    

                this.load.atlas('sprites', 'assets/spritesheet1.png', 'assets/spritesheet1.json');
                this.load.image('bullet', 'assets/bullet.png');
                

                this.load.image('grassTiles', 'assets/ArtWork/Maps/grass.png');
                this.load.image('castleTiles', 'assets/ArtWork/Maps/castle.png');
                this.load.image('grassDirtTiles', 'assets/ArtWork/Maps/grassdirt.png');
                this.load.tilemapTiledJSON('easyMap', 'assets/ArtWork/Maps/easyMap.json'); 

                this.load.image('menuBurger', 'assets/menuBurger.png');
                this.load.image('nextWave', 'assets/nextWave.png');
                this.load.image('saveButton', 'assets/saveButton.png');
                this.load.image('quitButton', 'assets/quitButton.png');
                this.load.image('cancelButton', 'assets/cancelButton.png');

                this.load.image("easyMonster", "assets/monster1_atlas.png");
                this.load.image("mediumMonster", "assets/monster2_atlas.png");

                this.load.image('wave', 'assets/wave.png');
                this.load.image('one', 'assets/ArtWork/Numbers/1.png');
                this.load.image('two', 'assets/ArtWork/Numbers/2.png');
                this.load.image('three', 'assets/ArtWork/Numbers/3.png');
                this.load.image('four', 'assets/ArtWork/Numbers/4.png');
                this.load.image('five', 'assets/ArtWork/Numbers/5.png');
                this.load.image('six', 'assets/ArtWork/Numbers/6.png');
                this.load.image('seven', 'assets/ArtWork/Numbers/7.png');
                this.load.image('eight', 'assets/ArtWork/Numbers/8.png');
                this.load.image('nine', 'assets/ArtWork/Numbers/9.png');
                this.load.image('ten', 'assets/ArtWork/Numbers/10.png');
                this.load.image('zero', 'assets/ArtWork/Numbers/0.png');
                
            }

    create(){

        const easyMap = this.make.tilemap({key: 'easyMap'}); 
        const grassTileset = easyMap.addTilesetImage('grass', 'grassTiles', 32,32,0,0);
        const castleTileset = easyMap.addTilesetImage('castle', 'castleTiles', 32,32,0,0);
        const grassdirtTileset = easyMap.addTilesetImage('grassdirt', 'grassDirtTiles', 32,32,0,0);

        const layer1 = easyMap.createLayer('ground', grassTileset,0,0); 
        const layer3 = easyMap.createLayer('monsterpath', grassdirtTileset,0,0); 
        const layer4 = easyMap.createLayer('ground2', castleTileset,0,0);  

        
        var graphics = this.add.graphics();    
        this.drawLines(graphics);


        this.path = this.add.path(10, 335);
        this.path.lineTo(175, 335);
        this.path.lineTo(175, 175);
        this.path.lineTo(275, 175);
        this.path.lineTo(275, 462);
        this.path.lineTo(365, 462);
        this.path.lineTo(365, 275);
        this.path.lineTo(525, 275);
        this.path.lineTo(525, 430);
        this.path.lineTo(685, 430);
        this.path.lineTo(685, 340);

        const layer2 = easyMap.createLayer('castle', castleTileset,0,0); 

        
        graphics.lineStyle(2, 0xffffff, 1);

        this.path.draw(graphics);

        this.add.image(370, 30, 'wave').setScale(.7);
        this.currentWaveImage = this.add.image(470, 30, 'zero').setScale(1.4);


        this.add.image(770, 30, 'menuBurger').setScale(.5)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.openMenu());

        this.nextMonster = 0; 
        this.currentWave = 0; 

        this.add.image(400, 570, 'nextWave').setScale(.7)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.startNextWave());

    }

    startNextWave()
    {
        this.currentWave += 1; 
        this.currentWaveImage.destroy();
        this.currentWaveImage = null; 

        if (this.currentWave == 1)
        {
            this.currentWaveImage = this.add.image(470, 30, 'one').setScale(1.4);
        }
        else if (this.currentWave == 2)
        {
            this.currentWaveImage = this.add.image(470, 30, 'two').setScale(1.4);
        }
        else if (this.currentWave == 3)
        {
            this.currentWaveImage = this.add.image(470, 30, 'three').setScale(1.4);
        }
        else if (this.currentWave == 4)
        {
            this.currentWaveImage = this.add.image(470, 30, 'four').setScale(1.4);
        }
        else if (this.currentWave == 5)
        {
            this.currentWaveImage = this.add.image(470, 30, 'five').setScale(1.4);
        }
        else if (this.currentWave == 6)
        {
            this.currentWaveImage = this.add.image(470, 30, 'six').setScale(1.4);
        }
        else if (this.currentWave == 7)
        {
            this.currentWaveImage = this.add.image(470, 30, 'seven').setScale(1.4);
        }
        else if (this.currentWave == 8)
        {
            this.currentWaveImage = this.add.image(470, 30, 'eight').setScale(1.4);
        }
        else if (this.currentWave == 9)
        {
            this.currentWaveImage = this.add.image(470, 30, 'nine').setScale(1.4);
        }
        else if (this.currentWave == 10)
        {
            this.currentWaveImage = this.add.image(485, 30, 'ten').setScale(0.7);
        }
        else
        {
            this.currentWaveImage = null; 
        }

        this.eMonster = 3;
        this.mMonster = 1; 
        this.hMonster = 0;
        this.bMonster = 0; 

        this.startTime();
    }

    startTime()
    {
        var totalMonsters = this.eMonster + this.mMonster + this.hMonster + this.bMonster; 

        this.timer = this.time.addEvent({ delay: 1000, callback: this.spawnMonster, callbackScope: this, repeat: totalMonsters });
        
    }

    spawnMonster()
    {
        if(this.eMonster > 0)
        {
            let easyMonster = new EasyMonster({scene:this, path: this.path, x:10, y:335});
            this.eMonster -= 1; 
        }
        else if(this.mMonster > 0)
        {
            let mediumMonster = new MediumMonster({scene:this, path: this.path, x:10, y:335});
            this.mMonster -= 1;
        }
    }

    update(time, delta){
        
        /*if(time > this.nextMonster)
        {
            this.nextWave(this.path); 
        }*/

 
    }


    openMenu()
    {

        this.cancelButton = this.add.image(400, 370, 'cancelButton').setScale(10.0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.cancelMenu());

        this.saveButton = this.add.image(400, 250, 'saveButton').setScale(1.0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.quitGame());

        this.quitButton = this.add.image(400, 370, 'quitButton').setScale(1.0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', ()=> this.quitGame());
    }

    quitGame()
    {
        this.scene.start("bootGame");
    }

    cancelMenu()
    {
        this.cancelButton.destroy(); 
        this.saveButton.destroy(); 
        this.quitButton.destroy(); 

        this.cancelButton = null; 
        this.saveButton = null; 
        this.quitButton = null; 
    }

    drawLines(graphics) {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for(var i = 0; i < 20; i++) {
            graphics.moveTo(0, i * 32);
            graphics.lineTo(800, i * 32);
        }
        for(var j = 0; j < 26; j++) {
            graphics.moveTo(j * 32, 0);
            graphics.lineTo(j * 32, 600);
        }
        graphics.strokePath();
    }
        

}


