//= require jquery
//= require_tree .
//= require jquery.flatshadow.min
//= require bootstrap-sprockets

hljs.initHighlightingOnLoad();

$(".flat-icon").flatshadow({
  color: "#2bbbad", // Background color of elements inside. (Color will be random if left unassigned)
  angle: "SE", // Shadows direction. Available options: N, NE, E, SE, S, SW, W and NW. (Angle will be random if left unassigned)
  fade: true, // Gradient shadow effect
  // boxShadow: "#d7cfb9" // Color of the Container's shadow
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
      button.classList.remove("hvr-underline-reveal");
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
// make svg image clickable
// $(window).load(function () {
//   var a = document.getElementById("migrant-img");
//   var b = document.getElementById("accredited-img")
//   var svgDocA = a.contentDocument; //get the inner DOM of user.svg
//   var svgDocB = b.contentDocument;
//   var clickA = svgDocA.getElementById("Layer_1"); //get the inner element by id
//   var clickb = svgDocB.getElementById("Layer_1"); //get the inner element by id
//   clickA.addEventListener("mousedown",function(){$(".action.migrant").trigger('click')},false);
//   clickb.addEventListener("mousedown",function(){$(".action.accredited").trigger('click')},false);
// });
$(".action.migrant").on("click", function(){
  if ( !(this.classList.contains("on")) ) {
    this.classList.add("on");
    $(".action.accredited").removeClass("on");
    $(".action.accredited").addClass("hvr-grow").addClass("hvr-underline-reveal");
    toggleShow($('.action'))
  }
})
$(".action.accredited").on("click", function(){
  if ( !(this.classList.contains("on")) ) {
    this.classList.add("on");
    $(".action.migrant").removeClass("on");
    $(".action.migrant").addClass("hvr-grow").addClass("hvr-underline-reveal");
    toggleShow($('.action'))
  }
})

// Animation for info section using scrollMagic
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave'
  }
});


// Animation for intro.erb

// For mobile view
// detect if mobile browser. regex -> http://detectmobilebrowsers.com
var isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


var timeline = new TimelineLite();

var brain = TweenMax.fromTo("#brain", 1.5,
                // {left: -100},
                // {left: 100, repeat: -1, yoyo: true, ease: Circ.easeInOut},
                {width:0, top:200, left:150}, {width: (isMobile ? 250 : 300 ), top:0, left:10}
              );
var squiggles = TweenMax.fromTo("#squiggles", 2,
                {width:0, top:200, left:150},
                {width: (isMobile ? 250 : 300 ), top:0, left:10}
                );

var banner = TweenMax.fromTo("#banner", 2,
                  {width:0, top:100, left: 150},
                  {width: (isMobile ? 250 : 300 ), top:0, left: 10}
                );

var question = TweenMax.to(".question", 1,
                  {className: "+=fadeInRight"}
                );

var subtext = TweenMax.fromTo(".intro-subtext", 1,
                {opacity:0},
                {className: "+=fadeInRight"}
                );

var face = TweenMax.fromTo("#face", 1,
              {opacity:0},
              {opacity:1, width: (isMobile ? 250 : 300 )}
              );



// we'd only like to use iScroll for mobile...
if (isMobile) {
  var scene = new ScrollMagic.Scene({
        triggerElement: "#description",
        duration: 600,    // the scene should last for a scroll distance of 100px
        pushFollowers: false
    })
    .setTween(timeline
      .insert(subtext,1)
      .add(face,3)
      .add(brain,4)
      .add(banner)
      .add(squiggles)
      .insert(question,8)
    )
    // .setPin("#pin") // pins the element for the the scene's duration
    // .addIndicators() // add indicators (requires plugin)
    .addTo(controller); // assign the scene to the controller

} else {
  var scene = new ScrollMagic.Scene({
          triggerElement: "#description",
          duration: 600,    // the scene should last for a scroll distance of 100px
          pushFollowers: false
      })
      .setTween(timeline
        .insert(subtext,1)
        .add(face,3)
        .add(brain,4)
        .add(banner)
        .add(squiggles)
        .insert(question,8)
      )
      .setPin("#pin") // pins the element for the the scene's duration
      // .addIndicators() // add indicators (requires plugin)
      .addTo(controller); // assign the scene to the controller
}


// Animation for story scene
var controllerStory = new ScrollMagic.Controller();

var tweenOne = TweenMax.staggerFromTo(".img", 2,
  {opacity:0},
  {className:"+=bounceIn", ease: Back.easeOut},
  2
  );


var sceneStory = new ScrollMagic.Scene({
        triggerElement: "#story",
        duration: 300,    // the scene should last for a scroll distance of 100px
        // offset: 150,
        pushFollowers: false
    })
    .setTween(tweenOne)
    // .setPin(".story-cartoon") // pins the element for the the scene's duration
    // .addIndicators() // add indicators (requires plugin)
    .addTo(controllerStory); // assign the scene to the controller