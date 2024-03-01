class Particle extends GameObject{
  constructor(pos,color, size){
    super(new Vector3(pos.x,pos.y,1), new Size(size,size));
    this.a = 1;
    this.dir = new Vector2(0,0);
    this.r = color[0];
    this.g = color[1];
    this.b = color[2];
    effects_push(this);
  }

  OnRender(rect){
    this.a -= 0.029;

    if(isMobile){
      g.save();
      g.shadowColor = 'rgba(0, 0, 0, 0)';
    }
    g.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    g.fillRect(rect.x, rect.y, rect.w, rect.h);

    if(isMobile){
      g.restore();
    }

    if(this.a < 0.03){
      effects_remove(this);
      return true;
    }

    return false;
  }

  Update(){
    const pos = this.pos;
    const x = pos.x + this.dx;
    const y = pos.y + this.dy;

    if(x < 0 || y < 0 || x > 1200 || y > 1600){
      effects_remove(this);
      return;
    } else {
      pos.x = x;
      pos.y = y;
      return;
    }
  }
}
