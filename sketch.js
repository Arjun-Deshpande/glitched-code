const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var towerImg, backgroundImg, tower;
var cannnon, cannonImg, cannonBaseImg, cannonball, boat;
var balls = [];
var boats = [];
var boatAnimation = [];
var brokenAnimation = [];
var boatSpriteData, boatSpriteSheet, brokenData, brokenSpriteSheet,waterSpriteData,waterSpriteSheet;
var waterAnimation = [];


 

function preload() {
  backgroundImg = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png");
  boatSpriteData = loadJSON("assets/boat/boat.json");
  boatSpriteSheet = loadImage("assets/boat/boat.png");
  brokenData = loadJSON("assets/boat/brokenBoat.json");
  brokenSpriteSheet = loadImage("assets/boat/brokenBoat.png");
  waterSpriteData = loadJSON("assets/waterSplash/waterSplash.json");
  waterSpriteSheet = loadImage("assets/waterSplash/waterSplash.png");
  
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle=15;
  
  //cannonball = new Cannonball(cannon.x, cannon.y);
  
  
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 tower= Bodies.rectangle(160, 350, 160, 310, options)
 World.add(world, tower);
 cannon = new Cannon(180,110,130,100,angle);
 
 var boatFrame = boatSpriteData.frames;
 for(var i = 0; i < boatFrame.length; i++){
  var pos = boatFrame[i].position;
  var img = boatSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
  boatAnimation.push(img);
 }

 var brokenFrame = brokenData.frames;
 for(var i = 0; i < brokenFrame.length; i++){
   var pos = brokenFrame[i].position;
   var img = brokenSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
   brokenAnimation.push(img);
 }

 var waterFramw = waterSpriteData.frames;
 for(var i =0; i < waterFramw.length; i++){
   var pos = waterFramw[i].position;
   var img = waterSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
   waterAnimation.push(img);
 }
}

function draw() {
  //background(backgroundImg);
  image(backgroundImg, 0, 0, 1200, 600);
  Engine.update(engine);
  

  //cannonball.display();
 rect(ground.position.x, ground.position.y,width*2,1);
 showBoats();
 
 
 for(var i = 0; i < balls.length; i++){
   showCannanBalls(balls[i], i);
   collisionWithBoat(i);
 } 
 push();
 imageMode(CENTER); 
 image(towerImg,tower.position.x, tower.position.y, 160, 310);
 pop(); 
 cannon.display();

}

function keyReleased(){
  if(keyCode == DOWN_ARROW){
    balls[balls.length -1].shoot();
  }
}

function keyPressed(){
  if(keyCode == DOWN_ARROW){
    var cannonball = new Cannonball(cannon.x,cannon.y)
    balls.push(cannonball);

  }  
}

function showCannanBalls(ball,index){
  if(ball){
    ball.display();
    if(ball.body.position.x >= width || ball.body.position.y >= height - 50){
      ball.remove(index); 
       }
  }
  
}

function showBoats(){
  if(boats.length > 0){
    if(
      boats[boats.length -1].body.position.x < width -300 || 
      boats[boats.length-1] == undefined
    ){
      var positions = [-40,-60,-70,-20];
      var position = random(positions);
      var boat = new Boat(width,height-100,170,170,position,boatAnimation);
    boats.push(boat)
    }
    for(var i=0; i<boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body, {x:-0.9, y:0});
        boats[i].display();
        boats[i].animate();
            }
    }
  } else{
    var boat = new Boat(width,height-60,170,170,-60,boatAnimation);
    boats.push(boat)
  }


}

function collisionWithBoat(index){
  for(var i =0; i < boats.length; i++){
    //index refering to the index of the ball and i index of the boat
    if(boats[i]!== undefined && balls[index] !== undefined){
   var collision = Matter.SAT.collides(balls[index].body, boats[i].body); 
   if(collision.collided){
     //balls[i].remove(i);
     boats[i].remove(i);
     Matter.World.remove(world, balls[index].body)
     delete balls[index];
   }  
    }
  }
}
