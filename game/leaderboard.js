function updlb(){
  let xp = score;
  let rec = localStorage['record777'];

  if(rec == null){
    localStorage['record777'] = xp;
    rec = xp;
  }else {
    rec = parseInt(rec);

    if(xp > rec){
      rec = xp;
      localStorage['record777'] = xp;
    }
  }

  $('.crecord').html(parseInt(xp));
  $('.record').html(parseInt(rec));
}
