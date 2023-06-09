
let maxAge = 200;   // tendrils older than this will be removed 
let fungi;          // list of objects
let pause = false;  // use 'p' to pause/un-pause


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
 
  fungi = [];
  for (let i=0; i<3; i++) {
    let f = new Fungus(width/2, height/2);
    fungi.push(f);
  }
}


function draw() {
  
  if (!pause) {
    
    for (let i=fungi.length-1; i>=0; i-=1) {
      
    
      let f = fungi[i];
      
      // update and, if it has reached a certain radius or is too old, remove it
      f.update();
      if (f.distFromCenter >= height/2-50 || f.age > maxAge) {
        fungi.splice(i, 1);  // '1' means remove one element
      }
      
    
      f.display();
    }
    
    //if it startes to lag reset 
    if (frameRate() < 30) {
      setup();
    }
  }
}


function keyPressed() {

  if (key == 'p') {
    pause = !pause;
  }
   //other keys reset 
  else {
    setup();
  }
}



class Fungus {
  constructor(x, y, angle) {
    
    // values common to all Fungus objects
    this.angleChangeAmt = radians(2);
    this.speed =          1;
    this.chanceSplit =    2;
    this.splitAngle =     radians(16);


    this.angle = angle || random(0, TWO_PI);

    // variables set when instantiated and updated every frame
    this.x =     x;
    this.y =     y;
    this.prevX = x;
    this.prevY = y;
    this.distFromCenter;
    this.age = 0;
  }  
  
  update() {
    
    // increase age of this tendril
    this.age += 1;
 
    // calculate the distance from the center of the sketch using the Pythagorean theorem
    this.distFromCenter = sqrt(pow(width/2-this.x, 2) + pow(height/2-this.y, 2));
    
    // move in a random direction
    this.angle += random(-this.angleChangeAmt, this.angleChangeAmt);
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;    
    
    // randomly split into two Fungus objects new one will split off in one direction, current splits in the opposite direction
    if (random(100) < this.chanceSplit) {
      let f = new Fungus(this.x,this.y, this.angle + this.splitAngle);
      fungi.push(f);
      this.angle -= this.splitAngle;
    }
  } 
  
  display() {    
    stroke(random(0,20),random(20,100),random(255),2000);
    strokeWeight(2.5);
    line(this.prevX,this.prevY, this.x,this.y);
  }
}
