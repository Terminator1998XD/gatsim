class Enemy extends GameObject{
  constructor(angle){
    const prot = cur_entypes[getrand(0,cur_entypes.length)];
    const texName = prot.texture;
    const _tex = getTex(texName);
    super(nodes.getByAngle(angle).pos, new Size(_tex.width,_tex.height));
    this.mypuz = Array.from(Enemy.puz(texName));
    this.rempuz = 0;
    this.setTexture(_tex);
    this.sound = prot.sound;
    this.spl = this.mypuz.length;
    this.OnUpdate = true;
    this.angle = angle;
    this.hp = getrand(1,emaxhp);
    this.lastbullet = null;
    this.sspeed = 3;
    this.speed = this.sspeed;
    this.particle = prot['particle'];
  }

  OnRender(rect){
    const puzz = this.mypuz;
    const len = puzz.length;

    if(this.spl == len){
      super.OnRender(rect);
      return;
    }

    const {x,y} = rect;
    g.save();
    g.shadowColor = 'rgba(0, 0, 0, 0)';
    for(let i = 0; i < len; i++){
      const p = puzz[i];
      g.drawImage(p, x + p.x, y + p.y, p.width,p.height);
    }
    g.restore();
  }

  Remove(){
    dim.map.splice(dim.map.indexOf(this),1);
    enemies.splice(enemies.indexOf(this),1);
    AddScore(1);
    if(enemies.length < 1){
       setTimeout(Win,200);
    }
    PlaySound(this.sound);
  }

  Explode(bulletpos){
    if(this.bullet != this.lastbullet){
      const hp = this.hp - 1;
      this.hp = hp;
      this.bullet.speed = 50;
      this.lastbullet = this.bullet;
      this.speed = 0.25;
    }

    const puzz = this.mypuz;
    let len = puzz.length;

    const flg = this.particle != null;
    if(this.hp < 1 || (P.ammo < 1 && enemies.length < 2)){
      this.Remove();
      for(let i = 0; i < len; i++){
        const p = puzz[i];
        const vecpos = new Vector2(this.pos.x + p.x,this.pos.y + p.y);
        new ZBEffect(vecpos,getrand(0,360)*GradToRad,p);
        if(flg){
          const p = new Particle(vecpos,this.particle,16);
          p.dx = getrand(-1,2)*30;
          p.dy = getrand(-1,2)*30;
        }
      }
    } else {
      const l4 = len / 14;
      for(let j = 0; j < l4; j++){
        let dist = 99999;
        let pIndex = -1;
        let myp = null;
        for(let i = 0; i < len; i++){
          const p = puzz[i];
          const cp = new Vector2(this.pos.x+p.x,this.pos.y+p.y);
          const _d = Vector3.Distance(cp,bulletpos);

          if(dist > _d){
            dist = _d;
            pIndex = i;
            myp = p;
          }
        }
        puzz.splice(pIndex,1);
        len--;
        const vecpos = new Vector2(this.pos.x + myp.x,this.pos.y + myp.y);
        new ZBEffect(vecpos,getrand(0,360)*GradToRad,myp);
        this.rempuz++;
        if(flg){
          const p = new Particle(vecpos,this.particle,16);
          p.dx = getrand(-1,2)*30;
          p.dy = getrand(-1,2)*30;
        }
      }
    }
  }

  CheckContact(bulletpos){
    const center = new Vector2(this.pos.x+this.size.w,this.pos.y+this.size.h);
    return Vector3.Distance(center,bulletpos) < 300;
  }

  Update(){
    this.angle += dir ? this.speed: -this.speed;

    if(this.speed != this.sspeed && this.lastbullet != null && this.lastbullet.removeflag){
      this.speed = this.sspeed;
    }

    if(this.angle < 0) this.angle += 360;
    else if(this.angle > 360) this.angle -= 360;

    const n = nodes.getByAngle(this.angle);
    this.pos = new Vector3(n.pos.x,n.pos.y,n.pos.z);
    this.pos.x -= this.size.w/2;
    this.pos.y -= this.size.h/2;
    const next = dir ? n.next : n.prew;

    if(this.particle != null){
      const len = this.rempuz;
      const center = new Vector2(this.pos.x+this.size.w/2,this.pos.y+this.size.h/2);
      for(let i = 0; i < len; i++){
        const p = new Particle(center,this.particle,8);
        p.dx = getrand(-2,2)*15;
        p.dy = getrand(-2,2)*15;
      }
    }

    let rot = Math.atan2(next.y - n.pos.y, next.x - n.pos.x);

    rot = rot < 0 ? 6.28 + rot : rot;

    if (this.Rotate > rot) {
      if (this.Rotate - rot > 3.14) {
        this.Rotate += 0.2;
        if (this.Rotate >= 2 * 3.14) this.Rotate -= 2 * 3.14;
      } else {
        this.Rotate -= 0.2;
        if (this.Rotate < rot) this.Rotate = rot;
      }
    } else if (this.Rotate < rot) {
      if (rot - this.Rotate > 3.14) {
        this.Rotate -= 0.2;
        if (this.Rotate < 0) this.Rotate += 2 * 3.14;
      } else {
        this.Rotate += 0.2;
        if (this.Rotate > rot) this.Rotate = rot;
      }
    }
  }

  static puz_cash = {};

  static puz(texName){
    if(Enemy.puz_cash[texName] != null) return Enemy.puz_cash[texName];

    const tex = getTex(texName);
    const N = 12; // Задайте значение N для разделения изображения на NxN кусочков
    const w = tex.width/N;
    const h = tex.height/N;
    const ret = [];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // Создание канваса для каждого кусочка изображения
        const cnv = document.createElement('canvas');
        cnv.width = w;
        cnv.height = h;
        cnv.x = j*w;
        cnv.y = i*h;
        const ctx = cnv.getContext('2d');
        ctx.drawImage(tex, j * (tex.width / N), i * (tex.height / N), tex.width / N, tex.height / N, 0, 0, w, h);
        ret.push(cnv);
      }
    }

    Enemy.puz_cash[texName] = ret;
    return ret;
  }
}
