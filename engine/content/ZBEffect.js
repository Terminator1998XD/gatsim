class ZBEffect extends GameObject {
  constructor(pos, angle, part) {
    super(pos, new Size(part.width,part.height));
    this.setTexture(part);
    this.part = part;
    effects_push(this);
    const speed = getrand(15,30);
    this.cosAngle = Math.cos(angle)*speed;
    this.sinAngle = Math.sin(angle)*speed;
    this.rem = 0;
  }

  Update(){
    this.rem++;

    if(this.rem == 20){
      effects_remove(this);
      return;
    }

    this.pos.x += this.cosAngle;
    this.pos.y += this.sinAngle;
  }
}
