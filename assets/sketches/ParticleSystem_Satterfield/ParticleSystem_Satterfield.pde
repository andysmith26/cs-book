ArrayList<Particle> ps = new ArrayList<Particle>();
PImage img;
void setup() {
  img = loadImage("face.png");
  size(640, 360);
}

void draw() {
  
  background(255);
  image(img, 270, 30, 100, 100);
  ps.add(new Particle());
  for (int i=0; i < ps.size(); i++) {
    Particle p = ps.get(i);
    //for (int i = 0; i < ps.size(); i++){
    p.update();
    p.display();
    if (p.isDead()) {
      ps.remove(0);
    }
  }
}

class Particle {
  float locationX, locationY;
  float velocityX, velocityY;
  float accelerationX, accelerationY;
  float lifespan;
  color rgb = color((int)(Math.random()*255),(int)(Math.random()*255),(int)(Math.random()*255));

  Particle() {
    accelerationX = 0;
    accelerationY = 0.05;
    velocityX = (float)(Math.random() * 2 - 1);
    velocityY = (float)(Math.random() * 2 - 2);    
    locationX = width / 2;
    locationY = 90;
    lifespan = 255;
  }

  boolean isDead() {
    if (lifespan <=0) {
      return true;
    } else {
      return false;
    }
  }


  void update() {
    velocityX += accelerationX;
    velocityY += accelerationY;   
    locationX += velocityX;
    locationY += velocityY;

    lifespan -=2;
  }

  void display() {
    stroke(0, lifespan);
    fill(rgb, lifespan);
    ellipse(locationX, locationY, 8, 8);
  }
}
