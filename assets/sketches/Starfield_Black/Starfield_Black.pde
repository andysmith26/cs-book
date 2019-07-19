Particle[] particles;
void setup()
{
  size(1500, 1500);
  background((int)Math.random()*255, (int)Math.random()*255, (int)Math.random()*255);
  particles=new Particle[2000];
  for (int nI=0; nI<particles.length; nI++) {
    particles[nI]=new NormalParticle();
  }
  particles[1]=new OddballParticle(); 
  particles[2]=new JumboParticle();
}
void draw()
{
  for (int nI=0; nI<particles.length; nI++) {
    particles[nI].show();
    particles[nI].move();
  }
  particles[1].show();
  //show jumbo on this line
}
class NormalParticle implements Particle
{
  double x;
  double y;
  int mycolor;
  double Qangle;
  double Qspeed;
  NormalParticle() 
  {
    x=width/2;
    y=height/2;
    Qspeed=Math.random()*10;
    Qangle=Math.random()*Math.PI*2;
  }
    void move()
  {
    x=x+((Math.cos(Qangle))*Qspeed);
    y=y+(Math.sin(Qangle)*Qspeed);
    if(y<0)
    {
      x=x-(((Math.cos(Qangle))*Qspeed))*220;
      y=y-((Math.sin(Qangle)*Qspeed))*220;
    }
        if(y>1500)
    {
      x=x-(((Math.cos(Qangle))*Qspeed))*220;
      y=y-((Math.sin(Qangle)*Qspeed))*220;
    }
        if(x<0)
    {
      x=x-(((Math.cos(Qangle))*Qspeed))*220;
      y=y-((Math.sin(Qangle)*Qspeed))*220;
    }
        if(x>1500)
    {
      x=x-(((Math.cos(Qangle))*Qspeed))*220;
      y=y-((Math.sin(Qangle)*Qspeed))*220;
    }
  }

  void show()
  {
    stroke(0);
    fill((int)(Math.random()*255),(int)(Math.random()*255),(int)(Math.random()*255));
    ellipse((int)x, (int)y, 10, 10);
  }
}
class JumboParticle extends NormalParticle
{
  void show()
  {
    stroke(0);
    fill((int)(Math.random()*255),(int)(Math.random()*255),(int)(Math.random()*255));
    ellipse((int)x, (int)y, 50, 50);
  }
}
interface Particle
{
  public void show();
  public void move();
}
class OddballParticle implements Particle
{
  double x;
  double y;
  int mycolor;
  double Qangle;
  double Qspeed;
  OddballParticle() {
    x=width/2;
    y=height/2;
    Qspeed=8;
    Qangle=Math.random()*Math.PI*2;
  }
  void move()
   {
    x=x+(random(-2,2)*Qspeed);
    y=y+(random(-2,2)*Qspeed);
    if (y<0)
    {
      x=750;
      y=750;
    }
    if (y>1500)
    {
      x=750;
      y=750;
    }
    if (x<0)
    {
      x=750;
      y=750;
    }
    if (x>1500)
    {
      x=750;
      y=750;
    }

   }
   void show()
   {
     noStroke();
     fill((int)(Math.random()*255));
     ellipse((int)x,(int)y,50,50);
   }
}
void mousePressed() {
  clear();
  for (int nI=0; nI<particles.length; nI++) {
    particles[nI]=new NormalParticle();
  }
  particles[1]=new OddballParticle(); 
  particles[2]=new JumboParticle(); 
}
