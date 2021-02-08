## p5.arrow

Utility function for drawing arrow in p5.js

![Preview](https://s2.gifyu.com/images/Peek-2021-02-08-09-27.gif)

Use arrow just like you use line and specify the size of the pointer as the last parameter.

Here is the code for the above visualization

```
let t=0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  translate(width/2, height/2)
  stroke(255)
  strokeWeight(3)
  arrow(0,0, 100*sin(t), 100*cos(t),10)
  t+=0.05;
}
```
