var dir = true;//true - вперёд, false - назад

function SpawnEnemies(){
  let angle = 30;
  const step = 360/bottles;
  let hp = 0;

  for(let i = 0; i < bottles; i++){
    hp += Spawn(angle).hp;
    angle += step;
  }

  return hp;
}

function BeginLevel(){
  window.bottles = 1;
  window.scoremul = 1;
  window.level = 0;
  window.enemies = [];
  window.emaxhp = 3;
  P.max_ammo = 4;
  SpawnEnemies();
  window.bottles+=1;
}

function Win(){
  window.bottles+=1;
  if(window.bottles > 6) {
     window.bottles = 6;
     window.emaxhp++;
     if(window.emaxhp > 10) window.emaxhp = 10;
  }
  window.scoremul++;
  dir = !dir;
  PlaySound('win');
  let hp = SpawnEnemies();
  P.max_ammo = weapon.shop > 1 ? enemies.length * weapon.shop : hp + 1;
}

function Spawn(a){
  const e = new Enemy(a);
  enemies.push(e);
  dim.addGameObject(e);
  return e;
}

function Lose(){
  effects_length = 0;
  dead_advprompt();
}
