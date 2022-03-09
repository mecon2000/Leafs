const initialStroke = 5;
const maxSteps = 50;
let runOnce = false;

class Leaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 55;
    this.setToInitial();
    this.subLeafs = [];
    this.color = {start: color("PaleGreen"), end: color("PaleGoldenrod")};
    this.outlineColor = {start: color("Chartreuse"), end: color("DarkGreen")};
    this.name = "master";
  }

  setToInitial() {
    this.currentStep = maxSteps;
    this.angle = radians(random(-45, 45));
  }

  draw() {
    console.log (`Drawing!`);
    if (!runOnce) {
      this.subLeafs.push(new SubLeaf("son1",38, random(-7, 7)));
      this.subLeafs.push(new SubLeaf("son2",-38, random(-7, 7)));
      this.subLeafs.push(new SubLeaf("son3",random(-7, 7), -50));
      runOnce = true;
    }

    if (this.currentStep > 0) {
      this.fadeLeaf();
    } else {
      noLoop();
      return;
    }

    push();
    translate(width / 2 + this.x, height / 2 + this.y);
    rotate(this.angle);
    rect(0, 0, this.width, this.height, 15, 15, 5, 5);
    this.subLeafs.forEach((l) => l.draw());    
    pop();
  }

  fadeLeaf() {
    console.log (`${this.name}, ${this.currentStep}`);
    this.currentStep--;
    let s = initialStroke * (this.currentStep / maxSteps);
    strokeWeight(s);    
    
    let leafOutlineColor = lerpColor(
      this.outlineColor.start,
      this.outlineColor.end,
      1 - this.currentStep / maxSteps
    );
    stroke(leafOutlineColor);

    let leafColor = lerpColor(
      this.color.start,
      this.color.end,
      1 - this.currentStep / maxSteps
    );
    fill(leafColor);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class SubLeaf extends Leaf {
  constructor(name, x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.name = name;
    this.setToInitial();
  }

  setToInitial() {
    this.currentStep = maxSteps;
    this.color = {start: color("IndianRed"), end: color("DarkRed")};
    this.outlineColor = {start: color("Chartreuse"), end: color("DarkGreen")};
  }

  draw() {
    if (this.currentStep > 0) {      
      this.fadeLeaf();
    }

    push();
    translate(this.x, this.y);
    rect(0, 0, this.width, this.height, 3, 3, 3, 3);
    pop();
  }
}
