//Starfield project by Sam Powers 11/7/17 
//Declaring particle array
particle[] particles;
void setup() {
  size(700, 700);
  background(0);
  noStroke();
  //Initializing particles array
  particles = new particle[2000];
  //Initializing particles in the array
  for (int i = 0; i < particles.length; i++) {
    particles[i] = new normalParticle();
  }
  particles[999] = new oddballParticle();
  particles[1999] = new jumboParticle();
}

void draw() {
  //Draws particles and moves each particle
  background(0);
  for (int i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].show();
  }
}

class normalParticle implements particle
{
  // Member variables
  double x, y, angle, speed;
  color myColor;
  
  // Constructor that sets the first coordinates, the speed, the angle, and the color.
  normalParticle() {
    x = 350;
    y = 350;
    speed = Math.random() * 3;
    angle = Math.random() * Math.PI * 2;
    myColor = (255);
  }

  public void move() {
    //Sets the new coordinates for the particles
    x += Math.tan(angle) * speed;
    y += Math.cos(angle) * speed;
  }

  public void show() {
    //Shows the particles
    fill(myColor);
    ellipse((int)x, (int)y, 4, 4);
  }
}
//Creates an interface between Oddball, Jumbo, and Normal
interface particle {
  public void show();
  public void move();
}

//Creates the oddball particle
class oddballParticle implements particle {
  //Member variables
  double x, y, angle, speed;
  color myColor;
  PImage John;
  String url;
  //Constructor
  oddballParticle() {
    x = 350;
    y = 350;
    speed = 4;
    angle = Math.random() * Math.PI * 2;
    myColor = color(0);
    //Gets John Krasinski's face from the computer and resizes it
    url = ("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/John_Krasinski_and_Josh_Wood_%28cropped%29.jpg/330px-John_Krasinski_and_Josh_Wood_%28cropped%29.jpg");
    John = loadImage(url, "jpg");
    John.resize(1, 0);
  }
  public void move() {
    x += Math.tan(angle) * speed;
    y += Math.sin(angle) * speed;
  }

  public void show() {    
    fill(myColor);
    image(John, (int) x, (int) y);
  }
}
//Creates the Jumbo particle and uses everything from the normal particle class with the "extends" keyword
class jumboParticle extends normalParticle
  {
    jumboParticle(){
    //Based on variable randomNum, the jumbo particle color is chosen
    int randomNum = (int) (Math.random() * 5);
    if (randomNum == 0) {
      myColor = (#7FE817);
    }
    if (randomNum == 1) {
      myColor = (#1F45FC);
    }
    if (randomNum == 2) {
      myColor = (#93FFE8);
    }
    if (randomNum == 3) {
      myColor = (#FFD801);
    }
    if (randomNum == 4) {
      myColor = (#00FFFF);
    }
    }
    public void show(){
      fill(myColor);
      ellipse((int) x, (int) y, 30, 30);
    }
  }  
