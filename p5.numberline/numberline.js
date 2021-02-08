class Numberline {
  constructor(config) {
    const { x,y,w, min, max, tick } = config

    this.x = x;
    this.y = y;
    this.w = w
    this.min = min
    this.max = max
    this.tick = tick

    const range = this.w
    const noOfTicks = (this.max - this.min)/this.tick
    this.tickWidth = range/noOfTicks
  }
  
  display() {
    stroke(255)
    strokeWeight(2)
    line(this.x, this.y, this.x+this.w, this.y)
    this.markCoords();
  }

  markCoords() {    
    for(
      let x=this.x, n = this.min; 
      x <= this.x + this.w; 
      x += this.tickWidth, n += this.tick
    ) {
      noStroke();
      fill(255)

      circle(x,this.y, 6)      

      textAlign(CENTER)
      textSize(16);
      text(n, x, this.y+28);
    }
  }

  getPix(x) {
    return this.x + (x-this.min) * this.tickWidth * (1/this.tick)
  }

  getCoord(p) {
    return Math.round((this.tick*(p-this.x)/this.tickWidth) + this.min);
  }
}
