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

## Configuring the graph

The default config for the graph is 
```
const colorConfig = {
    axis: 255,
    background: 0,
    boundary: 100,
    mainGrid: [0, 90, 130],
    subGrid: 40,
    clip:0,
    font:255
  };
  
  const basicConfig = {
    x: 50,
    y: 50,
    w: 500,
    h: 300,
    originX: 250,
    originY: 150,
    unitX: 40,
    unitY: 40,
    unitXDivisions: 2,
    unitYDivisions: 2,
  };
  
  const strokeWeightConfig = {
    axis: 3,
    boundary: 1,
    mainGrid: 2,
    subGrid: 1,
  };
   
  // Default config
  let defaultConfig = {
    basicConfig,
    colorConfig,
    strokeWeightConfig,
  };
```
If you wish to override any property, say for example the background color and unitX width, you can pass the below object to the graph constructor
```
let defaultConfig = {
  colorConfig: {
    background: [255,0,0]
  },
  basicConfig: {
    unitX: 50
  }
}
// Passing the config to the constructor
p52dGraph = new P52dGraph(defaultConfig)
```

## Interfaces

### To be called in the draw function
1.  display()
2.  drawMainGrid()
3.  drawSubGrid()
4.  pan()
5.  zoom()
6.  clip()

### Can be called anywhere to get the coordinates and pixels
7.  getXPixel()
8.  getYPixel()
9.  getXCoord()
10. getYCoord()
