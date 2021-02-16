class EasyMonster extends Phaser.GameObjects.PathFollower
{
    constructor(config)
    {
        super(config.scene, config.path, config.x, config.y, "easyMonster"); 
        config.scene.add.existing(this); 
        this.setScale(1.5); 

        this.setPath(config.path); 
        this.startFollow(
            {
                ease: 'Linear',
                positionOnPath: true,
                duration: 15000,
                delay: 50
            }
        ); 
    }
}