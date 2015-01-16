'use strict';

var $ = require('jquery');

(function(){
	
   var $time = $('.js-time');
   var $date = $('.js-date');
   var $suffix = $('.js-timesuffix');
   var minute = 60000;
	
	if ($time.length) {		
		setTime();	
	}
  
	function setTime(remaining) {
    var nd = new Date();
    var $minute = nd.getMinutes();
    var $hour = nd.getHours();
    var zeroFix = '';
    var $day = nd.getDay();
    var $dateNum = nd.getDate();
    var $month = nd.getMonth();
		
		if ($minute < 10) {
			zeroFix = '0';
		}
		
		$time.text($hour + ":" + zeroFix + $minute);
		
		if ($hour >= 12) {
			$suffix.text('pm');
		}
		else {
			$suffix.text('am');
		}
		
		var remainingTime = 60 - nd.getSeconds();
    
    // date stuff //
    
    var weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];			
    $date.text(weekday[$day] + ", " + $dateNum + " " + month[$month]);
    
    // battery stuff //
  
    var $battery = $('.js-battery');
    var $batteryText = $('.js-btext');
    var $batteryLevel = $('.js-level')
    var $percentageLevel = 100 - Math.round(($hour/24) * 100);

    $batteryLevel.css('height',100 - Math.round(($hour/24) * 100) + '%');
    $batteryText.text(100 - Math.round(($hour/24) * 100).toFixed(0) + '%');
		
    // delayed self-trigger //
    
		setTimeout(function(){
			setTime(remainingTime);
		},remainingTime * 1000);
	}  
	
	// breadcrumb stuff //
	
	var $crumb = $('.js-crumb');
	
	$crumb.on('click',switchCrumb);
	
	function switchCrumb() {
		$crumb.removeClass('activecrumb');
		$(this).addClass('activecrumb');
	}
	
  // on button //
  
  var $onButton = $('.js-onbutton');
  
  $onButton.on('click',toggleActive);
  
  function toggleActive() {
    $('.iphone__screen').toggleClass('inactive');
  }

  // app stuff //

  var $appIcons = $('.js-app');

  $appIcons.on('click',openApp);

  function openApp() {
  	var $application = '.' + $(this).data('app');
  	if($($application).length) {
  		$('.apps').addClass('appActive');
  		$($application).addClass('activeApp');
  	}  	
  }

  var $homeButton = $('.btn--home');

  $homeButton.on('click',goHome);

  function goHome() {
  	$('.activeApp').removeClass('activeApp');
  	$('.apps').removeClass('appActive');
  	$row.removeClass('playing');
  	$row.removeClass('paused');
  	$audio.prop('src','');
  }

  // music ////////////////////////////////////////////

	  // header bg ////////////////////////////////////////

	  var $bandImg = $('.music__band-img');

	  $bandImg.css('background-image','url(img/richardpetch.jpg)');

	  /////////////////////////////////////////////////////

	  var $musicSearch = $('.js-music-search');

	  $musicSearch.on('click',activateInput);

	  function activateInput() {
	  	$(this).parent().toggleClass('active');
	  	$('input').focus();
	  	$('.music__title').toggleClass('slideDown');
	  }

	  var $row = $('.js-trow');

	  $row.on('click',highlight);

	  function highlight() {
	  	$row.removeClass('highlighted');
	  	$(this).addClass('highlighted');
	  }

	  var audio = $('audio').get(0);
	  var $audio = $('audio');
	  $row.on('dblclick',play);

	  function play() {
	  	$row.removeClass('highlighted').removeClass('playing').removeClass('paused');
	  	$(this).addClass('playing');  	
	  	$audio.prop('src',$(this).data('song'));
	  	audio.play();
	  	playButton();
	  }

	  //////////////////////////////////////////////////////////

	  // play button ////////////////////////////////////////////

	  var $play = $('.js-play-pause');

	  function playButton() {
	  	$play.removeClass('btn--stopped').addClass('btn--playing');
	  }

	  $play.on('click',playControl);

	  function playControl() {
	  	if ($('.playing').length && !$('.paused').length) {
	  		audio.pause();
	  		$('.playing').addClass('paused').removeClass('playing');
	  		$play.removeClass('btn--playing').addClass('btn--stopped');
	  	}
	  	else if ($('.paused').length) {
	  		audio.play();
	  		playButton();
	  		$('.paused').addClass('playing').removeClass('paused');
	  	}
	  	else {
	  		return false;
	  	}
	  }

	  //////////////////////////////////////////////////////////

	  // random button /////////////////////////////////////////

	  var $random = $('.js-random');

	  $random.on('click',randomize);

	  function randomize() {
	  	$random.toggleClass('green');
	  }

	  //////////////////////////////////////////////////////////

	  // repeat button /////////////////////////////////////////

	  var $repeat = $('.js-repeat');

	  $repeat.on('click',repeater);

	  function repeater() {
	  	$repeat.toggleClass('green');
	  }

	  //////////////////////////////////////////////////////////

	  // PREVIOUS BUTTON ///////////////////////////////////////

	  var $previous = $('.js-prev');

	  $previous.on('click',previousTrack);

	  function previousTrack() {
	  	if ($('.playing').length) {
	  		var $currentTrackNumber = $('.playing').index();
	  		if ($currentTrackNumber === 0) {
	  			var $newTrack = $row.eq($row.length - 1);
	  		}
	  		else {
	  			var $newTrack = $row.eq($currentTrackNumber - 1);
	  		}
	  		$row.removeClass('playing');
	  		$newTrack.addClass('playing');
	  		$audio.prop('src',$newTrack.data('song'));
	  		audio.play();
	  	}
	  }

	  //////////////////////////////////////////////////////////

	  // PREVIOUS BUTTON ///////////////////////////////////////

	  var $next = $('.js-next');

	  $next.on('click',nextTrack);

	  function nextTrack() {
	  	if ($('.playing').length) {
	  		var $currentTrackNumber = $('.playing').index();
	  		if ($currentTrackNumber === $row.length - 1) {
	  			var $newTrack = $row.eq(0);
	  		}
	  		else {
	  			var $newTrack = $row.eq($currentTrackNumber + 1);
	  		}
	  		$row.removeClass('playing');
	  		$newTrack.addClass('playing');
	  		$audio.prop('src',$newTrack.data('song'));
	  		audio.play();
	  	}
	  }

	  //////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////
	
}());