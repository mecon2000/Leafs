const initialStroke = 5;
const maxSteps = 50;
class Leaf {
  constructor(loc, branchAngle) {
    this.width = 35;
    this.height = 55;
    this.setToInitial(loc, branchAngle);
    this.color = { start: color("PaleGreen"), end: color("PaleGoldenrod") };
    this.outlineColor = { start: color("Chartreuse"), end: color("DarkGreen") };
    this.stemColor = color("White");
    this.name = "master";
  }

  setToInitial(location = createVector(0, 0), branchAngle) {
    this.subLeaves = [];
    this.subLeaves.push(new SubLeaf("son1", createVector(38, random(-7, 7))));
    this.subLeaves.push(new SubLeaf("son2", createVector(-38, random(-7, 7))));
    this.subLeaves.push(new SubLeaf("son3", createVector(random(-7, 7), -50)));

    this.currentStep = maxSteps;
    const side = random([60, -60]);
    this.stemAngle = radians(degrees(branchAngle) + side + random(-45, +45));
    this.leafAngle = radians(random(80, 110));
    this.stemStart = location;

    let v = p5.Vector.fromAngle(this.stemAngle, 50);
    this.stemEnd = p5.Vector.add(this.stemStart, v);
  }

  draw() {
    if (this.currentStep > 0) {
      this.fadeLeaf();
    } else {
      return;
    }

    strokeWeight(2);
    stroke(this.stemColor);
    line(this.stemStart.x, this.stemStart.y, this.stemEnd.x, this.stemEnd.y);

    push();
    translate(this.stemEnd);
    rotate(this.stemAngle + this.leafAngle);
    rect(0, 0, this.width, this.height, 15, 15, 5, 5);
    this.subLeaves.forEach((l) => l.draw());
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
  constructor(name, location) {
    super();
    this.width = 10;
    this.height = 10;
    this.name = name;
    this.setToInitial(location);
  }

  setToInitial(location = createVector(0, 0)) {
    this.location = location;
    this.currentStep = maxSteps;
    this.color = { start: color("IndianRed"), end: color("DarkRed") };
    this.outlineColor = { start: color("Chartreuse"), end: color("DarkGreen") };
  }

  draw() {
    if (this.currentStep > 0) {
      this.fadeLeaf();
    }

    push();
    translate(this.location);
    rect(0, 0, this.width, this.height, 3, 3, 3, 3);
    console.log(this.name);
    pop();
  }
}
