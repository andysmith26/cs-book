BubbleSystem bs;
void setup() {
  size(640, 360);
  bs= new BubbleSystem();
}

void draw() {
  background(255);
  bs.addBubble();
  bs.run();
}

class Bubble {
  float locationX, locationY;
  float velocityX, velocityY;
  float accelerationX, accelerationY;
  int timeUntilPop, size;

  Bubble() {
    accelerationX = 0;
    accelerationY = 0.05;
    velocityX = (float)(Math.random() * 2 - 1);
    velocityY = (float)(Math.random() * 2 - 2);    
    locationX = width / 2;
    locationY = 30;
    timeUntilPop= 200;
    size=8;
  }

  void update() {
    velocityX += accelerationX;
    velocityY += accelerationY;   
    locationX += velocityX;
    locationY += velocityY;
    timeUntilPop=timeUntilPop-2;
  }
  Boolean isPop() 
  {
    if (timeUntilPop<=0) {
      return true;
    } else {
      return false;
    }
  }
  void display() {
    if (isPop() == true) {
      size=size+10;
    }
    if (size>=50) {
      stroke(255);
      fill(255);
    } else {
      stroke(0);
      fill(0);
    }
    ellipse(locationX, locationY, size, size);
  }
}

public class BubbleSystem {
  ArrayList<Bubble> b;
  BubbleSystem() {
    b = new ArrayList<Bubble>();
  }
  void addBubble() {
    b.add(new Bubble());
  }
  void run() {

    for (int i=b.size()-1; i>=0; i--) {
      Bubble c = b.get(i); 
      c.update();
      c.display();
      if (c.isPop()) {
        b.remove(i);
      }
    }
  }
}
