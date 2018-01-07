TIMER_LENGTH = 25;
BREAK_LENGTH = 5;

var TimerType = function(fillStyle, length){
	this.fillStyle = fillStyle;
	this.length = length;
}

var Timer = function(timer_length, break_length, canvas) {
	this.type_timer = new TimerType('#99CC00', timer_length);
	this.type_break = new TimerType('orange', break_length);
	this.timer_length = timer_length;
	this.break_length = break_length;
	this.count = 0;
	this.timer_paused = true;
	//this.break_paused = true;
	this.break = false;
	this.canvas = canvas;
	var self = this;
	var id;
	var clock_radius = 50;
	var each_sec_angle;
	var start_angle = Math.PI / 2;
	var end_angle = Math.PI / 2;
	var center_X = 150;
	var center_Y = 150;
	var inner_rad = 146;
	var outer_rad = inner_rad + 3;
	//var fillStyle = 'black';

	var drawCircle = function() {
		if (self.canvas.getContext) {
			var ctx = self.canvas.getContext("2d");
			ctx.strokeStyle = self.type_timer.fillStyle;
			ctx.beginPath();
			ctx.arc(center_X, center_Y, outer_rad, 0, 2 * Math.PI);
			ctx.stroke();
		}
	}

	var clearCanvas = function() {
		var ctx = self.canvas.getContext("2d");
		ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
		drawCircle();
	};
	
	this.initializeCanvas = function(){
		clearCanvas();
		var remaining = this.type_timer.length;
		var ctx = self.canvas.getContext("2d");
		ctx.font = "30px Comic Sans MS";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText("Remaining: \n" + remaining, self.canvas.width / 2, self.canvas.height / 2);
		
		//console.log(self);
		drawCircle();
		console.log("initialize called");
	}  

	this.reset = function(){
		self.count = 0;
		self.initializeCanvas();
		clearInterval(id);
		self.break = false;
	}

	this.withinCircle = function(mousePos) {
		return (mousePos.x - center_X) * (mousePos.x - center_X) -
			(mousePos.y - center_Y) * (mousePos.x - center_Y) <
			inner_rad * inner_rad;
	};

	this.draw = function() {
		var fillStyle;
		if(self.break){
			remaining = self.type_break.length - self.count;
			fillStyle = self.type_break.fillStyle;
			if (self.count >= self.type_break.length) {
				clearInterval(id);
				clearCanvas();
				self.break = false;
				self.count = 0;
				self.startTimer();
				return;
			}			 
		}else {
			remaining = self.type_timer.length - self.count;
			fillStyle = self.type_timer.fillStyle;
			console.log(self.count);
			if (self.count >= self.type_timer.length) {
				clearInterval(id);
				clearCanvas();
				self.break = true;
				self.count = 0;
				self.startTimer();
				return;
			}			 
		}
		self.count++;

		start_angle += each_sec_angle / 2;
		end_angle -= each_sec_angle / 2;

		if (canvas.getContext) {
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = '#333333';
			ctx.rect(0, 0, canvas.width, canvas.height);
			ctx.fill();
			drawCircle(self);
			ctx.fillStyle = fillStyle;
			ctx.beginPath();
			ctx.arc(center_X, center_Y, inner_rad, start_angle, end_angle, true);
			ctx.fill();

			ctx.font = "30px Comic Sans MS";
			ctx.fillStyle = "red";
			ctx.textAlign = "center";
			ctx.fillText("Remaining: \n" + remaining, canvas.width / 2, canvas.height / 2);
		}
	}

	this.startTimer = function() {
		self.count = 0;
		start_angle = Math.PI / 2;
		end_angle = Math.PI / 2; 
		console.log("timer: "+ self.type_timer.length);
		console.log("break: "+ self.type_break.length); 
		if(self.break){
			each_sec_angle = 2.0 * Math.PI / self.type_break.length;
		}else{
			each_sec_angle = 2.0 * Math.PI / self.type_timer.length;
		}
		self.timer_paused = false;
		//var self = this;
		id = setInterval(function() {
			self.draw();
		}, 1000);
	}

	this.pauseTimer = function() {
		if (!self.timer_paused) {
			clearInterval(id);
			self.timer_paused = true;
		} else {
			//var self = this;
			id = setInterval(function() {
				self.draw();
			}, 1000);
			self.timer_paused = false;
		}
	}
	
};

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
		return {
			x: Math.floor((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
			y: Math.floor((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
	};
};



$(document).ready(function() {

	var canvas = document.getElementById("canvas");
	var myTimer = new Timer(TIMER_LENGTH*60, BREAK_LENGTH*60, canvas);
	myTimer.initializeCanvas();
	
	$("#canvas").click(function(evt) {
		console.log("click fired!"+evt);
		var mousePos = getMousePos(canvas, evt);
		if (myTimer.withinCircle(mousePos)) {
			if(myTimer.count==0){
				myTimer.startTimer();
			}else{
				myTimer.pauseTimer();
			}			
		}
	});

	$("#break-length").html(BREAK_LENGTH);
	$("#break-length-minus").click(function() {
		var val = parseInt($("#break-length").html());
		$("#break-length").html(val - 1);
		myTimer.type_break.length = (val - 1)*60;
		myTimer.reset();		
	});

	$("#break-length-plus").click(function() {
		var val = parseInt($("#break-length").html());
		$("#break-length").html(val + 1);
		myTimer.type_break.length = (val + 1)*60;
		myTimer.reset();
		
	});
	
	$("#timer-length").html(TIMER_LENGTH);
	$("#timer-length-minus").click(function() {
		var val = parseInt($("#timer-length").html());
		$("#timer-length").html(val - 1);
		myTimer.type_timer.length = (val - 1)*60;
		myTimer.reset();
	});

	$("#timer-length-plus").click(function() {
		var val = parseInt($("#timer-length").html());
		$("#timer-length").html(val + 1);
		myTimer.type_timer.length = (val + 1)*60;
		myTimer.reset();
	});

});
