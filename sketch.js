var trex, trexRunning, trexCollided, groundImage, ground, inviGround, gameOverImage, gameOver, restartImage, restart, cloud, cloudImage, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6, obstaclesGroup,cloudsGroup,score, inviGround ;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  trexRunning =loadAnimation("trex1.png","trex3.png","trex4.png")
  trexCollided = loadImage("trex_collided.png")
  groundImage = loadImage("ground2.png")
  restartImage = loadImage("restart.png")
  gameOverImage = loadImage("gameOver.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,10,10)
  trex.addAnimation("run",trexRunning)
  trex.addImage("collide",trexCollided)
  trex.scale = 0.5
  ground = createSprite(300,185)
  ground.addImage("ground",groundImage)
  ground.x = ground.width/2
  ground.velocityX = -2
  obstaclesGroup = new Group()
  cloudsGroup = new Group()
  score = 0
  gameOver = createSprite(300,100,20,20)
  restart = createSprite(300,130,20,20)
  inviGround = createSprite(300,190,600,5)
  gameOver.addImage("gameOver",gameOverImage)
  restart.addImage("restart",restartImage)
  gameOver.scale =0.5
  restart.scale = 0.6
  
  inviGround.visible = false
  gameOver.visible = false
  restart.visible = false
}

function draw() {
 background(195);
  
  text("Score: "+ score, 550, 50);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -((score*3/100)+ 6);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(score > 0 && score % 100 === 0 ){

  }
    
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 164){
      trex.velocityY = -12 ;
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      
    }
  }
  //ADD SOUND
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    
    //change the trex animation
    trex.changeImage("collide",trexCollided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    gameOver.visible = true;
    restart.visible = true;
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(inviGround);
  
  if(mousePressedOver(restart)){
    reset();
  }
  drawSprites();
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(score*3/100+6);
    
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //obstacle.setAnimation("obstacle" + rand);
    
    switch(rand){
      case 1 : obstacle.addImage("O1", obstacle1);break;
      case 2 : obstacle.addImage("O2", obstacle2);break;
      case 3 : obstacle.addImage("O3", obstacle3);break;
      case 4 : obstacle.addImage("O4", obstacle4);break;
      case 5 : obstacle.addImage("O5", obstacle5);break;
      case 6 : obstacle.addImage("O6", obstacle6);break;
      default : break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
    
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("run",trexRunning);
  score = 0;
}