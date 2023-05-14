class Particle {
  constructor(charge, position) {
  this.charge = charge;
  this.height = height;
}

  update() {
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.position.add(this.velocity.x*SimulationArea.delay, this.velocity.y*SimulationArea.delay)
  }
}