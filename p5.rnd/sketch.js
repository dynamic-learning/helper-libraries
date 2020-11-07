let rndBox1, rndBox2;

function setup() {
  createCanvas(640, 400);
  rndBox1 = new RndBox(rndBoxProp1);
  rndBox2 = new RndBox(rndBoxProp2);
}

function draw() {
  background(0);
  drawRndBox(rndBox1);
  drawRndBox(rndBox2);
}

const drawRndBox = (rndBox) => {
  rndBox.display();
  rndBox.drag();
  rndBox.resize();
  rndBox.drawInside(({ pos, size }) => {
    circle(pos.x, pos.y, size);
  });
}

let rndBoxProp1 = {
  pos: {
    x: 220,
    y: 180,
  },
  size: 100,
};

let rndBoxProp2 = {
  pos: {
    x: 420,
    y: 180,
  },
  size: 100,
};