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
      opacity: [0.5, 0.5],
      duration: 700,
     
      easing: "easeOutExpo",
      offset: "-=875",
      delay: function(el, i, l) {
        return 80 * (l - i);
      }
    });

//--------tooltip--------------------
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});