class Gun extends GameObject{
  constructor(){
    const tex= getTex(weapon.texture);
    super(new Vector3(1200/2-tex.width/2,1600/2-tex.height/2,1),new Size(tex.width,tex.height));
    this.setTexture(tex);
    this.OnUpdate = true;
    this.dir = weapon.dir;
    this.Reload = 1;
    window.P = this;
    BeginLevel();
  }

  Shoot(){
    if(this.Reload > 0 || this.am < 1) return;
    this.Reload = 1;
    this.ready = Math.min(this.am, weapon.shop);

    Shoot();
    const shoot_interval = weapon['shoot_interval'];
    let interval = shoot_interval;
    let tempAmmo = this.am;
    for(let i = 0; i < weapon.shop - 1 && tempAmmo > 0; i++){
      setTimeout(Shoot, interval);
      tempAmmo--;
      interval+=shoot_interval;
    }
  }

  StartReload(){
    this.dir = weapon.kick;
    const r= weapon['reload_time'];
    if(r==null) this.Reload = 0;
    else{
      this.Reload = 2;
      setTimeout(function(){
        P.Reload = 0;
      },weapon.reload_time);
    }
  }

  Update(){
    this.Rotate += this.dir;

    let abs = Math.abs(this.dir);
    if(abs > 0.2){
      abs -= 0.1;
      this.dir = this.dir < 0 ? -abs : abs;
    }

    if(AnyMouseDown || isKeyDown){
      this.Shoot();
      AnyMouseDown = false;
      isKeyDown = false;
    }
  }

  get ammo(){
    return this.am;
  }

  get max_ammo(){
    return this.ma;
  }

  set ammo(value){
    hudset(value,this.ma);
    this.am = value;
  }

  set max_ammo(value){
    hudset(value,value);
    this.am = value;
    this.ma = value;
  }

  OnWeaponChanged(){
    const tex= getTex(weapon.texture);
    this.pos = new Vector3(1200/2-tex.width/2,1600/2-tex.height/2,1);
    this.size = new Size(tex.width,tex.height);
    this.setTexture(tex);
    this.dir = weapon.dir;
  }
}
