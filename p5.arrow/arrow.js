function arrow(x1,y1,x2,y2, size) {
  line(x1,y1,x2,y2);
  push();
  const angle = atan2((y2-y1),(x2-x1))
  translate(x2-size*cos(angle),y2-size*sin(angle))
  rotate(angle+PI/2)
  line(size/2,0,-size/2,0)
  triangle(size/2,0, -size/2,0,0,-size)
  pop();
}
