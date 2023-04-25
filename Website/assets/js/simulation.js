var SimulationArea = {
  canvas: document.getElementById("myCanvas"),
  start: function() {
    this.delay = 1000;
    this.canvas.width = 500;
    this.canvas.height = 250;
    this.context = this.canvas.getContext("2d");
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function Vector(x, y) {
  this.x = x;
  this.y = y;

  this.add = function(x2, y2) {
    this.x = this.x + x2;
    this.y = this.y + y2;
  }
}

function RigidBody(width, height, position, velocity, acceleration) {
  this.width = width;
  this.height = height;
  this.position = new Vector(...position);
  this.velocity = new Vector(...velocity);
  this.acceleration = new Vector(...acceleration);
  
  this.update = function() {
    this.ctx = SimulationArea.context;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.position.add(this.velocity.x, this.velocity.y)
  }
}

SimulationArea.start();
var ctx = SimulationArea.context;

bodies = [];
bodies.push(new RigidBody(100, 10, [10, 20], [0, 0], [0, 0]));
setInterval(bodies[0].update, SimulationArea.delay);


