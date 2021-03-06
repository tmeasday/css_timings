/*= require jquery */

(function($) {
  var current_callback;
  
  window.report_timings = function(timings) {
    current_callback(timings);
  }
  
  // run a timing test once
  function runTest(name, callback) {
    // open an iframe with the page
    var $iframe = $('<iframe>', {
      src: '/timings/' + name,
    }).css('visibility', 'hidden');
    
    // detach the iframe then run the callback
    current_callback = function(timings) {
      $iframe.detach();
      callback(timings);
    };
    
    // do it
    $('body').append($iframe);
  }
  
  // run the tests n times, return the average parse + render times
  function runTests(name, n, callback) {
    var timings = {parse: 0, render: 0};
    
    function recurse(k) {
      if (k === 0) { // <<- finish 
        timings.parse /= n;
        timings.render /= n;
        return callback(timings);
      }
      
      runTest(name, function(timing) {
        timings.parse += timing.body_start - timing.start;
        timings.render += timing.body_end - timing.body_start;
        
        // next test
        recurse(k-1);
      });
    }
    
    // go for it
    recurse(n);
  }


  $(function() {
    var $experiments = $('#experiments tr[data-experiment]');
    
    function recurseExperiments(n) {
      // done
      if (n > $experiments.length) { return; }
      
      var $row = $experiments.eq(n), name = $row.data('experiment');
      $row.addClass('running');
      runTests(name, 10, function(timings) {
        $row.find('.render').text(timings.render);
        $row.find('.parse').text(timings.parse);
        $row.removeClass('running');
        
        recurseExperiments(n+1);
      });
    }
    
    recurseExperiments(0);
  });
}(jQuery));
