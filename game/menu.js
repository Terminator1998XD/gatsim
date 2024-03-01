function Menu(){
  Menu.weapon = localStorage['weapon'] == null ? 0 : parseInt(localStorage['weapon']);
  Menu.enemy = localStorage['enemy'] == null ? 0 : parseInt(localStorage['enemy']);

  function weaponSwitch(){
    weapon = guns[Menu.weapon];
    $('.gun_image img').attr('src','textures/' + weapon.texture + '.png');
    if(window['P']!=null) P.OnWeaponChanged();
    localStorage['weapon'] = Menu.weapon;
  }

  weaponSwitch();
  cur_entypes = entypes[Menu.enemy];
  $('.enemy_image img').attr('src','textures/' + cur_entypes[0].texture + '.png');

  $('.gun_left').click(function(){
      Menu.weapon--;
      if(Menu.weapon < 0) Menu.weapon = guns.length - 1;
      weaponSwitch();
      PlaySound('weaponswitch');
  });

  $('.gun_right').click(function(){
      Menu.weapon++;
      if(Menu.weapon >= guns.length) Menu.weapon = 0;
      weaponSwitch();
      PlaySound('weaponswitch');
  });

  $('.enemy_left').click(function(){
      Menu.enemy--;
      if(Menu.enemy < 0) Menu.enemy = entypes.length - 1;
      cur_entypes = entypes[Menu.enemy];
      dim.map = [pathobj];
      BeginLevel();
      $('.enemy_image img').attr('src','textures/' + cur_entypes[0].texture + '.png');
      localStorage['enemy'] = Menu.enemy;
      PlaySound('weaponswitch');
  });

  $('.enemy_right').click(function(){
      Menu.enemy++;
      if(Menu.enemy >= entypes.length) Menu.enemy = 0;
      cur_entypes = entypes[Menu.enemy];
      dim.map = [pathobj];
      BeginLevel();
      $('.enemy_image img').attr('src','textures/' + cur_entypes[0].texture + '.png');
      localStorage['enemy'] = Menu.enemy;
      PlaySound('weaponswitch');
  });
}
