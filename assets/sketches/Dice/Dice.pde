// Declare Variables
Die player, opponent;
int playerSum, opponentSum;

void setup() {
  noLoop();
  background(255);
  size(500, 600);
}

void draw() {    
  background(0);
  stroke(255);
  strokeWeight(3);
  line(250, 0, 250, 500);
  // Initialize the player's dice
  for (int y = 0; y < 500; y += 90) {
    for (int x = 0; x < 250; x += 90) {   
      player = new Die(x, y);
      player.roll();
      player.show();
      playerSum += player.dotNum;
    }
  }
  // Initialize the enemies' dice
  for (int y = 0; y < 500; y += 90) {
    for (int x = 270; x < 500; x += 90) {   
      opponent = new Die(x, y);
      opponent.roll();
      opponent.show();
      opponentSum += opponent.dotNum;
    }
  }
  // Variables for the text
  String s = "Your sum: " + playerSum;
  String t = "Enemy's sum: " + opponentSum;
  fill(255);
  // Display Text
  textSize(25);
  text(s, 0, 550);
  text(t, 295, 550);
  // Comparisons to see who won
  if(playerSum > opponentSum) {
    text("Player Wins", 170, 590);
  } else if(playerSum < opponentSum) {
    text("Enemy Wins", 170, 590);
  } else {
    text("It's a tie", 180, 590);
  }
}

void mousePressed() {    
  redraw();
  playerSum = 0;
  opponentSum = 0;
}


class Die {   
  //variable declarations
  int x, y, dotNum;
  Die(int _x, int _y) { //constructor        
    //variable initializations 
    x = _x;
    y = _y;
    dotNum = 1;
  }
  // Randomnizes the roll (when called)
  void roll() {
    dotNum = (int)(Math.random()*6)+1;
  }   
  // Shows the dice (when called)
  void show() {
    fill(0);
    rect(x, y, 50, 50, 10);
    stroke((int)(Math.random()*256), (int)(Math.random()*256), (int)(Math.random()*256));
    strokeWeight(3);
    // Checking to see what number was rolled
    switch (dotNum) {
    case 1:
      ellipse(x+25, y+25, 5, 5);
      break;
    case 2:
      ellipse(x+10, y+10, 5, 5);
      ellipse(x+40, y+40, 5, 5);
      break;
    case 3:
      ellipse(x+10, y+10, 5, 5);
      ellipse(x+25, y+25, 5, 5);
      ellipse(x+40, y+40, 5, 5);
      break;
    case 4:
      ellipse(x+10, y+10, 5, 5);
      ellipse(x+40, y+10, 5, 5);
      ellipse(x+10, y+40, 5, 5);
      ellipse(x+40, y+40, 5, 5);
      break;
    case 5:
      ellipse(x+10, y+10, 5, 5);
      ellipse(x+40, y+10, 5, 5);
      ellipse(x+10, y+40, 5, 5);
      ellipse(x+40, y+40, 5, 5);
      ellipse(x+25, y+25, 5, 5);
      break;
    case 6:
      ellipse(x+10, y+10, 5, 5);
      ellipse(x+40, y+10, 5, 5);
      ellipse(x+10, y+40, 5, 5);
      ellipse(x+40, y+40, 5, 5);
      ellipse(x+10, y+25, 5, 5);
      ellipse(x+40, y+25, 5, 5);
      break;
    default:
      ellipse(x+25, y+25, 5, 5);
    }
  }
}
