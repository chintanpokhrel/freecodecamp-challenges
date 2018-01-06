var TEST=false;

var Player = function(){
	this.game = new Game();
	
	var that = this;
	
	this.startBtnPress = function(){
		that.game.start();
	}

	this.colorBtnPress = function(color){
		that.game.pressButton(color);
	}	

	this.strictBtnPress = function(strict_flag){
		//that.game.start("strict");
		that.game.setStrict(strict_flag);
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
	var strict = false;
	
	this.start = function(){
		if(!on){
			return;
		}
		that.steps = [];
		that.cur = 0;
		addDelay();
		nextLevel();
		
	}

	this.restart = this.start;

	this.switchOff = function(){
		on = false;
		timeoutqueue.empty();
	}

	this.switchOn = function(){
		on = true;
	}

	this.setStrict = function(is_strict){
		strict = is_strict;
		that.steps = [];
		that.cur = 0;
		updateCurSteps(0);
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
			glowImmediate(color_code);

			if((that.cur+1) >= that.max_steps ){
				glowAll();
				//win
			}else if(that.cur >= (that.steps.length-1)){
				addDelay();
				nextLevel();
			}else{
				nextStep();
			}
		}else{
			updateCurSteps("!!");
			glowImmediateExtraDelay(color_code); 
			//updateCurSteps(0);
			if(strict){
				that.restart();
			}else{

				glowSteps();
			}

		}	
	}

	var reset = function(){
		that.steps = [];
		that.cur = 0;
	}

	var nextLevel = function(){
		//1. Get a random color
		var next_color = Math.floor(4*(Math.random()) + 1);;
		that.steps.push(next_color);
		that.cur = 0
		glowSteps();
		//updateCurSteps(that.steps.length);
		
	}
	

	var glowSteps = function(){
		that.cur = 0;	
		//timeoutqueue.empty();
		for(var i=0; i<that.steps.length; ++i){
			glowQueued(that.steps[i]);	
		}
	}


	var glowImmediate = function(color_code){
		var btn_id = getBtnId(color_code);
		glow(btn_id);
		playAudio(btn_id);
	}

	var glowImmediateExtraDelay = function(color_code){
		glowImmediate(color_code);
		addDelay();
	}

	var addDelay = function(){
		timeoutqueue.enqueue({callback: function(arg){
			return;
		}, context: ""});

	}

	var glowQueued = function(color_code){
		var _btn_id = getBtnId(color_code);
		
		timeoutqueue.enqueue({callback: function(args){
			glow(args.btn_id);
			playAudio(args.btn_id);
			updateCurSteps(that.steps.length);
		}, context: {btn_id: _btn_id}});
	}

	var glowQueuedExtraDelay = function(){
		glowQueued(color_code);
		addDelay();
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

function glowAll(times=5){
	timeoutqueue.empty();
	var btn_ids = [ "blue", "green", "yellow", "red"];
	var blue = document.getElementById("blue");
	var green = document.getElementById("green");
	var yellow = document.getElementById("yellow");
	var red = document.getElementById("red");	
		
	var win_panel = document.getElementById("win-panel");
	var switch_panel = document.getElementById("switch-panel");

	win_panel.classList.remove("hide");
	switch_panel.classList.add("hide");
	
	function func(){
		blue.classList.add(getGlowClass("blue"));
		green.classList.add(getGlowClass("green"));
		yellow.classList.add(getGlowClass("yellow"));
		red.classList.add(getGlowClass("red"));

		
		timeoutqueue.enqueueBeg({callback: function(){
			blue.classList.remove(getGlowClass("blue"));
			green.classList.remove(getGlowClass("green"));
			yellow.classList.remove(getGlowClass("yellow"));
			red.classList.remove(getGlowClass("red"));
		}, context: ""});
	}

	for(var i = 0; i < times; ++i){
		timeoutqueue.enqueue({callback: func, context: ""});
	}

	timeoutqueue.enqueue({callback: function(){
		win_panel.classList.add("hide");
		switch_panel.classList.remove("hide");
	}, context: ""});
	
}

function attachHandlers(){
	var player = new Player();
	var start_btn = document.getElementById("btnStart");
	var onoff_btn = document.getElementById("btnOnOff");
	var strict_btn =document.getElementById("btnStrict");
	var color1_btn= document.getElementById("blue");
	var color2_btn= document.getElementById("green");
	var color3_btn= document.getElementById("yellow");
	var color4_btn= document.getElementById("red");

	start_btn.addEventListener("click", player.startBtnPress);
	onoff_btn.addEventListener("click", function(){
		player.onOffBtnPress(this.checked);
		if(this.checked){
			document.getElementById("lblOnOff").innerHTML = "On";
		}else{
			document.getElementById("lblOnOff").innerHTML = "Off";
		}
	});
	
	strict_btn.addEventListener("click", function(){
		player.strictBtnPress(this.checked);
		if(this.checked){
			document.getElementById("lblStrict").innerHTML = "Strict On";
		}else{
			document.getElementById("lblStrict").innerHTML = "Strict Off";
		}
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
//glowAll();
