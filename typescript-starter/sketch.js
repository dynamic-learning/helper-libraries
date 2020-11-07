let lib;

function setup() {
  createCanvas(400, 400);
  lib = new Lib();
}

function draw() {
  background(220);
  lib.display();
}