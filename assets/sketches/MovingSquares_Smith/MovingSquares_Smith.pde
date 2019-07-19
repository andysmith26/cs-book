
int sz = 50;
int theSeed = 0;
float startTime = 0;
float timer = 0;

void setup() {
  size(450, 330);
  background(220);
  noStroke();
  startTime = millis();
}

void draw() {
  background(220);
  fill(0);
  timer = (millis() - startTime)/1000;

  // text(timer, 50, 50);
  fill(78, 193, 78, 50);

  //if (timer % 2 < 0.1) {
  //  theSeed = (int)random(100);
  //}

  if (mouseX == 0 && mouseY == 0) {
    textSize(30);
      fill(78, 193, 78, 100);
    text("move your mouse here", 10, 200);
  }
  randomSeed(theSeed);

  int x = 0;
  int y = 0;
  while (x <= 450)
  {
    while (y <= 450)
    {
      float shiftX1 = mouseX/10 * random(-1, 1);
      float shiftY1 = mouseY/10 * random(-1, 1);
      float shiftX2 = mouseX/10 * random(-1, 1);
      float shiftY2 = mouseY/10 * random(-1, 1);
      float shiftX3 = mouseX/10 * random(-1, 1);
      float shiftY3 = mouseY/10 * random(-1, 1);
      float shiftX4 = mouseX/10 * random(-1, 1);
      float shiftY4 = mouseY/10 * random(-1, 1);
        fill(78, 193, 78, 50);
      beginShape();
      vertex(x+shiftX1, y+shiftY1);
      vertex(x+sz+shiftX2, y+shiftY2);
      vertex(x+sz+shiftX3, y+sz+shiftY3);
      vertex(x+shiftX4, y+sz+shiftY4);
      endShape();
      y = y + sz;
    }
    x = x + sz;
    y = 0;
  }
  fill(78, 193, 78, 200);
  textSize(18);
  text("credit: multiple students, Block B '16-'17", 10, 320);
}

void mousePressed() {
  theSeed = (int)random(1000);
}
