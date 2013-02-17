$('.h-icon').click(function(){
  var activeState = $(this).html().split(' ').join('').toLowerCase();
  $('.h-icon').removeClass('active');
  $(this).addClass('active');
  $('.position').removeClass(function (index, css) {
    return (css.match (/\bposition[0-9]$/g) || []).join(' ');
  });
  if (activeState === 'about') {
    $('.about').addClass('position3');
    $('.blogs').addClass('position4');
    $('.portfolio').addClass('position5');
    $('.findme').addClass('position6');
  } else if (activeState === 'blog') {
    $('.about').addClass('position2');
    $('.blogs').addClass('position3');
    $('.portfolio').addClass('position4');
    $('.findme').addClass('position5');
  } else if (activeState === 'portfolio') {
    $('.about').addClass('position1');
    $('.blogs').addClass('position2');
    $('.portfolio').addClass('position3');
    $('.findme').addClass('position4');
  } else if (activeState === 'findme') {
    $('.about').addClass('position0');
    $('.blogs').addClass('position1');
    $('.portfolio').addClass('position2');
    $('.findme').addClass('position3');
  } else {
//  raise some error here, because you darn broke my website
//  console.log('Error: can\'t place' + activeState);
  }
})