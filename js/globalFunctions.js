function placeTurret(pointer) {
    var i = Math.floor(pointer.y/32);
    var j = Math.floor(pointer.x/32);
    if(canPlaceTurret(i, j)) {
		 if(currentselectedTower() == 1 && currentGold >= 50){
	        var Arrow = ArrowTower.get();
			if (Arrow)
			{
				changegold(50);
				//this.currentGold = this.currentGold - 50;
				Arrow.setActive(true);
				Arrow.setVisible(true);
				Arrow.place(i, j);
				map[i][j] = 1;
			} 
		}
		 if(currentselectedTower() == 2 && currentGold >= 150){		
			var Bomb = BombTower.get();
			if (Bomb)
			{
				changegold(150);
				//this.currentGold = this.currentGold - 80;
				Bomb.setActive(true);
				Bomb.setVisible(true);
				Bomb.place(i, j);
				map[i][j] = 2;
			} 
		}
		 if(currentselectedTower() == 3 && currentGold >= 50){
			var Frost = FrostTower.get();
			if (Frost)
			{
				changegold(50);
				//this.currentGold = this.currentGold - 100;
				Frost.setActive(true);
				Frost.setVisible(true);
				Frost.place(i, j);
				map[i][j] = 3;
				console.log(map[i][j]);
			} 
		}
			
		}		
}