class Cannon{
    constructor(x,y,w,h,angle){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;
        this.cannonImg = loadImage("assets/canon.png");
        this.cannonBaseImg = loadImage("assets/cannonBase.png");
    }

    display(){
        console.log(this.angle);
        if(keyIsDown(RIGHT_ARROW)&& this.angle < 70){
            console.log("right")
            this.angle += 1;
        }
        if(keyIsDown(LEFT_ARROW)&& this .angle > -30){
            this.angle -= 1;
            console.log("left")
        }
        //code to create cannon top
        push();
        translate(this.x, this.y); 
        rotate(this.angle); 
        imageMode(CENTER);
        image(this.cannonImg,0,0,this.w,this.h)
        pop();

        //code to create cannon bottom
        image(this.cannonBaseImg,70,20,200,200)
        noFill();
    }

    move(){

    }
}