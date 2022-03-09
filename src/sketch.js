let leafs =[];
const maxLeafs =1;


function setup() {
  createCanvas(400, 400);
  loop();
  frameRate(30);  
  rectMode(CENTER);
  background(50);
  for (let i=0; i<maxLeafs;i++){
  leafs.push(new Leaf(random(-100,100),random(-100,100)))  
  }
};

function draw() {
  leafs.forEach(l=>{l.draw();})
  }

function mousePressed() {
  background(50)
  loop();
  leafs.forEach(l=>{l.setToInitial();})
}