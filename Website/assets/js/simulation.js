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
}

function RigidBody(width, height, position, velocity, acceleration) {
  this.width = width;
  this.height = height;
  this.position = new Vector(...position);
  this.velocity = new Vector(...velocity);
  this.acceleration = new Vector(...acceleration);
}

function update(body) {
  body.ctx = SimulationArea.context;
  ctx.fillRect(body.position.x, body.position.y, body.width, body.height);
  body.position.x += body.velocity.x
  body.position.y += body.velocity.y
}

SimulationArea.start();
var ctx = SimulationArea.context;

bodies = [];
bodies.push(new RigidBody(100, 10, [100, 20], [10, 10], [0, 0]));
setInterval(() => {update(bodies[0]);}, SimulationArea.delay);