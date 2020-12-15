var monkey, monkey_running,monkey_collided;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var score = 0;
var survialTime = 10;

//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload() {


  //Monkey
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");

}


//Setup
function setup() {
  //Canvas
  createCanvas(600, 600);

  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();

  //Monkey
  monkey = createSprite(100, 280, 20, 0);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.2

  //Ground
  ground = createSprite(400, 490, 2000, 20);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  

}

function draw() {

  //Background
  background("white");

  

  
  //displaying score
  stroke("black");
  fill("black");
  textSize(20);
  text("Score:" + score, 500, 30);

  //Monkey
  monkey.collide(ground);
  //PLAY
  if (gameState === PLAY) {
    monkey.changeAnimation("running", monkey_running);

    survialTime = Math.ceil(frameCount / frameRate());
    //displaying survialtime
    stroke("black");
    fill("black");
    textSize(20);
    text("Survial Time:" + survialTime, 80, 30);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -10;
  }

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 1;
    }

    //Gravity
    monkey.velocityY = monkey.velocityY+2;

    //groups lifetime
    obstacleGroup.setLifetimeEach(-1);

    //Adding Functions
    food();
    obstacles();

    if (obstacleGroup.isTouching(monkey)) {

      gameState = END;

    }
  }
  //END
  if (gameState === END) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    survialTime.visible = false;


 
    fill("red");
    textSize(100);
    text("Game Over", 50, 200);
   
  }





  //draw Sprites
  drawSprites();
}

//Banana
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 350, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(200, 280));
    banana.scale = 0.2;
    banana.velocityX = -3;
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 450, 300, 10);
    
    var rand = Math.round(random(200, 500));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -2;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }

}