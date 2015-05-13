//= require_tree .
//= require jquery
//= require bootstrap-sprockets


$( document ).ready(function() {
  // carousel
  $('.carousel').carousel({
    interval: 15000
  })
  // Highlight navbar elements on page
  $('body').scrollspy({ target: '#myScrollspy', offset: 50 })

  // Smooth Scroll
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top-50
          }, 500);
          return false;
        }
      }
    });
  });

  // Affix nav bar
  $('#myScrollspy').affix({
    offset: { top: 250 }
  })

  $('#myScrollspy').on('affix-top.bs.affix', function(){
    $('#myScrollspy').addClass('transparent');
    $('#myScrollspy').removeClass('navbar-inverse');
    $('#myScrollspy').removeClass('navbar-default');
    $('#myScrollspy collapse').removeClass('navbar-inverse');
    $('#myScrollspy navbar-right').removeClass('navbar-inverse');
  });
  $('#myScrollspy').on('affix.bs.affix', function(){
      $('#myScrollspy').removeClass('transparent');
      $('#myScrollspy').addClass('navbar-inverse');
      $('#myScrollspy').addClass('navbar-default');
      $('#myScrollspy collapse').addClass('navbar-inverse');
      $('#myScrollspy navbar-right').addClass('navbar-inverse');
  });

});
