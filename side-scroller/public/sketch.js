
// following
// The Coding Train --- Q&A #1: Side-Scroller in p5.js
// https://www.youtube.com/watch?v=Ouza_4SsbLc&index=2&list=PLRqwX-V7Uu6Z1JcqC1iG1oEsJrLX1IK5L&t=8s

let person;    // player
let avenir;    // font

function preload() {
  avenir = loadFont('assets/Avenir.otf');
}

function setup() {
  createCanvas(640, 360);

  textFont(avenir);
  textSize(width / 40);
  textAlign(LEFT, CENTER);

  person = new Person();
}

function draw() {
  background(50,100,200);

  var gravity = createVector(0, 0.1);
  person.applyForce(gravity);

  // static position elements

  if (mouseIsPressed) {
      noFill();
      stroke(100, 240, 100);
      ellipse(mouseX, mouseY, 20,20);
  }

  const msg = person.stats();
  fill(0,200,100);
  text(msg, 50, 30);

  // world coordinate elements

  translate(-person.pos.x+50, 0)

  person.update();
  person.edges();
  person.display();

  fill(255,0,100);
  rect(400, height-50, 50,50);
}

function keyPressed() {
  if (key == ' ') {
    person.jump()
  }
}

function mousePressed() {
  person.jump();
}

