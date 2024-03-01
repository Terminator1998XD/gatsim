function Init(){
	if(window['lang'] != null) return;

	window.backgroundTexture = getTex('back');
	window.lang = 'ru';
	window.scoreui = $('#score');
	window._advprompt = [];
	window.score = 0;
	window.scoremul = 1;

	Menu();
	window.P = new Gun();
	window.pathobj = new Path();
	player = [P];
	dim.map = [pathobj, ...dim.map];

	loadBackgroundTrackPosition();

	let rec = localStorage['record777'];

  if(rec != null && rec > 0){
			$('.record').html(parseInt(rec));
	}
	else{
		$('#startGame .record').parent().remove();
	}

	window.isPC = false;
	EngineRun();

	$('.overlay').show();

	hideTexts();
	const queryString = window.location.search.slice(1);
  if (!queryString) {
      return {};
  }

  const paramsArray = queryString.split('&');
  window.paramsObject = {};

  paramsArray.forEach(param => {
      const [key, value] = param.split('=');
      paramsObject[key.toLowerCase()] = value.toLowerCase();
  });

	if (typeof iframeApi === 'undefined') {
			console.log('Cannot find iframeApi function, are we inside an iframe?');
			return;
	}

	iframeApi({
			appid: 33272,
			getLoginStatusCallback: function(status) {},
			userInfoCallback: function(info) {console.log(info);},
			adsCallback: adsCallback
	}).then(function(api){
		window.ysdk = api;
		console.log('VK SDK initialized');
		window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		if(localStorage['savelang'] != null) {
			window.lang = localStorage['savelang'];
		}
		else window.lang = paramsObject.lang == 'ru_ru' ? 'ru' : 'en';//ysdk.environment.i18n.lang;

		$('#scoreblock').show();
		window.isPC = !window.isMobile;
		if(isPC){
			$('body').css({'background-image': 'url("textures/htmlback.jpg")','background-size':'cover'});
			const neonColor = 'rgb(255, 255, 255)'; // Здесь вы можете выбрать цвет неона
			const border = '1px solid white';
			$(canvas).css({
				'box-shadow': `0 0 10px ${neonColor}`,
				'border-left': border,
				'border-right': border
			});
		}

		scoreTxt = TXT('score');
		scoreText = scoreTxt + 0;
		translateBlocks();
		fillSettings();
		resizeCanvas();
	}, function(code){
		console.log(code);
	});
}

function PlayClick(){
	document.getElementById("startGame").remove();
	$('.overlay').hide();
	OnPause = false;
	playMusic();
	setTimeout(function(){
		P.Reload = 0;
	},250);
}

function TogglePause(){
	OnPause = !OnPause;
	saveBackgroundTrackPosition();

	if(OnPause){
		updlb();
		$('.overlay').show(500);
		$('#pausem').show();
	}
	else {
		$('.overlay').hide();
		$('#pausem').hide();
		setTimeout(function(){
			P.Reload = 0;
		},250);
		playMusic();
	}
}

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "hidden") {
		if(!OnPause){
			OnPause = true;
			updlb();
			$('.overlay').show(500);
			$('#pausem').show();
		}
		pauseMusic();
		StopAllSound();
  }
});

function NewGameCallback(){
	$('.overlay').hide();
	$('#deadscr').hide();
	$('#pausem').hide();

	dim.map = [pathobj];
	window.score = 0;
	window.scoremul = 1;
	window._advprompt = [];
	window.P = new Gun();
	player = [P];
	setTimeout(function(){
		P.Reload = 0;
	},250);

	$('#score').text(0);
	OnPause = false;
}

function AddScore(_score){
	score += _score * scoremul;
	scoreui.text(parseInt(score));
}

function NewGame(){
	NewGameCallback();
}

let reslist = [
	'textures/back.png', 'textures/guy.png','textures/path.png',
	'textures/gui_0.png','textures/gui_1.png', 'textures/e.png'
];

function AddTexArr(name, count){
	for(let i = 0; i < count; i++){
		reslist.push('textures/'+name+i+'.png');
	}
}

for(let i = 0; i < guns.length; i++) reslist.push('textures/'+guns[i].texture+'.png');

for(let i = 0; i < entypes.length; i++){
	const et = entypes[i];
	for(let j = 0; j < et.length; j++){
	 reslist.push('textures/'+et[j].texture+'.png');
 	}
 }

function PreInit(){
	resources.load(reslist);
	resources.onReady(Init);
}

document.addEventListener('DOMContentLoaded', function() {
  PreInit();
});
