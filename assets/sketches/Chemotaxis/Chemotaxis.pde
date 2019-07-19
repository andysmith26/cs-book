Bacteria[] colony;

void setup() {
  size(500, 300); 
  colony = new Bacteria[50];
  for (int i = 0; i < colony.length; i++) {
    colony[i] = new Bacteria((int)(Math.random() * width), (int)(Math.random() * height)); 
  }
}

void draw() {
  background(150);
  for (int i = 0; i < colony.length; i++) {
    colony[i].move();
    colony[i].show();
  }
  fill(200, 200, 50);
  ellipse(800, 150, 700, 750);
}

class Bacteria {
 int x;
 int y;
 int r;
 int g;
 int size;
 
 Bacteria(int myX, int myY) {
   x = myX;
   y = myY;
   r = (int)(Math.random() * 40) + 50;
   g = (int)(Math.random() * 40) + 50;
   size = (int)(Math.random() * 20) + 10;
 }
 
 void move() {
   if (mouseX < x) {
     x = x + (int)(Math.random() * 7) - 5;
   } else {
     x = x + (int)(Math.random() * 7) - 1;
   }
   if (x > 350) x = x + (int)(Math.random() * 7) - 5;
   if (mouseY < y) {
     y = y + (int)(Math.random() * 7) - 5;
   } else {
     y = y + (int)(Math.random() * 7) - 1;
   }
 }
 
 void show() {
   fill(r + x / 4, g + x / 4, 100 + x / 3, 150);
   noStroke();
   ellipse(x, y, size, size);
 }
 
}