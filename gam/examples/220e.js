function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(220);
  fill(mouseX, 100, 100);
  ellipse(mouseX, mouseY, 20, 20);
  ellipse(width - mouseX, mouseY, 20, 20);
}
