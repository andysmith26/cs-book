ArrayList<Cell> cells = new ArrayList<Cell>();
int cellSize=75;
int maxCellCount=750;
int dis=150;

void setup() {
  size(500, 500);
  //cells.add(new Cell(width/2, height/2, 'w'));
  cells.add(new Cell(width-dis, height-dis, 'y'));
  cells.add(new Cell(dis, height-dis, 'b'));
  cells.add(new Cell(dis, dis, 'r'));
  cells.add(new Cell(width-dis, dis, 'g'));
}

void draw() {
  background(255);
  ArrayList<Overseer> overseers = new ArrayList<Overseer>();

  for (Cell c : cells) {
    c.move();
    c.show();
    c.grow();
    if (c.half()) {
      overseers.add(new Overseer(c.x, c.y, c.cColor));
    }
    if (c.collision(c)==c.cColor) {
      //println(c.cColor);
      //println(c.collision(c));
      //c.cColor=c.collision(c);
      //c.change();
      //println("beep");

    }
  }
  for (Overseer ov : overseers) {
    ov.make();
  }

  //println(cells.size());
}

class Overseer {
  int x;
  int y;
  char cColor;
  Overseer(int _x, int _y, char cellColor) {
    x=_x;
    y=_y;
    cColor=cellColor;
  }
  void make() {
    cells.add(new Cell(x, y, cColor));
  }

}

class Cell {
  int x;
  int y;
  int size;
  int r;
  int g;
  int b;
  int t;
  int trans = 255-(int)(Math.random()*100);
  char cColor;


  Cell(int cellX, int cellY, char cellColor) {
    size=cellSize/2;
    x=cellX;
    y=cellY;
    cColor=cellColor;
    if (cColor == 'g') {
      r=29+(int)(Math.random()*100);
      g=255;
      b=(int)(Math.random()*100);
    } else if (cColor == 'r') {
      r=255;
      g=42+(int)(Math.random()*100);
      b=(int)(Math.random()*100);
    } else if (cColor == 'y') {
      r=238+(int)(Math.random()*100);
      g=255;
      b=(int)(Math.random()*100);
    } else if (cColor == 'b') {
      r=(int)(Math.random()*100);
      g=131+(int)(Math.random()*100);
      b=255;
    } else {
      r=255;
      g=255;
      b=255;
    }
  }

  void show() {
    stroke(137);
    fill(r, g, b, trans);
    ellipse(x, y, size, size);
  }
  char collision(Cell c) {
    if (x+size >= c.x+c.size && y+size >= c.y+c.size) {
      //if (cColor != c.cColor) {
        if ((int)(Math.random()*100)<50){
          return c.cColor;
        }
        else{
          return cColor;
        }
      //} else{
      //  return cColor;
      //}
    } else{
        return c.cColor;
      }
  }
  void change() {

    if (cColor == 'g') {
      r=29+(int)(Math.random()*100);
      g=255;
      b=(int)(Math.random()*100);
    } else if (cColor == 'r') {
      r=255;
      g=42+(int)(Math.random()*100);
      b=(int)(Math.random()*100);
    } else if (cColor == 'y') {
      r=238+(int)(Math.random()*100);
      g=255;
      b=(int)(Math.random()*100);
    } else if (cColor == 'b') {
      r=(int)(Math.random()*100);
      g=131+(int)(Math.random()*100);
      b=255;
    } else {
      r=255;
      g=255;
      b=255;
    }
  }
  void move() {
    x = x + (int)(Math.random()*5)-2;
    y = y + (int)(Math.random()*5)-2;
    if (x>width) {
      x=width;
    }
    if (x<0) {
      x=0;
    }
    if (y>height) {
      y=height;
    }
    if (y<0) {
      y=0;
    }
  }
  void grow() {
    if ((int)(Math.random()*100)>89 && cells.size()<maxCellCount) {
      size++;
    }
  }

  Boolean half() {
    if (size>cellSize) {
      size=size/2;
      return true;
    } else {
      return false;
    }
  }
}
