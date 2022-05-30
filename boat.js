class Boat{
    constructor(x,y,w,h,bpos,boatAnimation){
        this.w = w;
        this.h = h;
        this.bpos = bpos;
        this.speed = 0.05;
        this.boatAnimation = boatAnimation;
        this.image = loadImage("assets/boat.png")
        var options = {
            restitution: 0.8,
            friction: 1.0,
            density:1.0
        }
        this.body = Matter.Bodies.rectangle(x,y,w,h,options);
        
        World.add(world, this.body); 
    }

    display(){
        var index = floor(this.speed % this.boatAnimation.length);
        push()
        imageMode(CENTER);
        translate(this.body.position.x, this.body.position.y);  
        rotate(this.body.angle);
        image(this.boatAnimation[index],0,this.bpos,this.w,this.h); 
        pop()  
       
    }

    remove(index){
        this.boatAnimation = brokenAnimation
        this.speed = 0.05;
        this.w = 300;
        this.h = 300;
        
        setTimeout(()=>{
            Matter.World.remove(world, boats[index].body)
            delete boats[index];
        },2000);
    }

    animate(){
        this.speed += 0.05;
    }
}