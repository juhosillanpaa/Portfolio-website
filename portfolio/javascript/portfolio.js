var resizeTimer;

$(".myCarousel").Cloud9Carousel({
  buttonLeft: $(".carouselNav > .left"),
  buttonRight: $(".carouselNav > .right"),
  autoPlay: 0,
  bringToFront: true,
  speed: 1,
  yOrigin: 90,
  xRadius: 400,
  yRadius: 100,
  mirror: {
    gap: 12,
    height: 0.2,
    opacity: 0.4
  }
});

//------------------------MAKE CAROUSEL CENTER MOVE WHEN RESIZED WINDOW-
$(window).resize(function(e) {
  clearTimeout(resizeTimer);
  $(".myCarousel").hide();
  resizeTimer = setTimeout(function() {
    var wi = $(window).width();
    wi = wi / 2;
    $(".myCarousel").data("carousel").xOrigin = wi;
    $(".myCarousel").show();
  }, 200);
});

//----------------------ANIMATED TEXT-----------------------------
//http://tobiasahlin.com/moving-letters/#1

// Wrap every letter in a span
$(".ml1 .letters").each(function() {
  $(this).html(
    $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
  );
});

anime
  .timeline({ loop: false })
  .add({
    //text
    targets: ".ml1 .letter",
    scale: [0.3, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 1000,
    delay: function(el, i) {
      return 70 * (i + 1);
    }
  })
  .add({
    //lines
    height: 2,
    targets: ".ml1 .line",
    scaleX: [0, 1],
    opacity: [0.5, 1],
    duration: 700,
    easing: "easeOutExpo",
    offset: "-=875",
    delay: function(el, i, l) {
      return 80 * (l - i);
    },

    complete: function() {
      //fadein the lower text when ready
      $("#jumbotext").css("visibility", "visible");
      $("#jumbotext").css("display", "none");
      $("#jumbotext").fadeIn(500);
    }
  });
//--------------------SPIN CROUSEL WHEN FIRST SAW-----------------------

var waypoint = $(".myCarousel").waypoint({
  handler: function() {
    showCarousel();
    this.destroy();
  },
  context: "#overflow-scroll-offset",
  offset: "50%"
});

function showCarousel() {
  /* slowly set VISIBLE, SPIN the carousal 4 times and set SPEED to 4 */
  
  $(".myCarousel").fadeTo(1000, 1);
  
  setTimeout(function() {
    $(".myCarousel")
      .data("carousel")
      .go(3);
  }, 1000);
  setTimeout(function() {
    $(".myCarousel").data("carousel").speed = 4;
  }, 4000);
}
//----------------------DARKEN images on hover-----------
$(".myCarouselItem").hover(
  function() {
    $(this)
      .find("img")
      .clearQueue();
    $(this)
      .find(".myCarouselItem-text")
      .clearQueue();
    $(this)
      .find("img")
      .fadeTo(500, 0.4);
    $(this)
      .find(".myCarouselItem-text")
      .fadeTo(500, 1);
  },
  function() {
    $(this)
      .find(".myCarouselItem-text")
      .fadeTo(500, 0);
    $(this)
      .find("img")
      .fadeTo(500, 1);
  }
);

//---------------SCROLL-------------------

(function() {
  var delay = false;

  $(document).on("mousewheel DOMMouseScroll", function(event) {
    event.preventDefault();
    if (delay) return;

    delay = true;
    setTimeout(function() {
      delay = false;
    }, 200);

    var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;

    var a = document.getElementsByClassName("anchor");

    if (wd < 0) {
      for (var i = 0; i < a.length; i++) {
        var t = a[i].getClientRects()[0].top;
        if (t >= 40) break;
      }
    } else {
      for (var i = a.length - 1; i >= 0; i--) {
        var t = a[i].getClientRects()[0].top;
        if (t < -20) break;
      }
    }
    if (i >= 0 && i < a.length) {
      $("html,body").animate({
        scrollTop: a[i].offsetTop
      });
    }
  });
})();
