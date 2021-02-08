class EasyGame extends Phaser.Scene{
    constructor(){
        super("easyGame"); 
    }

    monster1; 
    path;
    turrets;
    ArrowTower;
    BombTower;
    FrostTower;
    selectedTower = 2;
    BULLET_DAMAGE = 50;

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
                this.load.image('ArrowclickDown', 'assets/Arrowclick.png');
                this.load.image('monster1', 'assets/monster1_atlas.png');
            }

    Turret = new Phaser.Class({

                Extends: Phaser.GameObjects.Image,
        
                initialize:
        
                function Turret (scene)
                {
                    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
                    this.nextTic = 0;
                },
                place: function(i, j) {            
                    this.y = i * 64 + 64/2;
                    this.x = j * 64 + 64/2;
                    map[i][j] = 1;            
                },
                fire: function() {
                    var enemy = getEnemy(this.x, this.y, 200);
                    if(enemy) {
                        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
                        addBullet(this.x, this.y, angle);
                        this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
                    }
                },
                update: function (time, delta)
                {
                    if(time > this.nextTic) {
                        this.fire();
                        this.nextTic = time + 1000;
                    }
                }
        });

        Arrow = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize:
            function Arrow (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'ArrowTower');
                this.nextTic = 0;
            },
            place: function(i, j) {            
                this.y = i * 64 + 64/2;
                this.x = j * 64 + 64/2;
                map[i][j] = 1;            
            },
            //fire: function() {
            //    var enemy = getEnemy(this.x, this.y, 200);
            //    if(enemy) {
            //        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            //        addBullet(this.x, this.y, angle);
            //        this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            //}
            //},
            update: function (time, delta)
            {
                if(time > this.nextTic) {
    //				this.fire();
                    this.nextTic = time + 1000;
                }
            }
    });
    
    Bomb = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize:
            function Bomb (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'BombTower');
                this.nextTic = 0;
            },
            place: function(i, j) {            
                this.y = i * 64 + 64/2;
                this.x = j * 64 + 64/2;
                map[i][j] = 1;            
            },
            //fire: function() {
            //    var enemy = getEnemy(this.x, this.y, 200);
            //    if(enemy) {
            //        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            //        addBullet(this.x, this.y, angle);
            //        this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            //}
           // },
            update: function (time, delta)
            {
                if(time > this.nextTic) {
    //				this.fire();
                    this.nextTic = time + 1000;
                }
            }
    });
    
    Frost = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize:
            function Frost (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'FrostTower');
                this.nextTic = 0;
            },
            place: function(i, j) {            
                this.y = i * 64 + 64/2;
                this.x = j * 64 + 64/2;
                map[i][j] = 1;            
            },
            //fire: function() {
            //    var enemy = getEnemy(this.x, this.y, 200);
            //    if(enemy) {
            //        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            //        addBullet(this.x, this.y, angle);
            //        this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
            //}
            //},
            update: function (time, delta)
            {
                if(time > this.nextTic) {
    //				this.fire();
                    this.nextTic = time + 1000;
                }
            }
    });
        
    Bullet = new Phaser.Class({
    
            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    
                this.incX = 0;
                this.incY = 0;
                this.lifespan = 0;
    
                this.speed = Phaser.Math.GetSpeed(600, 1);
            },
    
            fire: function (x, y, angle)
            {
                this.setActive(true);
                this.setVisible(true);
                //  Bullets fire from the middle of the screen to the given x/y
                this.setPosition(x, y);
                
            //  we don't need to rotate the bullets as they are round
            //    this.setRotation(angle);
    
                this.dx = Math.cos(angle);
                this.dy = Math.sin(angle);
    
                this.lifespan = 1000;
            },
    
            update: function (time, delta)
            {
                this.lifespan -= delta;
    
                this.x += this.dx * (this.speed * delta);
                this.y += this.dy * (this.speed * delta);
    
                if (this.lifespan <= 0)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
    
        });

        create() {
            var graphics = this.add.graphics();    
            this.drawLines(graphics);
            this.path = this.add.path(96, -32);
            this.path.lineTo(96, 164);
            this.path.lineTo(480, 164);
            this.path.lineTo(480, 544);
            
            graphics.lineStyle(2, 0xffffff, 1);
            this.path.draw(graphics);
            
            for (var i = 0; i < 100; i++)
            {
                this.follower = this.add.follower(this.path, 0, 0, 'monster1');
        
                this.follower.startFollow({
                    duration: 3500,
                    positionOnPath: true,
                    repeat: 0,
                    ease: 'Linear',
                    delay: i * 70
                });
            }
            
            this.ArrowTower = this.add.group({ classType: this.Arrow, runChildUpdate: true });
            this.BombTower = this.add.group({ classType: this.Bomb, runChildUpdate: true });
            this.FrostTower = this.add.group({ classType: this.Frost, runChildUpdate: true });
        
            
            this.bullets = this.physics.add.group({ classType: this.Bullet, runChildUpdate: true });
        
            this.nextEnemy = 0;
            
            this.physics.add.overlap(this.enemies, this.bullets, this.damageEnemy);
            
            this.input.on('pointerdown', this.placeTurret);
            
                //createButton(2, 'arrow', 36, 26);
                this.add.image(594, 15, 'sprites', 'Arrowclick').setOrigin(0)
                .setInteractive()
                .setData('id', 1)
                .setData('name', 'arrow')
                .setData('active', false)
                .on('pointerover', function () {
        
                    if (!this.getData('active'))
                    {
                        this.setFrame('Arrowclick');
                    }
        
                })
                .on('pointerout', function () {
        
                    if (this.getData('active'))
                    {
                        this.setFrame('Arrowclick');
                    }
                    else
                    {
                        this.setFrame('ArrowclickDown');
                    }
        
                })
                .on('pointerup', function () {
        
                    if (this.selectedTower!= 1)
                    {
                        this.selectedTower = 1
                    }
                }, this);
                
                   //createButton(2, 'bomb', 157, 26);
                this.add.image(594, 75, 'sprites', 'Bombclick').setOrigin(0)
                .setInteractive()
                .setData('id', 2)
                .setData('name', 'bomb')
                .setData('active', false)
                .on('pointerover', function () {
        
                    if (!this.getData('active'))
                    {
                        this.setFrame('Bombclick');
                    }
        
                })
                .on('pointerout', function () {
        
                    if (this.getData('active'))
                    {
                        this.setFrame('Bombclick');
                    }
                    else
                    {
                        this.setFrame('BombclickDown');
                    }
        
                })
                .on('pointerup', function () {
        
                    if (this.selectedTower!= 2)
                    {
                        this.selectedTower = 2
                    }
                }, this);
        
         
            //createButton(3, 'frost', 278, 26);
                this.add.image(594, 140, 'sprites', 'Frostclick').setOrigin(0)
                .setInteractive()
                .setData('id', 3)
                .setData('name', 'frost')
                .setData('active', false)
                .on('pointerover', function () {
        
                    if (!this.getData('active'))
                    {
                        this.setFrame('Frostclick');
                    }
                })
                .on('pointerout', function () {
        
                    if (this.getData('active'))
                    {
                        this.setFrame('Frostclick');
                    }
                    else
                    {
                        this.setFrame('FrostclickDown');
                    }
        
                })
                .on('pointerup', function () {
        
                    if (this.selectedTower!= 3)
                    {
                        this.selectedTower = 3
                    }
                }, this);
            
            
            
        }


        damageEnemy(enemy, bullet) {  
            // only if both enemy and bullet are alive
            if (enemy.active === true && bullet.active === true) {
                // we remove the bullet right away
                bullet.setActive(false);
                bullet.setVisible(false);    
                
                // decrease the enemy hp with BULLET_DAMAGE
                enemy.receiveDamage(BULLET_DAMAGE);
            }
        }
        
        drawLines(graphics) {
            graphics.lineStyle(1, 0x0000ff, 0.8);
            for(var i = 0; i < 8; i++) {
                graphics.moveTo(0, i * 64);
                graphics.lineTo(640, i * 64);
            }
            for(var j = 0; j < 10; j++) {
                graphics.moveTo(j * 64, 0);
                graphics.lineTo(j * 64, 512);
            }
            graphics.strokePath();
        }
        
        update(time, delta) {  
        
        
        }
        
        canPlaceTurret(i, j) {
            return map[i][j] === 0;
        }
        
        currentselectedTower(){return selectedTower;}
        
        placeTurret(pointer) {
            var i = Math.floor(pointer.y/64);
            var j = Math.floor(pointer.x/64);
            if(1/*canPlaceTurret(i, j)*/) {
                if(this.selectedTower == 0){
                    
                }
                 if(this.selectedTower == 1){
                    var Arrow = ArrowTower.get();
                    if (Arrow)
                    {
                        Arrow.setActive(true);
                        Arrow.setVisible(true);
                        Arrow.place(i, j);
                    } 
                }
                 if(1/*this.selectedTower == 2*/){		
                    var Bomb = BombTower.get();
                    if (Bomb)
                    {
                        Bomb.setActive(true);
                        Bomb.setVisible(true);
                        Bomb.place(i, j);
                    } 
                }
                 if(this.selectedTower == 3){
                    var Frost = FrostTower.get();
                    if (Frost)
                    {
                        Frost.setActive(true);
                        Frost.setVisible(true);
                        Frost.place(i, j);
                    } 
                }
                    
                }		
        }
        
        addBullet(x, y, angle) {
            var bullet = bullets.get();
            if (bullet)
            {
                bullet.fire(x, y, angle);
            }
        }
        

}


