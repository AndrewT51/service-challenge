$(init)
var flag = false;
var reactivate;
function init(){
  var $doc = $(document),
      $container = $('.container')
      $story1 = $('.story1'),
      $story2 = $('<div class="story story2">')
      $police = $('<div class="police">'),
      $fire = $('<div class="fire">'),
      $ambulance = $('<div class="ambulance">'),
      lastScrollTop = 0,
      xPosOfCars = $doc.scrollTop(),
      appended = [],
      $winHeight = $(window).height();

  $doc.on('scroll',movement)
  $(window).resize(movement)

  function movement(event){
    var newScrollTop = $(this).scrollTop(),
        centrePoint = ($(window).width() / 2) - 25;
    if (!appended[0]){
      $story1.append($police)
      $story1.append($fire)
      $story1.append($ambulance)
      appended.push(true) 
    }
    xPosOfCars = $doc.scrollTop();
    yPosOfCar = (($doc.scrollTop() + 1) * 100)/centrePoint;
    
    if (xPosOfCars < centrePoint ){
      $fire.css({'webkit-transform':'translateX('+ xPosOfCars +'px)'})
      $police.css({'webkit-transform':'translateX('+ -xPosOfCars +'px)'})
    }else {
      $fire.css({'webkit-transform':'translateX('+ centrePoint +'px)'})
      $police.css({'webkit-transform':'translateX('+ -centrePoint +'px)'})
    }

    lastScrollTop = newScrollTop;

    if (yPosOfCar <= 100 && yPosOfCar > 10){
      $ambulance.css({
        'webkit-transform':'translateY('+ yPosOfCar +'px) scale('+ (yPosOfCar/25) +')'
      }) 
    }else if (yPosOfCar > 100){
      $ambulance.css({
        'webkit-transform':'translateY('+ 100 +'px) scale('+ 4 +')'
      }) 
    }else {
      $ambulance.css({
        'webkit-transform':'translateY('+ 10 +'px) scale('+ 0.6 +')'
      }) 
    }
 
    if (yPosOfCar >= 100 && (centrePoint <= xPosOfCars)){
      if (!appended[1]){
        $container.append($story2)
        $story2.append('<img class="policeman" src="policeman.png">')
        $story2.append('<img class="ambulanceman" src="paramedic.png">')
        $story2.append('<img class="fireman" src="firewoman.png">')
        appended.push(newScrollTop + $winHeight)
        $story2.css({'position':'absolute','top':newScrollTop + $winHeight}) 
      }
      var story2FromTop = $story2[0].getBoundingClientRect().top
      if (story2FromTop <= 148 && !flag){
        $story2.css({'position':'fixed','top':'148px'})
        reactivate = $(document).scrollTop() -1
        flag = true;
      }
      console.log($(document).scrollTop())
      if (reactivate >= $(document).scrollTop()){
        $story2.css({'position':'absolute','top':appended[1]}) 
        flag = false;
      }
    }
  }

}
