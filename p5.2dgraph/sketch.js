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
  graph2D.drawMainGrid();
  graph2D.drawSubGrid();
  graph2D.pan();
  graph2D.zoom();
  graph2D.clip();
}