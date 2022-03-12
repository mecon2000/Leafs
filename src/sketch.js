let leafs = [];
const maxLeafs = 1;
const canvasSize = 800;

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(30);
  rectMode(CENTER);
  background(50);
  for (let i = 0; i < maxLeafs; i++) {
    leafs.push(new Leaf());
  }
}

function draw() {
  leafs.forEach((l) => {
    l.draw();
  });
}

function mousePressed() {
  background(50);
  const spaceDimToDrawLeafs = canvasSize / 3;
  leafs.forEach((l) => {
    l.setToInitial(mouseX ,mouseY);
  });
  loop();
}