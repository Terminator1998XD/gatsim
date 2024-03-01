var __localisationTexts__ = {
  "ru":{
    res:'У вас закончились патроны',
    reborn: "Последний шанс",
    scm: "Умножить очки x2",
    adv:"за рекламу",
    on: "Вкл.",off: "Выкл.",
    mus: "Музыка", snd: "Звуки"
  },
  "en":{
    res:'Youre out of ammo',
    scm:"Multiply points x2",
    adv:"for viewing ads",
    reborn:"Second life",
    on: "On",off: "Off",
    mus: "Music", snd: "Sounds"
  }
}

function TXT(id){
  return __localisationTexts__[lang][id];
}

function hideTexts(){
  $('[translate]').hide();
}

function translateBlocks(){

  if(translateBlocks.flag){
    $('[translate]').each(function() {
      $(this).attr('translate_ru',$(this).html());
    });
    translateBlocks.flag = false;
  }

    $('[translate]').each(function() {
      const value = $(this).attr(lang == 'ru' ? 'translate_ru':'translate');
      $(this).html(value);
    $(this).show();
  });
}

translateBlocks.flag = true;

function setlang(l){
  window.lang = l;
  translateBlocks();
  scoreTxt = TXT('score');
  AddScore(0);
  localStorage['savelang'] = l;
}
