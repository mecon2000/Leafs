let trail = [];
const maxLeafs = 1;
const canvasSize = 800;
let currentMinimumDistance = 0

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
  rectMode(CENTER);
  background(50);
  stroke("green");
  strokeWeight(4);
  rectMode(CENTER);
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
  background(50);
  trail = []
}

function mouseDragged() {
  const curr = createVector(mouseX, mouseY);
  if (trail.length != 0) {
    const prev = trail[trail.length - 1];
    if (curr.dist(prev) > currentMinimumDistance) {
      line(prev.x, prev.y, curr.x, curr.y);
      trail.push(curr);
      rect(curr.x, curr.y, 30,30);
      currentMinimumDistance = random(30,250);
    }
  } else {  //first time
    trail.push(curr);
    rect(curr.x, curr.y, 30,30);
    currentMinimumDistance = random(30,250);  }

  //throttledRect(curr.x, curr.y);
}
