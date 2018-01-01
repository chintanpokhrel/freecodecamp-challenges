var TEST=false;

var Colors = {
	BLUE: 1,
	GREEN: 2,
	YELLOW: 3,
	RED: 4,
	properties: {
		1: { name: "BLUE" },
		2: { name: "GREEN"  },
		3: { name: "YELLOW" },
		4: { name: "RED" }
	}
};


var Player = function(){
	this.game = new Game();
	
	var that = this;
	
	this.startBtnPress = function(){
		that.game.start();
	}

	this.colorBtnPress = function(color){
		that.game.pressButton(color);
	}	

	this.strictBtnPress = function(){
		that.game.start("strict");
	}

	this.onOffBtnPress = function(on_flag){
		if(on_flag){
			that.game.switchOn();
		}else{
			that.game.switchOff();
		}
	}
};

var timeoutqueue = new TimeoutQueue(500);

var Game = function(){
	this.steps = [];
	
	this.cur = -1;

	this.max_steps = 20;
	
	var that = this;	
	
	var on = false;
	
	this.start = function(start_mode="default"){
		if(!on){
			return;
		}
		that.steps = [];
		that.cur = 0;
		nextLevel();
	}

	this.switchOff = function(){
		on = false;
		timeoutqueue.empty();
	}

	this.switchOn = function(){
		on = true;
	}
	
	this.pressButton = function(color_code){
		if(!on){
			return;
		}

		if(that.cur <0){
			return;
		}
		timeoutqueue.empty();
	
		if(checkStep(color_code)){
			//correct press
			glowStep(color_code);
			if(that.cur >= that.max_steps){
				//win
			}else if(that.cur >= (that.steps.length-1)){
				nextLevel();
			}else{
				nextStep();
			}
		}else{
			updateCurSteps("!!");
			timeoutqueue.empty();	
			glowStep(color_code, true); //request some extra delay step
			glowSteps();
		}	
	}

	var nextLevel = function(){
		//1. Get a random color
		var next_color = Math.floor(4*(Math.random()) + 1);;
		that.steps.push(next_color);
		that.cur = 0
		glowSteps();
		updateCurSteps(that.steps.length);
		
	}
	

	var glowSteps = function(){
		that.cur = 0;	
		for(var i=0; i<that.steps.length; ++i){
			glowStep(that.steps[i]);	
		}
	}

	//glow and play audio
	var glowStep = function(color_code, with_extra_delay=false){
		var _btn_id = getBtnId(color_code);
		
		timeoutqueue.enqueue({callback: function(args){
			glow(args.btn_id);
			playAudio(args.btn_id);
			updateCurSteps(that.steps.length);
		}, context: {btn_id: _btn_id}});

		if(with_extra_delay){//for some more delay, dummy func call
			timeoutqueue.enqueueBeg({callback: function(arg){
				return;
			}, context: ""}); 	
		}

	}

	var checkStep = function(color_code){	
		if (that.steps[that.cur] == color_code){
			return true;
		}	
		else{
			return false;
		}
	}
	
	var nextStep = function(){
		that.cur += 1;	
	}
};

function getBtnId(color_code){
	if(TEST){
		console.log("Color code: " + color_code);
	}
	switch(color_code){
	case 1:
		return "blue";
	case 2:
		return "green";
	case 3:
		return "yellow";
	case 4:
		return "red";
	}
	//return "btnColor"+color_code;
}

var audios = {
	blue: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", 
	green: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", 
	yellow: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", 
	red: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
};

function getAudioId(color_code){
	switch(color_code){
	case 1:
		return "blue";	
	case 2:
		return "green";
	case 3:
		return "yellow";
	case 4:
		return "red";	
	}
}

function getGlowClass(color){
	return "glow-"+color; 
}

function glow(btn_id){
	if(TEST){
		console.log(btn_id);
	}
	var btn = document.getElementById(btn_id);
	btn.classList.add(getGlowClass(btn_id));

	timeoutqueue.enqueueBeg({callback: function(btn_id){
		btn.classList.remove(getGlowClass(btn_id)); 
	}, context: btn_id});
	
}

function playAudio(btn_id){
	var audio_url = audios[btn_id];
	var audio = new Audio(audio_url);
	audio.play();
}

function updateCurSteps(cur_steps){
	var cur_steps_label = document.getElementById("cur-steps");
	cur_steps_label.innerHTML = cur_steps;
}

function attachHandlers(){
	var player = new Player();
	var start_btn = document.getElementById("btnStart");
	var onoff_btn = document.getElementById("btnOnOff");

	var color1_btn= document.getElementById("blue");
	var color2_btn= document.getElementById("green");
	var color3_btn= document.getElementById("yellow");
	var color4_btn= document.getElementById("red");

	start_btn.addEventListener("click", player.startBtnPress);
	onoff_btn.addEventListener("click", function(){
		player.onOffBtnPress(this.checked);
	});
	
	color1_btn.addEventListener("click", function(){
			player.colorBtnPress(1)
		}
	);
	color2_btn.addEventListener("click", function(){
			player.colorBtnPress(2);
		}
	);
	color3_btn.addEventListener("click", function(){
			player.colorBtnPress(3);
		}
	);
	color4_btn.addEventListener("click", function(){
			player.colorBtnPress(4);
		}
	);

}

attachHandlers();

