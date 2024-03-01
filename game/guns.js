const guns = [
  {
    texture: 'gat',
    shop: 1,//патронов за раз
    fire: 'gat_fire',
    kick: -1.2,
    bullet_scale: 1,
    dir: 0.1
  },
  {
    texture: 'AK47',
    shop: 3,//патронов за раз
    fire: 'ak_fire',
    kick: -1.2,
    bullet_scale: 0.4,
    reload_time: 500,
    shoot_interval: 100,
    dir: 0.1
  },
  {
    texture: 'AK74',
    shop: 3,//патронов за раз
    fire: 'ak_fire',
    kick: -1.2,
    bullet_scale: 0.4,
    reload_time: 500,
    shoot_interval: 100,
    dir: -0.1
  },
  {
    texture: 'ump',
    shop: 3,//патронов за раз
    fire: 'mp5_fire',
    kick: -0.9,
    bullet_scale: 0.4,
    reload_time: 500,
    shoot_interval: 50,
    dir: 0.1
  },
  {
    texture: 'smg',
    shop: 3,//патронов за раз
    fire: 'mp5_fire',
    kick: -0.9,
    bullet_scale: 0.4,
    reload_time: 500,
    shoot_interval: 50,
    dir: -0.1
  },
  {
    texture: 'm16',
    shop: 3,//патронов за раз
    fire: 'm16',
    kick: -0.9,
    bullet_scale: 0.4,
    reload_time: 500,
    shoot_interval: 50,
    dir: -0.1
  }
];

var weapon = guns[2];
