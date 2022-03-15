//consts:
let leaves = [];
const canvasSize = 800;
const maximumLeaves = 10;

//colors consts:
let backgroundColor;
let branchColor;
const minBranchWidth = 1;
const maxBranchWidth = 7;

//globals :
let currentMinimumDistance = 0;

function setup() {
  //setting consts which cannot be initialized on global scope (it's a p5.js thing)
  backgroundColor = color("#F5C67B");
  branchColor = color("white");

  createCanvas(canvasSize, canvasSize);
  frameRate(30);
  rectMode(CENTER);
  stroke(branchColor);
  background(backgroundColor);
  textSize(canvasSize / 30);
  textAlign(CENTER);
}

function writeInstructions() {
  push()
  stroke('white')
  strokeWeight(1)
  fill('black')
  text('drag the mouse over the screen', canvasSize/2, 35);
  pop()
}

function draw() {
  writeInstructions()
  
  leaves.forEach((l) => {
    l?.leaf?.draw();
  });
}

function setBranchWidth() {
  const weight = lerp(
    maxBranchWidth,
    minBranchWidth,
    leaves.length / maximumLeaves
  );
  strokeWeight(weight);
}

function getLineAngle(v1,v2)
{
  const v3 = createVector(v2.x-v1.x, v2.y-v1.y);  
  const angle = v3.heading();
  return angle;
}

function mousePressed() {
  leaves = []
  background(backgroundColor);
}

function mouseDragged() {
  const currLoc = createVector(mouseX, mouseY);
  if (leaves.length != 0) {
    const prevLeaf = leaves[leaves.length - 1];
    if (
      leaves.length < maximumLeaves &&
      currLoc.dist(prevLeaf.loc) > currentMinimumDistance
    ) {
      setBranchWidth();
      line(prevLeaf.loc.x, prevLeaf.loc.y, currLoc.x, currLoc.y);
      const angle = getLineAngle(prevLeaf.loc, currLoc);
      leaves.push({ loc: currLoc, leaf: new Leaf(currLoc,angle) });
      currentMinimumDistance = random(30, 120);
    }
  } else {
    //first time:
    leaves.push({ loc: currLoc });
    currentMinimumDistance = random(40, 120);
  }
}
