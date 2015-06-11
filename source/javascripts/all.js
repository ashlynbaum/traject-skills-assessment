//= require_tree .
//= require jquery
//= require bootstrap-sprockets

// carousel
$('.carousel').carousel({
  interval: 15000
});
// Highlight navbar elements on page
$('body').scrollspy({ target: '#myScrollspy', offset: 50 });

// Smooth Scroll
$(function() {
  $('.navbar a, .jumbotron a').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 500);
        return false;
      }
    }
  });
});

// Affix nav bar
$('#myScrollspy').affix({
  offset: { top: 250 }
});

$('#myScrollspy').on('affix-top.bs.affix', function() {
  $('#myScrollspy').addClass('transparent');
  $('#myScrollspy').removeClass('navbar-inverse');
  $('#myScrollspy').removeClass('navbar-default');
  $('#myScrollspy collapse').removeClass('navbar-inverse');
  $('#myScrollspy navbar-right').removeClass('navbar-inverse');
});
$('#myScrollspy').on('affix.bs.affix', function() {
  $('#myScrollspy').removeClass('transparent');
  $('#myScrollspy').addClass('navbar-inverse');
  $('#myScrollspy').addClass('navbar-default');
  $('#myScrollspy collapse').addClass('navbar-inverse');
  $('#myScrollspy navbar-right').addClass('navbar-inverse');
});
if ($('div').offset().top > 250) {
  $('#myScrollspy').removeClass('transparent');
  $('#myScrollspy').addClass('navbar-inverse');
  $('#myScrollspy').addClass('navbar-default');
  $('#myScrollspy collapse').addClass('navbar-inverse');
  $('#myScrollspy navbar-right').addClass('navbar-inverse');
}

// Automatic load of blog listing with next and previous links
var loadPage = function(element) {
  $(document).on('click', element, function(e) {
    e.preventDefault();
    var link = $(element).attr('href');
    $('#blog').load(link + ' #blog', function() {
      $('#blog .col-md-8').css({ opacity: 0 } );
      $('#blog .col-md-8').animate({ opacity: 1 }, 'slow;' );
    });
  });
};
loadPage('a.next-page');
loadPage('a.prev-page');

// Animate portfolio
$('#portfolio').find('.item').hover(
  function() {
    $(this).find('img').removeClass('animate-out').addClass('animate-shrink');
    $(this).find('h2').removeClass('animate-out').addClass('animate-grow-large');
  }, function() {
    $(this).find('img').addClass('animate-out').removeClass('animate-shrink');
    $(this).find('h2').addClass('animate-out').removeClass('animate-grow-large');
  }
);

// Animate Education
$(window).scroll(function() {
  $('#education').find('img').each(function() {
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    var bottomOfWindow = $(window).scrollTop() + $(window).height();
    if (imagePos < topOfWindow + 600) {
      $(this).addClass('animated swing');
      $(this).closest('.row').find('.uni').addClass('animated pulse');
    }
    if (imagePos < topOfWindow || imagePos > bottomOfWindow ) {
      $(this).removeClass('animated swing');
      $(this).closest('.row').find('.uni').removeClass('animated pulse');
    }
  });
});

