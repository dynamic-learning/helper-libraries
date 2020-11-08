# p5.rnd

[Library](https://github.com/dynamic-learning/helper-libraries/blob/main/p5.rnd/lib/out/index.js) that lets you create movable and resizable shapes in p5.js.

![](https://s8.gifyu.com/images/gif8ad726b1554dd59d.gif)

Here is a working example - https://editor.p5js.org/jithunni.ks/sketches/A5jQ0VAUF

Sample code:
```
let rndBox;

function setup() {
  createCanvas(640, 400);
  rndBox = new RndBox(rndBoxProp);
}

function draw() {
  background(0);
  drawRndBox(rndBox);
}

const drawRndBox = (rndBox) => {
  rndBox.display();
  rndBox.drag();
  rndBox.resize();
  rndBox.drawInside(({ pos, size }) => {
    fill(160,10,100);
    noStroke();
    circle(pos.x, pos.y, size);
  });
}

let rndBoxProp = {
  pos: {
    x: 320,
    y: 200,
  },
  size: 100,
  selectionStrokeWeight:2
};
```
