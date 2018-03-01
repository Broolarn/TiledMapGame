var bulletTime = 0;
var maxrocks=10;
var minsvelocity=50;
var maxvelocity=200;
var nrofrocks=4;
var xpos;
var ypos;
var side;
var randvec;
var i;
var randomVelocity;
var randomAngle
var spacerock;

var Play={

create:function () {   
   
console.log('played')
    var score=game.time;
    //  background
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('map1'); // mapen laddas in    
    map.addTilesetImage('tiles'); // använd namn från json fil
    layer = map.createLayer('BackgroundLayer'); // komihåg att ha alla tiles i samma lager för enkel kollison genom valda block
    layer.setScale(2,2) //setScale inte scale.set (sista funnkar inte) 
    map.setCollision(260);
    layer.resizeWorld(); // bra o göra   

    // player
    player = game.add.sprite(56, 48, 'ship');
    player.scale.setTo(0.2,0.2);
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    
   
    // bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
     //  40 max at once
    bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
   
    
},
update:function() {
    
    
    game.physics.arcade.collide(player, layer);
    

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(player.rotation, 200, player.body.acceleration);
    }
    else
    {
        player.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        player.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.angularVelocity = 300;
    }
    else
    {
        player.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }
    // boundery thingy
    screenWrap(player);

},

}
function fireBullet()  {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);
        
        if (bullet)
        {
            bullet.reset(player.body.x + 16, player.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = player.rotation;
            bullet.scale.setTo(0.4,0.4);
            game.physics.arcade.velocityFromRotation(player.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 200; // +200 kan vara vilket tal som helst högre => längrre tid emellan kulor
            bullet.body.collideWorldBounds=true;
            bullet.body.onWorldBounds = new Phaser.Signal();
            bullet.body.onWorldBounds.add(resetSprite, this);
        }
        
        
    }
}


function screenWrap (sprite) {

    if (sprite.x < 0)
    {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width)
    {
        sprite.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height)
    {
        sprite.y = 0;
    }

}

function resetSprite (sprite) {

    sprite.reset();
}
 
;
  