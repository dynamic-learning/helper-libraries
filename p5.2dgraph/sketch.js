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