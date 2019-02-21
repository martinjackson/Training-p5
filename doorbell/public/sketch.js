// Adapted from Learning Processing by Daniel Shiffman
// http://www.learningprocessing.com
// Doorbell sample by Corsica_S via freesound.org,
// Creative Commons BY 3.0


var dingdong;   // A sound file object
var doorbell;   // A doorbell object (that will trigger the sound)
var socket;


function setup() {
  createCanvas(200, 200);

  // Load the sound file.
  // We have included both an MP3 and an OGG version.
  soundFormats('mp3', 'ogg');
  dingdong = loadSound('assets/doorbell.mp3');

  // Create a new doorbell
  doorbell = new Doorbell(width/2, height/2, 64);

  socket = io.connect();
}

function draw() {
  background(255);
  // Show the doorbell
  doorbell.display(mouseX, mouseY);
}

function mousePressed() {
  // If the user clicks on the doorbell, play the sound!
  if (doorbell.contains(mouseX, mouseY)) {
    socket.emit('mouse', {x: mouseX, y:mouseY});
    dingdong.play();
  }
}

// A Class to describe a "doorbell" (really a button)
var Doorbell = function(x_, y_, r_) {
  // Location and size
  var x = x_;
  var y = y_;
  var r = r_;

  // Is a point inside the doorbell? (used for mouse rollover, etc.)
  this.contains = function(mx, my) {
    if (dist(mx, my, x, y) < r) {
      return true;
    } else {
      return false;
    }
  };

  // Show the doorbell (hardcoded colors, could be improved)
  this.display = function(mx, my) {
    if (this.contains(mx, my)) {
      fill(100);
    } else {
      fill(175);
    }
    stroke(0);
    strokeWeight(4);
    ellipse(x, y, r, r);
  };
};

