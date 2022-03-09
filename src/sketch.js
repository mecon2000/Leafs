let leafs = [];
const maxLeafs = 1;
const canvasSize = 800;

function setup() {
  createCanvas(canvasSize, canvasSize);
  loop();
  frameRate(30);
  rectMode(CENTER);
  background(50);

  const spaceDimToDrawLeafs = canvasSize / 3;
  for (let i = 0; i < maxLeafs; i++) {
    const x = random(-spaceDimToDrawLeafs, spaceDimToDrawLeafs);
    const y = random(-spaceDimToDrawLeafs, spaceDimToDrawLeafs);
    leafs.push(new Leaf(x, y));
  }
}

function draw() {
  leafs.forEach((l) => {
    l.draw();
  });
}

function mousePressed() {
  background(50);
  loop();
  leafs.forEach((l) => {
    l.setToInitial();
  });
}
