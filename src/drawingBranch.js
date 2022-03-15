//consts:
let leafs = [];
const canvasSize = 800;
const maximumLeafs = 10;

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

function draw() {
  text('drag the mouse over the screen', canvasSize/2, 35);
  leafs.forEach((l) => {
    l?.leaf?.draw();
  });
}

// const throttle = (func, limit) => {
//   let lastFunc;
//   let lastRan;
//   return function() {
//     const context = this;
//     const args = arguments;
//     if (!lastRan) {
//       func.apply(context, args)
//       lastRan = Date.now();
//     } else {
//       clearTimeout(lastFunc);
//       lastFunc = setTimeout(function() {
//           if ((Date.now() - lastRan) >= limit) {
//             func.apply(context, args);
//             lastRan = Date.now();
//           }
//        }, limit - (Date.now() - lastRan));
//     }
//   }
// }

// const throttledRect = throttle((x,y)=>{rect(x,y, 30,30)}, 100);

function setBranchWidth() {
  const weight = lerp(
    maxBranchWidth,
    minBranchWidth,
    leafs.length / maximumLeafs
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
  leafs = []
  background(backgroundColor);
}

function mouseDragged() {
  const currLoc = createVector(mouseX, mouseY);
  if (leafs.length != 0) {
    const prevLeaf = leafs[leafs.length - 1];
    if (
      leafs.length < maximumLeafs &&
      currLoc.dist(prevLeaf.loc) > currentMinimumDistance
    ) {
      setBranchWidth();
      line(prevLeaf.loc.x, prevLeaf.loc.y, currLoc.x, currLoc.y);
      const angle = getLineAngle(prevLeaf.loc, currLoc);
      leafs.push({ loc: currLoc, leaf: new Leaf(currLoc,angle) });
      currentMinimumDistance = random(30, 120);
    }
  } else {
    //first time:
    leafs.push({ loc: currLoc });
    currentMinimumDistance = random(40, 120);
  }

  //throttledRect(curr.x, curr.y);
}
