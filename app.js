//    38
// 37    39       32       click
//    40

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var SPACE = 32;
var OPTIONS = [LEFT, UP, RIGHT, DOWN, SPACE];
var SPEED = 1000;
var EFFECTSPEED = 500;
var playing = false;
var gameStarted = false;

$(function() {
	var playStack = [];
	var roundStack = [];
	var score = 0;

	startGame = function() {
		console.log('Start Game');		
		gameStarted = true;
		playStack = [];
		newStatus('');
		score = 0;
		newRound();
		newScore();
		console.log(playStack);
		playRound();
	};

	gameOver = function() {
		console.log('Game Over');
		newStatus('Game Over');
		gameStarted = false;
	}

	newRound = function() {
		// get new values
		var newValues = getRandowmOptions(1);
		// add to the stack
		for(i=0;i<newValues.length;i++) {
			playStack.push(newValues[i])
		}
		// reset round stack
		roundStack = [];
	}

	playRound = function(){
		playing = true;
		last = false;
		for(i=0;i<playStack.length;i++){
			if(i == playStack.length - 1){
				last = true;
			}
			selectKey(i, last);
		}		
	};

	newStatus = function(text) {
		$('#status').text(text);
	}

	newScore = function() {
		$('#score').text(score);
	}

	selectKey = function(index, last){		
		setTimeout(function(){
			playKey(OPTIONS[playStack[index]]);
			if(last) {
				playing = false;
			}
		}, index*SPEED);
	}

	playKey = function(key){
		switch(key){
			case LEFT: keyAreaPressed('red'); purr(); return;
			case UP: keyAreaPressed('yellow'); frog(); return;
			case RIGHT: keyAreaPressed('green'); basso(); return;
			case DOWN: keyAreaPressed('orange'); glass(); return;
			case SPACE: keyAreaPressed('black'); ping(); return;
		}
	};
	
	checkKey = function(key) {
		switch(key){
			case LEFT: return true;
			case UP: return true;
			case RIGHT: return true;
			case DOWN: return true;
			case SPACE: return true;
			default: return false;
		}
	}
	
	pauseComp = function(milis){
		var date = new Date();
		var curDate = null;
		do { curDate = new Date(); }
		while(curDate - date < milis);
	};

	getRandowmOptions = function(number) {
		res = []
		for(i=0;i<number;i++){
			val = Math.floor(Math.random()*OPTIONS.length);
			res.push(val);
		}
		return res;
	};

  keyAreaPressed = function(key) {
		var matcher = '.' + key;
		$(matcher).animate({'opacity':0.2}, EFFECTSPEED, function(){
			$(matcher).animate({'opacity':1}, EFFECTSPEED, function(){});
		});
    return;
  };

	comparekKey = function(key) {
		var pos = roundStack.length;
		var check = OPTIONS[playStack[pos]];
		console.log('checkKey ' + key + ' with ' + check)
		if(check == key) {
			roundStack.push(key);
			// start new round
			if(roundStack.length == playStack.length) {
				newStatus('Well done!!');
				score = score + 1;
				newScore();				
				setTimeout(function(){
					newRound();
					playRound();
					newStatus('');
				}, 3*SPEED);		
			}			
			return true
		} else {
			return false
		}	
		return false
	}

	// *********
	// EVENTS
	// *********

	$('#startGame').click(function(e){
		startGame();
	});

	$(window).keydown(function(e){
		if(!playing){
	    e.stopPropagation();
	    e.preventDefault();
			var key = e.which;
			// check key exists
			if(checkKey(key)) {
				// play key
				playKey(key);
				// check game started
				if(gameStarted){
					if(!comparekKey(key)) {
						gameOver();
					}
				}	
			}
		}
	});

});