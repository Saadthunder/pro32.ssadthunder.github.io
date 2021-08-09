const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope;
var rope2;


var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;
var bubble;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubbleImg=loadImage(',pqd.png')


  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  
  createCanvas(500,700);
 
  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(20,350);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(190,290);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
  
  
  rope = new Rope(4,{x:40,y:350});
  rope2 = new Rope(4,{x:200,y:290});
 

  ground = new Ground(200,680,600,20);
  blink.frameDelay = 10;
  eat.frameDelay = 10;





  ground2=new Ground(250,150,200,10);


  bunny = createSprite(200,80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  bubble = createSprite(310,420,100,100);
  bubble.addImage(bubbleImg);
  bubble.scale=.2
 
  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

 
 

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,500,700);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  ground2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)===true)
  {
    bunny.changeAnimation('eating');
    
   
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    
   
    fruit=null;
    
     
   } 
   
   
   if(collide(fruit,bubble,80) == true) 
  { engine.world.gravity.y = -2;
    bubble.position.x = fruit.position.x;
    bubble.position.y = fruit.position.y;
    bubble.addImage(food);
    bubble.scale=.08;
     } 
   
}

function drop()
{
 
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}



function collide(body,sprite,distance)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=distance)
            {
              World.remove(engine.world,fruit);
               
               return true; 
            }
            else{
              return false;
            }
         }
}



