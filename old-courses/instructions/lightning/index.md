Lightning
=========

One way to simulate lightning is with a random walk. In this assignment you will create a program that uses a random walk to seemingly shoot lightning from one side of the screen to the other every time the mouse is pressed.

1. Start by forking this repo.
1. Open the Lightning.pde file. You'll need to add some code.
1. At the top of the program, declare 4 `int` variables `startX`, `startY`, `endX` and `endY`. Initialize `startX` to 0, `startY` to 150, `endX` to 0 and `endY` to 150
1. `void setup()` needs to set the `strokeWeight()` and `background()` of your sketch
1. `void draw()` needs to do two things:
  - set the `stroke()`color of the lightning bolt to some random value using `random()`
  - a `while` loop that repeats the following until the `endX` is off the screen:
    1. set `endX` to `startX` plus a random integer from 0 to 9
    1. set `endY` to `startY` plus a random integer from -9 to 9
    1. draw a `line()` with endpoints `startX`,`startY`,`endX`,`endY`
    1. set `startX` equal to `endX`
    1. set `startY` equal to `endY`
7. `void mousePressed()` needs to set `startX`,`startY`,`endX`,`endY` back to their original values.
1. This is one of the most important steps! If we all stopped here, everybody's lightning would look the same. That's no fun. In this step you'll make your lightning unique. Take your time on this step, be creative, and make yours look different from anyone else's.
1. When you've got a good draft, ask a colleague for feedback. Incorporate that feedback and give that person credit with a comment in your code.
