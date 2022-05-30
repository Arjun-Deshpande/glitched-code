class Cannonball{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.r = 30;
        this.speed = 0.05;
        this. trajectory = [];
        this.body = Matter.Bodies.circle(x,y,this.r,{isStatic: true});
        this.image = loadImage("assets/cannonball.png");  
        this.animation = [this.image]
        World.add(world, this.body);
    }

    display(){
        var index = floor(this.speed % this.animation.length);
        push()
        translate(this.body.position.x, this.body.position.y)
        rotate(this.body.angle);
        imageMode(CENTER);
        image(this.animation[index],0,0,this.r, this.r); 
        pop()
        if(this.body.velocity.x > 0 && this.body.position.x > 300){
            var pos = [this.body.position.x, this.body.position.y];
            this.trajectory.push(pos);
        }
        //[[x,y],[x1,y1]]
        for(var i = 0; i < this.trajectory.length; i++){
            image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5,5) 
        }
    }

    shoot(){
        var newangle = cannon.angle - 28
        newangle = newangle * (3.14/180);
        var velocity = p5.Vector.fromAngle(newangle)
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body,
             {x: velocity.x * (180/3.14), y:velocity.y * (180/3.14)})
        
    }

    remove(index){
        this.animation = waterAnimation;
        this.spped = 0.05;
        Matter.Body.setVelocity(this.body, {x: 0, y:0})
        setTimeout(()=>{
            Matter.World.remove(world, this.body)
            delete balls[index];
        },1000)
    }

    animate(){
        this.speed += 0.05;
    }
}