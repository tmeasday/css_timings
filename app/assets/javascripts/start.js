/*= require jquery */

(function($) {
  var count = 0;
  window.report_timings = function() {
    count += 1;
    $('progress').val(count);
    
    if (count === $('iframe').length) {
      $('.not_ready').show();
    }
  }
}(jQuery));