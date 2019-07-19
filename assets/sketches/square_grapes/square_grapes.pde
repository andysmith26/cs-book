int gridSize;
int margin;
int fullAdjustment;
int textHeight;
boolean enhanced;
int squareToRotate;
int currentRotation;
int speed;

void setup() {
  size(300, 300);
  gridSize = 25;
  margin = 4;
  textHeight = 10;
  speed = 3;
  fullAdjustment = margin;
  squareToRotate = selectSquareToRotate();
  rectMode(CENTER);
}

void draw() {
  background(255);
  noStroke();
  int startCoordinate = gridSize / 2;
  int squareSize = (gridSize - (margin * 2));
  int squareCount = 0;
  if (currentRotation >= 90) {
    squareToRotate = selectSquareToRotate();
    currentRotation = 0;
  }
  for (int y = startCoordinate; y <= height; y += gridSize) {
    for (int x = startCoordinate; x <= width; x += gridSize) {
      if (squareCount == squareToRotate) {
        fill(140, 70, 140);
        translate(x, y);                    // translate to the center of the object you want to rotate
        rotate(radians(currentRotation));   // apply the rotation
        rect(0, 0, squareSize, squareSize); // draw the object at center 0, 0 (because you translated there)
        rotate(radians(-currentRotation));  // reverse the rotation (undoing things in reverse sequence)
        translate(-x, -y);                  // then reverse the translation
        currentRotation += speed;        
      } else {
        fill(70, 140, 70);
        rect(x, y, squareSize, squareSize);
      }
      squareCount++;
     }
  }

  if (enhanced) {
    stroke(51, 100);
    strokeWeight(5);
  }

}

int selectSquareToRotate() {
  return (int)(Math.random() * (width / gridSize) * (height / gridSize));
}