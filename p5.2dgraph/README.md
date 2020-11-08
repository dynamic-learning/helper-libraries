# p5.2dgraph

A minimal 2d graph plotting [library](https://github.com/dynamic-learning/helper-libraries/blob/main/p5.2dgraph/lib/out/index.js) for p5.js

![](https://s8.gifyu.com/images/gif6a83f470402c97fd.gif)

# Sample code

```
let graph2D;

function setup() {
  createCanvas(640, 400);
  graph2D = new Graph2D();
}

function draw() {
  background(20);
  drawGraph();
}

function drawGraph() {
  graph2D.display();
  graph2D.drawSubGrid();
  graph2D.drawMainGrid();
  graph2D.pan();
  graph2D.zoom();
  graph2D.markCoords();
  graph2D.clip();
}
```
[See in online web editor](https://editor.p5js.org/jithunni.ks/sketches/hsjmQ_Kwl)
