//= require_tree .
//= require jquery
//= require bootstrap-sprockets


$( document ).ready(function() {
  // carousel
  $('.carousel').carousel({
    interval: 15000
  })

  $('body').scrollspy({ target: '#myScrollspy', offset: 50 })

  // affix nav bar
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
