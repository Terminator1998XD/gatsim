class Bullet extends GameObject{
  constructor(dir){
    super(new Vector3(P.pos.x,P.pos.y,3),new Size(128 * weapon.bullet_scale,47.5 * weapon.bullet_scale));
    this.setTexture(getTex('guy'));
    this.Rotate = dir;
    const dirX = Math.cos(this.Rotate);
    const dirY = Math.sin(this.Rotate);
    this.pos.x += dirX*100;
    this.pos.y += dirY*100;
    this.OnUpdate = true;
    this.speed = 90;
    this.removeflag = false;
  }

  Update(){

    const center = new Vector2(this.pos.x+this.size.w,this.pos.y+this.size.h);
    let flag = false;
    for(let i = 0; i < enemies.length; i++){
      const e = enemies[i];
      if(e.CheckContact(center)){
          e.bullet = this;
          e.Explode(center);
      }
    }

    const dirX = Math.cos(this.Rotate);
    const dirY = Math.sin(this.Rotate);
    this.pos.x += dirX*this.speed;
    this.pos.y += dirY*this.speed;

    if(this.pos.x < 0 || this.pos.y < 0 || this.pos.x > 1200 || this.pos.y > 1600){
      if(P.am < 1 && enemies.length > 0){
        Lose();
      }
      dim.map.splice(dim.map.indexOf(this),1);
      this.removeflag = true;
    }
  }
}

function Shoot(){
  dim.map.push(new Bullet(P.Rotate));
  PlaySound(weapon.fire);
  P.ammo -= 1;
  P.ready -= 1;
  if(P.ready < 1){
    P.StartReload();
  }
}
