$(function() {
  $('footer').text(new Date().getFullYear());

  var $targets = $('.about, .portfolio, .findme');

  $(document).on('click', '.h-icon', function() {
    var $this = $(this);

    // Switch active state
    $('.active').removeClass('active');
    $this.addClass('active');

    // Extract target selector and its base position
    var classes = $this.attr('class').split(/\s+/);
    var targetClass = classes[1] ? classes[1].split('-')[2] : '';
    var $targetElem = $('.' + targetClass);

    var targetPosMatch = ($targetElem.attr('class') || '').match(/position(\d+)/);
    var currentPos = targetPosMatch ? parseInt(targetPosMatch[1], 10) : 0;
    var shift = currentPos - 3;

    // Calculate updated position for each panel
    var newPositions = $targets.map(function() {
      var match = ($(this).attr('class') || '').match(/position(\d+)/);
      var pos = match ? parseInt(match[1], 10) : 0;
      return pos - shift;
    }).get();

    // Strip previous position classes and apply new ones
    $targets.removeClass(function(i, css) {
      return (css.match(/\bposition\d+\b/g) || []).join(' ');
    }).each(function(i) {
      $(this).addClass('position' + newPositions[i]);
    });
  });
});