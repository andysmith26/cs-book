// Jason Drebber
// WoodstockWave
// Done in collaboration with Mr. Smith

float x = PI;
float movement = 0;
float n;
color[] colors = {color(255), color(0, 255, 0)};
float p = 100;
float z = 15;

void setup() {
  size(450, 330);
  strokeWeight(2);
  frameRate(30);
}

void draw() {
  noFill();
  translate(0,100);
  float t = random(20);
  background(100);
  n = 5;
  int colorToUse = 0;
  while (n < 400) {
    stroke(colors[colorToUse % colors.length]);
    colorToUse++;
    arc(width/2, height/2, n, n, PI, x);
    x = map(sin(movement + n/p), -1, 1, PI, TWO_PI);
    n += z;
  }
  movement+= PI/60;
  // if (mouseClicked) {
  //  z = t;
  // }
  fill(50);
  textSize(18);
  text("credit: JD '17", 10, 220);
}
