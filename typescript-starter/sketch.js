let myCircle;

function setup() {
  createCanvas(400, 400);
  myCircle = new MyCircle();
}

function draw() {
  background(220);
  myCircle.display();
}