# p5.2dgraph

A minimal 2d graph plotting [library](https://github.com/dynamic-learning/helper-libraries/blob/main/p5.2dgraph/lib/out/index.js) for p5.js

![](https://s8.gifyu.com/images/gif6a83f470402c97fd.gif)

## Sample code

```
let p52dGraph;

function setup() {
  createCanvas(640, 400);
  p52dGraph = new P52dGraph();
}

function draw() {
  background(20);
  drawGraph();
}

function drawGraph() {
  p52dGraph.display();
  p52dGraph.drawSubGrid();
  p52dGraph.drawMainGrid();
  p52dGraph.pan();
  p52dGraph.zoom();
  p52dGraph.markCoords();
  p52dGraph.clip();
}
```
[See in online web editor](https://editor.p5js.org/jithunni.ks/sketches/hsjmQ_Kwl)
