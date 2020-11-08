let p5graph2D;

function setup() {
  createCanvas(640, 400);
  graph2D = new P5Graph2D();
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