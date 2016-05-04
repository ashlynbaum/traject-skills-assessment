//= require jquery
//= require_tree .
//= require bootstrap-sprockets

hljs.initHighlightingOnLoad();

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
      $(this).addClass('animated pulse');
      $(this).closest('.row').find('.uni').addClass('animated pulse');
    }
    if (imagePos < topOfWindow || imagePos > bottomOfWindow ) {
      $(this).removeClass('animated pulse');
      $(this).closest('.row').find('.uni').removeClass('animated pulse');
    }
  });
  // Animate about
  $('#about').find('a').each(function() {
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    var bottomOfWindow = $(window).scrollTop() + $(window).height();
    if (imagePos < topOfWindow + 600) {
      $(this).addClass('animated bounce');
    }
    if (imagePos < topOfWindow || imagePos > bottomOfWindow ) {
      $(this).removeClass('animated bounce');
    }
  });
  // Animate Contact
    $('#contact').find('.anmt').each(function() {
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    var bottomOfWindow = $(window).scrollTop() + $(window).height();
    if (imagePos < topOfWindow + 600) {
      $(this).addClass('animated shake');
    }
    if (imagePos < topOfWindow || imagePos > bottomOfWindow ) {
      $(this).removeClass('animated shake');
    }
  });
});

// parallax
$('#header').parallax({
  imageSrc: 'images/ocean-teal-1.jpg',
  speed: 0.85,
  naturalWidth: 5760,
  naturalHeight: 3840
});

// $('#action').parallax({
//   imageSrc: 'images/angle-line.svg',
//   speed: 0.9,
//   naturalWidth: 900,
//   naturalHeight: 900,
//   zIndex: 1
//   })

// Show text on toggle button

var toggleShow = function(buttons){
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if (button.classList.contains("on")) {
      button.classList.remove("hvr-grow");
      if (button.classList.contains("migrant")) {
        $('.migrant-text').removeClass('hidden')
        $('.accredited-text').addClass('hidden')
      } else {
        $('.accredited-text').removeClass('hidden')
        $('.migrant-text').addClass('hidden')
      }
    }
  }
};

// toggle accredited migrant buttons
toggleShow($('.action'));
$(window).load(function () {
  //alert("Document loaded, including graphics and embedded documents (like SVG)");
  var a = document.getElementById("migrant-img");
  var b = document.getElementById("accredited-img")
  var svgDocA = a.contentDocument; //get the inner DOM of user.svg
  var svgDocB = b.contentDocument;
  var clickA = svgDocA.getElementById("Layer_1"); //get the inner element by id
  var clickb = svgDocB.getElementById("Layer_1"); //get the inner element by id
  clickA.addEventListener("mousedown",function(){$(".action.migrant").trigger('click')},false);
  clickb.addEventListener("mousedown",function(){$(".action.accredited").trigger('click')},false);
});
$(".action.migrant").on("click", function(){
  if ( !(this.classList.contains("on")) ) {
    this.classList.add("on");
    $(".action.accredited").removeClass("on");
    $(".action.accredited").addClass("hvr-grow");
    toggleShow($('.action'))
  }
})
$(".action.accredited").on("click", function(){
  if ( !(this.classList.contains("on")) ) {
    this.classList.add("on");
    $(".action.migrant").removeClass("on");
    $(".action.migrant").addClass("hvr-grow");
    toggleShow($('.action'))
  }
})
