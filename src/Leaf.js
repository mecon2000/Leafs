const initialStroke = 5;
const maxSteps = 50;
let runOnce = false;

class Leaf {
  constructor() {
    this.width = 35;
    this.height = 55;
    this.setToInitial();
    this.subLeafs = [];
    this.color = { start: color("PaleGreen"), end: color("PaleGoldenrod") };
    this.outlineColor = { start: color("Chartreuse"), end: color("DarkGreen") };
    this.stemColor = color("White");
    this.name = "master";
  }

  setToInitial(x=0, y=0) {
    this.currentStep = maxSteps;
    this.stemAngle = radians(random(-45, -135));
    this.leafAngle = radians(random(80, 110));
    this.stemStart = createVector(x, y);

    let v = p5.Vector.fromAngle(this.stemAngle, 50);
    this.stemEnd = p5.Vector.add(this.stemStart, v);
  }

  draw() {
    if (!runOnce) {
      this.subLeafs.push(new SubLeaf("son1", 38, random(-7, 7)));
      this.subLeafs.push(new SubLeaf("son2", -38, random(-7, 7)));
      this.subLeafs.push(new SubLeaf("son3", random(-7, 7), -50));
      runOnce = true;
    }

    if (this.currentStep > 0) {
      this.fadeLeaf();
    } else {
      noLoop();
      return;
    }

    strokeWeight(2);
    stroke(this.stemColor);
    line(this.stemStart.x, this.stemStart.y, this.stemEnd.x, this.stemEnd.y);

    push();
    translate(this.stemEnd);
    rotate(this.stemAngle + this.leafAngle);
    rect(0, 0, this.width, this.height, 15, 15, 5, 5);
    this.subLeafs.forEach((l) => l.draw());
    pop();
  }

  fadeLeaf() {
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
    super();
    this.width = 10;
    this.height = 10;
    this.name = name;
    this.setToInitial(x,y);
  }

  setToInitial(x=0, y=0) {
    this.x = x;
    this.y = y;
    this.currentStep = maxSteps;
    this.color = { start: color("IndianRed"), end: color("DarkRed") };
    this.outlineColor = { start: color("Chartreuse"), end: color("DarkGreen") };
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
