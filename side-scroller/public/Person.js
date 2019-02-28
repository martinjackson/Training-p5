// Baniel Shiffman
// Session 2: Array of Particles, multiple forces

function Person() {
  this.pos = createVector(50,height);
  this.vel = createVector(1,0);
  this.acc = createVector(0,0);
  this.engStats = new EngineStats();

  this.vtos = function(v, digits) {
    return v.x.toFixed(digits) + ', ' + v.y.toFixed(digits);
  }

  this.stats = function() {
    return this.engStats.current() +
           '\np: ' + this.vtos(person.pos,0) +
           '\nv: ' + this.vtos(person.vel,2);
  }


  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0);
  }

  this.jump = function() {
    var jump = createVector(0, -5);
    this.applyForce(jump);
  }


  this.display = function() {
    fill(255,150);
    stroke(255);
    rect(this.pos.x, this.pos.y-50, 20, 50);
  }

  this.edges = function() {
    if (this.pos.y > height) {
      this.vel.y *= 0;   // -1 bounce, 0 stick the landing
      this.pos.y = height;
    }

  }

}