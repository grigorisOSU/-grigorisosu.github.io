var config= {
    
    width: 800,
    height: 600, 
    backgroundColor: 0x000000,
    scene: [StartScreen, DifficultyScreen, newOrLoadScreen, LoadScreen, EasyGame, MediumGame, HardGame],
    physics: {
        default: 'arcade'
    }
}

var game=new Phaser.Game(config); 
