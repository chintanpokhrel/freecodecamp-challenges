var calc_string=[];

var ac=function(){
  calc_string=[];
  //console.log("AC called "+calc_string);
  display();
  //clear screen
};

var ce=function(){
  //calc_string=calc_string.pop();
  calc_string=[];
  display();
};

var percent=function(){
  if(!check_operator()&&check_length()){
   calc_string.push("%");
    display();
  }
};

var divide=function(){
  if(!check_operator()&&check_length()){
    calc_string.push("/"); 
    display();
  }
};

var check_length=function(){
  if(calc_string.length>=12){
    return false;
  }
  return true;
};

var insert = function(num){
  var l = calc_string.length;
  if(l>0 &&check_length()&& calc_string[l-1].match("[0-9]")){
    console.log("Line 33: matched");
    calc_string[l-1] = calc_string[l-1].concat(num);
  }else if(check_length()){
    //console.log("Line 42: Pushing data");
      calc_string.push(num);
  }
  //console.log("Line 33: calc_string: " + calc_string);
};

var display = function(){
  var screen=document.getElementById("screen");
  screen.innerHTML = "<br><br><br>";
  for(var i=0; i<calc_string.length; ++i){
    screen.innerHTML+=calc_string[i];
  }
  if(calc_string.length==0){
    screen.innerHTML+="<br>";
  }
};

var seven=function(){
  insert("7");
  //console.log("Seven called"+calc_string[0]);
  display();
};

var eight=function(){
  insert("8");
  display();
};

var nine=function(){
  insert("9");
  display();
};

var multiply=function(){
  if(!check_operator()){
    calc_string.push("*"); 
    display();
  }
};

var four=function(){
  insert("4");
  display();
};

var five=function(){
  insert("5");
  display();
};

var six=function(){
  insert("6");
  display();
};

var minus=function(){
  if(!check_operator()&&check_length()){
    calc_string.push("-"); 
    display();
  }
};

var one=function(){
  insert("1");
  display();
};

var two=function(){
  insert("2");
  display();
};

var three=function(){
  insert("3");
  display();
};

var plus=function(){
  //console.log("Line 113: calc_string: "+ calc_string);
  if(!check_operator()&&check_length()){
    calc_string.push("+"); 
    display();
  }
};

var zero=function(){
  insert("0");
  display();
};

var dot=function(){
  if(!check_operator()){
    calc_string[calc_string.length-1] = calc_string[calc_string.length-1].concat("."); 
    display();
  }
};

var equals=function(){
  var result=0;
  var left = parseFloat(calc_string[0]);
  //console.log("line 104: left "+ left);
  var right = 0;
  for(var i=1; i<calc_string.length; i+=2){
    if(!calc_string[i].match("\d+(\.\d)?")){
      right = parseFloat(calc_string[i+1]);
      //console.log("line 109: right: "+ right);
      switch(calc_string[i]){
      case "+":
        //console.log("line 112 Case match");
        left += right; break;
      case "-":
        left -= right; break;
      case "*":
        left *= right; break;
      case "/":
        left /= right; break;
      case "%":
        left %= right; break;
    }
    }
  }
  //console.log("Result="+left);
  calc_string=[];
  calc_string.push(""+left);
  display();
};

var check_operator=function(){
  return calc_string[calc_string.length-1].match("\W");
};