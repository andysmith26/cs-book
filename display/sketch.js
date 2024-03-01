let cols = 20;
let rows, cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeGridData();
}

function draw() {
  background(0);
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      noStroke();
      fill(noise(0.01 * frameCount +(j + i*cols))*100);
      x = j * cellSize;
      y = i * cellSize;
      rect(x, y, cellSize);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeGridData();
}

function initializeGridData() {
  cellSize = int(width/cols);
  rows = height / cellSize;
}
