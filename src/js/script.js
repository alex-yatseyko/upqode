

const slideWrapper = $(".main-slider"),
      mapWrapper = $(".map-slider")
      iframes = slideWrapper.find('.embed-player'),
      lazyImages = slideWrapper.find('.slide-image'),
      lazyCounter = 0;
      hamburger = document.querySelector('.hamburger')
      nav = document.querySelector('.header-nav')
      navLinks = document.querySelector('.header-nav__item')

const cities = ['Los Angeles', 'New York', 'Boston', 'Detroit']
      addresses = ['1171 S Robertson Blvd</br>Los Angeles, CA 90035', '223 E 23rd St</br>New York, NY 10010', '30 Newbury St 3rd Floor</br>Boston, MA 02116', '1001 Woodward Ave</br>Detroit, MI 48226']
      coords = [{lat: 34.055242, lng: -118.383910}, {lat: 40.738833, lng: -73.981523}, {lat: 42.352093, lng: -71.072660}, {lat: 42.332002, lng: -83.047844}]

// Mobile Navigation
hamburger.addEventListener('click', () => {
    nav.classList.toggle("open")
})      

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command){
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control){
  var currentSlide, slideType, startTime, player, video;

  currentSlide = slick.find(".slick-current");
  slideType = currentSlide.attr("class").split(" ")[1];
  player = currentSlide.find("iframe").get(0);
  startTime = currentSlide.data("video-start");

if (slideType === "youtube") {
    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "mute"
        });
        postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
    }
  } else if (slideType === "video") {
    video = currentSlide.children("video").get(0);
    if (video != null) {
      if (control === "play"){
        video.play();
      } else {
        video.pause();
      }
    }
  }
}

// Resize player
function resizePlayer(iframes, ratio) {
  if (!iframes[0]) return;
  var win = $(".main-slider"),
      width = win.width(),
      playerWidth,
      height = win.height(),
      playerHeight,
      ratio = ratio || 16/9;

  iframes.each(function(){
    var current = $(this);
    if (width / ratio < height) {
      playerWidth = Math.ceil(height * ratio);
      current.width(playerWidth).height(height).css({
        left: (width - playerWidth) / 2,
         top: 0
        });
    } else {
      playerHeight = Math.ceil(width / ratio);
      current.width(width).height(playerHeight).css({
        left: 0,
        top: (height - playerHeight) / 2
      });
    }
  });
}

// Scroll to ID
$(".menu-link[href^='#']").click(function(e) {
	e.preventDefault();
	
	var position = $($(this).attr("href")).offset().top;

	$("body, html").animate({
		scrollTop: position
	}, 500 );
});


// DOM Ready
$(function() {

  // Initialize
  slideWrapper.on("init", function(slick){
    slick = $(slick.currentTarget);
    setTimeout(function(){
      playPauseVideo(slick,"play");
    }, 4000);
    resizePlayer(iframes, 16/9);
  });
  slideWrapper.on("beforeChange", function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick,"pause");
  });
  slideWrapper.on("afterChange", function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick,"play");
  });
  slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
    lazyCounter++;
    if (lazyCounter === lazyImages.length){
      lazyImages.addClass('show');
      // slideWrapper.slick("slickPlay");
    }
  });



  // Team Slider

  $('.photos').slick({
    arrows: true,
    infinite:false,
    autoplay:false,
    slidesToShow:1,
    adaptiveHeight: true,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    slidesToScroll:1,
    centerMode: true,
    draggable: false,
    centerMode: true,
    fade: true,
    cssEase: 'ease-in-out',
    touchThreshold: 100
})
$('.next').slick({
    infinite:false,
    autoplay:false,
    slidesToShow:1,
    slidesToScroll:1,
    fade: true,
    arrows: false,
})
$('.prev').slick({
    infinite:false,
    autoplay:false,
    slidesToShow:1,
    slidesToScroll:1,
    fade: true,
    arrows: false
})
$('.next').click(() => {
    $('.next').slick("slickNext")
    $('.prev').slick("slickNext")
})
$('.prev').click(() => {
    $('.next').slick("slickPrev")
    $('.prev').slick("slickPrev")
})




  // Start the slider
  mapWrapper.slick({
    fade:true,
    autoplaySpeed:4000,
    lazyLoad:"progressive",
    speed:600,
    arrows:false,
    dots:true,
    // cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)",
  })

  $('.map-slider .slick-dots li:nth-child(1)').html(`<div class="map-slider__desc"><div class="map-slider__icon"></div><div class="map-slider__city"><p>${cities[0]}, USA</p><p class="map-slider__address">${addresses[0]}</p></div></div>`);
  $('.map-slider .slick-dots li:nth-child(2)').html(`<div class="map-slider__desc"><div class="map-slider__icon"></div><div class="map-slider__city"><p>${cities[1]}, USA</p><p class="map-slider__address">${addresses[1]}</p></div></div>`);
  $('.map-slider .slick-dots li:nth-child(3)').html(`<div class="map-slider__desc"><div class="map-slider__icon"></div><div class="map-slider__city"><p>${cities[2]}, USA</p><p class="map-slider__address">${addresses[2]}</p></div></div>`);
  $('.map-slider .slick-dots li:nth-child(4)').html(`<div class="map-slider__desc"><div class="map-slider__icon"></div><div class="map-slider__city"><p>${cities[3]}, USA</p><p class="map-slider__address">${addresses[3]}</p></div></div>`);

  slideWrapper.slick({
    // fade:true,
    autoplaySpeed:4000,
    lazyLoad:"progressive",
    speed:600,
    arrows:true,
    dots:true,
    cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)",
    prevArrow: $('.slick-prev'),
    nextArrow: $('.slick-next'),
  });
});

// Resize event
$(window).on("resize.slickVideoPlayer", function(){  
  resizePlayer(iframes, 16/9);
});


console.clear();
TweenLite.defaultEase = Linear.easeNone;
const controller = new ScrollMagic.Controller();
const tl = new TimelineMax();
const motionPath = MorphSVGPlugin.pathDataToBezier("#motionPath", {align:"#motionCircleSVG"});
const h = document.querySelector("#motionPath").getBoundingClientRect().height;

TweenMax.set("#motionCircleSVG", {transformOrigin:"center center", xPercent:-50, yPercent:-50})

tl.from('#motionPath', 2,{drawSVG:0});
tl.to("#motionCircleSVG", 2, {bezier:{type:"cubic", values:motionPath}}, 0);

const scene = new ScrollMagic.Scene({
    duration: h,
    triggerHook: 0.1,
})
.triggerElement("#trigger")
// .addIndicators()
.setTween(tl)
.addTo(controller);

// Maps
const mapStyles = [
  {
      "elementType": "geometry",
      "stylers": [
      {
          "color": "#f5f5f5"
      }
      ]
  },
  {
      "elementType": "labels.icon",
      "stylers": [
      {
          "visibility": "off"
      }
      ]
  },
  {
      "elementType": "labels.text.fill",
      "stylers": [
      {
          "color": "#616161"
      }
      ]
  },
  {
      "elementType": "labels.text.stroke",
      "stylers": [
      {
          "color": "#f5f5f5"
      }
      ]
  },
  {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
      {
          "color": "#bdbdbd"
      }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
      {
          "color": "#eeeeee"
      }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
      {
          "color": "#757575"
      }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
      {
          "color": "#e5e5e5"
      }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
      {
          "color": "#9e9e9e"
      }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
      {
          "color": "#ffffff"
      }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
      {
          "color": "#757575"
      }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
      {
          "color": "#dadada"
      }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
      {
          "color": "#616161"
      }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
      {
          "color": "#9e9e9e"
      }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
      {
          "color": "#e5e5e5"
      }
      ]
  },
  {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
      {
          "color": "#eeeeee"
      }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
      {
          "color": "#c9c9c9"
      }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
      {
          "color": "#9e9e9e"
      }
      ]
  }, {
      "featureType": "water",
      "stylers": [
          { "color": "#88eaad",
              "opacity": ".6"
          }
      ]
  },
  ]     
    function initMap() {
      // Icons
      const icons = {
        icon: './img/marker.svg'
      };      
      // The map Los Angeles
      const map1 = new google.maps.Map(
          document.getElementById('map-1'), {
              zoom: 10, 
              center: coords[0], 
              disableDefaultUI: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: mapStyles
          }
      );
      // The marker
      const marker1 = new google.maps.Marker({position: coords[0], map: map1,  icon: icons['icon']});
      // The map New York
      const map2 = new google.maps.Map(
          document.getElementById('map-2'), {
              zoom: 10, 
              center: coords[1], 
              disableDefaultUI: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: mapStyles
          }
      );
      // The marker
      const marker = new google.maps.Marker({position: coords[1], map: map2,  icon: icons['icon']});      
      // The map Boston
      const map3 = new google.maps.Map(
          document.getElementById('map-3'), {
              zoom: 10, 
              center: coords[2], 
              disableDefaultUI: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: mapStyles
          }
      );
      // The marker
      const marker3 = new google.maps.Marker({position: coords[2], map: map3,  icon: icons['icon']});      
      // The map Detroit
      const map4 = new google.maps.Map(
          document.getElementById('map-4'), {
              zoom: 10, 
              center: coords[3], 
              disableDefaultUI: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: mapStyles
          }
      );
      // The marker
      const marker4 = new google.maps.Marker({position: coords[3], map: map4,  icon: icons['icon']});
      }

// TweenMax Animation
