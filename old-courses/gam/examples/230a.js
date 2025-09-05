let circleX;

function setup() {
  createCanvas(200, 200);
  circleX = 100;
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  circle(circleX, 100, 20);
}
