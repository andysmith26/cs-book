// smith completion before adding creativity = 10 min
// add'l time could be anything

int startX = 0;
int startY = 150;
int endX = 0;
int endY = 150;

void setup() {
  size(300, 300);
  strokeWeight(2);
  background(100);
}

void draw() {
  int bolt_red = (int)(Math.random() * 55) + 200;
  int bolt_green = (int)(Math.random() * 55) + 200;
  int bolt_blue = (int)(Math.random() * 55) + 200;
  stroke(bolt_red, bolt_green, bolt_blue);
  while (endX < 300) {
    endX = startX + (int)(Math.random() * 10);
    endY = startY + (int)(Math.random() * 20 - 10);
    line(startX, startY, endX, endY);
    startX = endX;
    startY = endY;
  }
}

void mousePressed() {
  startX = 0;
  startY = 150;
  endX = 0;
  endY = 150;
}