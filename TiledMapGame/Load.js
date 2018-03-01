var Load ={
	//Write on console that the grame is starting
	preload:function(){
		var loadingLabel=game.add.text(80,150,'loading...',);
		game.load.image('ship', 'assets/images/player_blue.png');
    	game.load.image('background','assets/images/space.png')
    	game.load.image('bullet','assets/images/playikon.png')
    	game.load.image('spacerock','assets/images/explosion.png')
    	

    	//game.load.tilemap('mario', 'assets/images/supermario.json', null, Phaser.Tilemap.TILED_JSON);
    	//game.load.image('tiles', 'assets//images/super_mario.png');

    	game.load.tilemap('level1', 'assets/images/level1.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.image('tiles', 'assets//images/allatiles.png');

        game.load.tilemap('map1', 'assets/images/map1.json', null, Phaser.Tilemap.TILED_JSON);
      

    //game.load.image('background', 'assets/images/space.png');
	},
	create:function () {
		console.log('loaded')
   		game.state.start('Play')
	}
};