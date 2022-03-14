//consts:
let trail = [];
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
  backgroundColor= color('#F5C67B');
  branchColor =color("green")

  createCanvas(canvasSize, canvasSize);
  frameRate(10);
  rectMode(CENTER);    
  stroke(branchColor);
  background(backgroundColor);  
}

function draw() {}

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

function mousePressed() {
  background(backgroundColor);
  trail = [];
}

function setBranchWidth() {
  const weight = lerp(
    maxBranchWidth,
    minBranchWidth,
    trail.length / maximumLeafs
  );
  strokeWeight(weight);
}

function mouseDragged() {
  const curr = createVector(mouseX, mouseY);
  if (trail.length != 0) {
    const prev = trail[trail.length - 1];
    if (
      trail.length < maximumLeafs &&
      curr.dist(prev) > currentMinimumDistance
    ) {
      setBranchWidth();
      line(prev.x, prev.y, curr.x, curr.y);
      trail.push(curr);
      rect(curr.x, curr.y, 30, 30);
      currentMinimumDistance = random(30, 120);
    }
  } else {
    //first time:
    trail.push(curr);
    currentMinimumDistance = random(40, 120);
  }

  //throttledRect(curr.x, curr.y);
}
