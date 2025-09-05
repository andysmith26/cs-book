int numberOne;
int numberTwo;
int drawSpeed = 2;
int maxPoints = 500;

Circle c1;
Circle c2;
int f;
ArrayList<Float[]> points;


void setup() {
 size(450, 330);
 setTwoValues();

 f = 360;
  // frameRate(5);
}

void draw() {
  background(200);
  translate(width/2, height/2);
  c1.update();
  c1.display();
  stroke(0);

  c2.update();
  c2.display();

  ellipse(c2.edgeX, c1.edgeY, 3, 3);
  strokeWeight(1);
  stroke(100);
  line(c1.edgeX, c1.edgeY, c2.edgeX, c1.edgeY);
  line(c2.edgeX, c2.edgeY, c2.edgeX, c1.edgeY);
  Float[] thisPoint = {c2.edgeX, c1.edgeY};
  if(points.size() <= maxPoints) {
    points.add(thisPoint);
  } else {
    points.remove(0);
    points.add(thisPoint);
  }
  drawPoints(points);
  stroke(100, 0, 100);
  ellipse(c2.edgeX, c1.edgeY, 3, 3);
  textSize(30);
  fill(100);
  text("the", -200, -10);
  text("shape", -200, 25);
  text("of", -200, 60);
  text("fractions", -200, 95);
  textSize(20);
  fill(140);
  text("click for a new fraction", -200, 125);
  textSize(30);
  fill(100, 0, 0);
  text(numberTwo, -30, 10);
  fill(0, 0, 100);
  text(numberOne, -10, 50);
  stroke(0);
  strokeWeight(3);
  line(20, -2, -40, 38);
  f = f + 1;
}

void drawPoints(ArrayList<Float[]> pts) {
  stroke(100, 0, 100);
  for(Float[] p : pts) {
    ellipse(p[0], p[1], 1, 1);
  }
}
class Circle {
  float x;
  float y;
  float r;
  float speed;
  color myColor;
  float edgeX;
  float edgeY;
  float angle;
  float dotR = 3;

  Circle(float x_, float y_, float r_, float s_, color c_) {
    x = x_;
    y = y_;
    r = r_;
    speed = s_;
    myColor = c_;
    angle = 0;
    setEdgeX();
    setEdgeY();
  }

  void update() {
    angle = f * -speed/100;
    setEdgeX();
    setEdgeY();
  }

  void display() {
    stroke(myColor);
    strokeWeight(1);
    fill(255);
    ellipse(x, y, r*2, r*2);
    strokeWeight(2);
    line(x, y, edgeX, edgeY);
    fill(myColor);
    noStroke();
    ellipse(edgeX, edgeY, dotR*2, dotR*2);
  }

  void setEdgeX() {
    edgeX = x + r * sin(angle);
  }

  void setEdgeY() {
    edgeY = y + r * cos(angle);
  }
}

void setTwoValues() {
  numberOne = (int)random(1, 8);
  numberTwo = (int)random(1, 8);
  c1 = new Circle(-100, -100, 50, numberTwo*drawSpeed, color(100, 0, 0));
  c2 = new Circle(100, 100, 50, numberOne*drawSpeed, color(0, 0, 100));
  points = new ArrayList<Float[]>();
}

void mousePressed() {
  setTwoValues();
}
