$('.h-icon').click(function(){
  var a = 'active',
    c = 'class',
    p = 'position',
    s = ['.about', '.blog', '.portfolio', '.findme'],
    gr = function(x,i){
    return $(x).attr(c).split(' ')[i];
  }
  $('.'+a).removeClass(a);
  $(this).addClass(a);
  cC = gr($(this), 1).split('-')[2];
  cP = gr('.' + cC, 2)[8] - 3;
  var nP = s.map(function(x){
    return gr($(x), 2)[8] - cP;
  });
  $('.' + p).removeClass(function(x, css) {
    return (css.match (/\bposition[0-9]$/g) || []).join(' ');
  });
  s.map(function(x, i){
    $(x).addClass(p + nP[i])
  });
});