//a tree data structure node
var Node = function(value) {
  this.value = value;
  this.children = [];
  this.parent = null;
  this.setParentNode = function(node) {
    this.parent = node;
  };
  this.getParentNode = function() {
    return this.parent;
  };
  this.addChild = function(node) {
    node.parent = this;
    this.children[this.children.length] = node;
  };

  this.getChildren = function() {
    return this.children;
  };
};

//build the tree consisting of all possible paths
var buildTree = function() {
  var root = new Node(["00"]);

  //level 1
  root.addChild(new Node(["02", "10"]));
  root.addChild(new Node(["02", "20"]));
  root.addChild(new Node(["20", "21"]));
  root.addChild(new Node(["02", "12"]));
  root.addChild(new Node(["20", "01"]));
  root.addChild(new Node(["20", "02"]));
  root.addChild(new Node(["20", "22"]));

  root.addChild(new Node(["20", "02"]));
  root.addChild(new Node(["02", "20"]));
  root.addChild(new Node(["02", "22"]));

  root.addChild(new Node(["22", "11"]));
  //level 2
  var l1_children = root.getChildren();
  l1_children[0].addChild(new Node(["22", "01"]));
  l1_children[0].addChild(new Node(["01"]));

  l1_children[1].addChild(new Node(["22", "01"]));
  l1_children[1].addChild(new Node(["01"]));

  l1_children[2].addChild(new Node(["02", "10"]));
  l1_children[2].addChild(new Node(["10"]));

  l1_children[3].addChild(new Node(["20", "01"]));
  l1_children[3].addChild(new Node(["01"]));

  l1_children[4].addChild(new Node(["22", "10"]));
  l1_children[4].addChild(new Node(["10"]));

  l1_children[5].addChild(new Node(["22", "10"]));
  l1_children[5].addChild(new Node(["10"]));

  l1_children[6].addChild(new Node(["02", "10"]));
  l1_children[6].addChild(new Node(["10"]));

  l1_children[7].addChild(new Node(["22", "10"]));
  l1_children[7].addChild(new Node(["10"]));

  l1_children[8].addChild(new Node(["22", "01"]));
  l1_children[8].addChild(new Node(["01"]));

  l1_children[9].addChild(new Node(["20", "01"]));
  l1_children[9].addChild(new Node(["01"]));

  //corner after center
  l1_children[10].addChild(new Node(["02", "20"]));
  l1_children[10].addChild(new Node(["20", "02"]));

  //edge after center
  l1_children[10].addChild(new Node(["12", "10"]));
  l1_children[10].addChild(new Node(["10", "12"]));
  l1_children[10].addChild(new Node(["01", "21"]));
  l1_children[10].addChild(new Node(["21", "01"]));

  //level 3
  var l2_children = l1_children[0].getChildren();
  l2_children[0].addChild(new Node(["12", "11"]));
  l2_children[0].addChild(new Node(["11", "12"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[1].getChildren();
  l2_children[0].addChild(new Node(["12", "11"]));
  l2_children[0].addChild(new Node(["11", "12"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[2].getChildren();
  l2_children[0].addChild(new Node(["01", "11"]));
  l2_children[0].addChild(new Node(["11", "01"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[3].getChildren();
  l2_children[0].addChild(new Node(["10", "11"]));
  l2_children[0].addChild(new Node(["11", "10"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[4].getChildren();
  l2_children[0].addChild(new Node(["21", "11"]));
  l2_children[0].addChild(new Node(["11", "21"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[5].getChildren();
  l2_children[0].addChild(new Node(["21", "11"]));
  l2_children[0].addChild(new Node(["11", "21"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[6].getChildren();
  l2_children[0].addChild(new Node(["01", "11"]));
  l2_children[0].addChild(new Node(["11", "01"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[7].getChildren();
  l2_children[0].addChild(new Node(["21", "11"]));
  l2_children[0].addChild(new Node(["11", "21"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[8].getChildren();
  l2_children[0].addChild(new Node(["12", "11"]));
  l2_children[0].addChild(new Node(["11", "12"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[9].getChildren();
  l2_children[0].addChild(new Node(["10", "11"]));
  l2_children[0].addChild(new Node(["11", "10"]));
  l2_children[0].addChild(new Node(["11"]));

  l2_children = l1_children[10].getChildren();
  l2_children[0].addChild(new Node(["12", "01"]));
  l2_children[0].addChild(new Node(["01", "12"]));
  l2_children[0].addChild(new Node(["01"]));

  //l2_children = l1_children[11].getChildren();
  l2_children[1].addChild(new Node(["10", "21"]));
  l2_children[1].addChild(new Node(["21", "10"]));
  l2_children[1].addChild(new Node(["21"]));

  //l2_children = l1_children[11].getChildren();
  l2_children[2].addChild(new Node(["20", "02"]));
  l2_children[2].addChild(new Node(["02"]));

  l2_children[3].addChild(new Node(["02", "20"]));
  l2_children[3].addChild(new Node(["20"]));

  l2_children[4].addChild(new Node(["20", "02"]));
  l2_children[4].addChild(new Node(["02"]));

  l2_children[5].addChild(new Node(["02", "20"]));
  l2_children[5].addChild(new Node(["20"]));
  //l2_children[2].addChild(new Node(["21", "10"]));
  //l2_children[2].addChild(new Node(["21"]));

  var l3_children = l1_children[10].getChildren()[2].getChildren();
  l3_children[0].addChild(new Node(["01", "21"]));
  l3_children[0].addChild(new Node(["21", "01"])); //draw

  l3_children = l1_children[10].getChildren()[3].getChildren();
  l3_children[0].addChild(new Node(["21", "01"]));
  l3_children[0].addChild(new Node(["01", "21"]));

  l3_children = l1_children[10].getChildren()[4].getChildren();
  l3_children[0].addChild(new Node(["10", "12"]));
  l3_children[0].addChild(new Node(["12", "10"]));

  l3_children = l1_children[10].getChildren()[5].getChildren();
  l3_children[0].addChild(new Node(["12", "10"]));
  l3_children[0].addChild(new Node(["10", "12"]));

  return root;
}

//build the tree and get the root of the tree as the current position for traversal
var curpos = buildTree();

//update current position in tree
//@param val = the player's move
var updatePosInTree = function(val) {
  var children = curpos.getChildren();
  curpos = null;
  for (var i = 0; i < children.length; ++i) {
    if (children[i].value[1] == val) {
      curpos = children[i];
      break;
    }
  }
  if (!curpos) {
    //console.log("inside else");
    curpos = children[children.length - 1];
  }
}

//return the next move to be played to win/draw
var getMove = function() {
  return curpos.value[0];
}

//A map function to rotate the board so that I can play from any side
var rotateBoard = function(startPos) {
  switch (startPos) {
    case "00":
      return [{
        "00": "00",
        "01": "01",
        "02": "02",
        "10": "10",
        "11": "11",
        "12": "12",
        "20": "20",
        "21": "21",
        "22": "22"
      }, {
        "00": "00",
        "01": "01",
        "02": "02",
        "10": "10",
        "11": "11",
        "12": "12",
        "20": "20",
        "21": "21",
        "22": "22"
      }, ]
      break;
    case "02":
      return [{
        "00": "02",
        "01": "12",
        "02": "22",
        "10": "01",
        "11": "11",
        "12": "21",
        "20": "00",
        "21": "10",
        "22": "20"
      }, {
        "02": "00",
        "12": "01",
        "22": "02",
        "01": "10",
        "11": "11",
        "21": "12",
        "00": "20",
        "10": "21",
        "20": "22"
      }];
      break;
    case "20":
      return [{
        "00": "20",
        "01": "10",
        "02": "00",
        "10": "21",
        "11": "11",
        "12": "01",
        "20": "22",
        "21": "12",
        "22": "02"
      }, {
        "20": "00",
        "10": "01",
        "00": "02",
        "21": "10",
        "11": "11",
        "01": "12",
        "22": "20",
        "12": "21",
        "02": "22"
      }];
      break;
    case "22":
      return [{
        "00": "22",
        "01": "21",
        "02": "20",
        "10": "12",
        "11": "11",
        "12": "10",
        "20": "02",
        "21": "01",
        "22": "00"
      }, {
        "22": "00",
        "21": "01",
        "20": "02",
        "12": "10",
        "11": "11",
        "10": "12",
        "02": "20",
        "01": "21",
        "00": "22"
      }];
  }
}

$(document).ready(function() {

  var game;

  //helper method to add css class
  var addClass = function(divids, css_class) {
    for(var i=0; i<divids.length; ++i){
      $("#" + divids[i]).addClass(css_class, 300);
    }   
  };
  
  //helper method to remove css class
  var removeClass = function(divids, css_class) {
    for(var i=0; i<divids.length; ++i){
      $("#" + divids[i]).removeClass(css_class, 300);
    }
  };
  
  

  //highlight the completed row, col or diag
  var handleHighlightWin = function(add, css_class) {
    var addOrRemoveClass;
    if(add){
      addOrRemoveClass = addClass;
    }else{
      addOrRemoveClass = removeClass;
    }
    var css_class = "win";
    switch (game.board.completed) {
      case "row1":
        addOrRemoveClass(["00", "01", "02"], css_class);
        //toggleClass("00", css_class);
        //toggleClass("01", css_class);
        //toggleClass("02", css_class);
        break;
      case "row2":
        addOrRemoveClass(["10", "11", "12"], css_class);
        //toggleClass("10", css_class);
        //toggleClass("11", css_class);
        //toggleClass("12", css_class);
        break;
      case "row3":
        addOrRemoveClass(["20", "21", "22"], css_class);
        //toggleClass("20", css_class);
        //toggleClass("21", css_class);
        //toggleClass("22", css_class);
        break;
      case "col1":
        addOrRemoveClass(["00", "10", "20"], css_class);
        //toggleClass("00", css_class);
        //toggleClass("10", css_class);
        //toggleClass("20", css_class);
        break;
      case "col2":
        addOrRemoveClass(["01", "11", "21"], css_class);
        //toggleClass("01", css_class);
        //toggleClass("11", css_class);
        //toggleClass("21", css_class);
        break;
      case "col3":
        addOrRemoveClass(["02", "12", "22"], css_class);
        //toggleClass("02", css_class);
        //toggleClass("12", css_class);
        //toggleClass("22", css_class);
        break;
      case "diag1":
        addOrRemoveClass(["00", "11", "22"], css_class);
        //toggleClass("00", css_class);
        //toggleClass("11", css_class);
        //toggleClass("22", css_class);
        break;
      case "diag2":
        addOrRemoveClass(["02", "11", "20"], css_class);
        //toggleClass("02", css_class);
        //toggleClass("11", css_class);
        //toggleClass("20", css_class);
        break;
    }
  };

  var highlightWin = function(){
    handleHighlightWin(true, "win");
  }
  
  var unHighlightWin = function(){
    handleHighlightWin(false, "win");
  }
  
  //highlight all squares in case of a draw
  var highlightDraw = function() {
    var divids = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
    addClass(divids, "draw");
  };
  
  var unHighlightDraw = function(){
    var divids = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
    removeClass(divids, "draw");
  }
  
  //check if a cell is already played
  var isAlreadyClicked = function(i, j) {
    if (game.board.board[i][j] !== 'V') {
      return true;
    }
    return false;
  }

  //update the game board
  var updateBoard = function(who, divID) {

    switch (divID) {
      case "00":
        if (isAlreadyClicked(0, 0)) {
          return false;
        }
        game.board.board[0][0] = who.name;
        $("#00").html(who.name);
        break;
      case "01":
        if (isAlreadyClicked(0, 1)) {
          return false;
        }
        game.board.board[0][1] = who.name;
        $("#01").html(who.name);
        break;
      case "02":
        if (isAlreadyClicked(0, 2)) {
          return false;
        }
        game.board.board[0][2] = who.name;
        $("#02").html(who.name);
        break;
      case "10":
        if (isAlreadyClicked(1, 0)) {
          return false;
        }
        game.board.board[1][0] = who.name;
        $("#10").html(who.name);
        break;
      case "11":
        if (isAlreadyClicked(1, 1)) {
          return false;
        }
        game.board.board[1][1] = who.name;
        $("#11").html(who.name);
        break;
      case "12":
        if (isAlreadyClicked(1, 2)) {
          return false;
        }
        game.board.board[1][2] = who.name;
        $("#12").html(who.name);
        break;
      case "20":
        if (isAlreadyClicked(2, 0)) {
          return false;
        }
        game.board.board[2][0] = who.name;
        $("#20").html(who.name);
        break;
      case "21":
        if (isAlreadyClicked(2, 1)) {
          return false;
        }
        game.board.board[2][1] = who.name;
        $("#21").html(who.name);
        break;
      case "22":
        if (isAlreadyClicked(2, 2)) {
          return false;
        }
        game.board.board[2][2] = who.name;
        $("#22").html(who.name);
        break;
    }
    return true;
  };

  //clean the board before restarting the game
  var clean = function() {
    for (var i = 0; i < game.board.width; ++i) {
      for (var j = 0; j < game.board.height; ++j) {
        game.board.board[i][j] = 'V';
        $("#" + i + "" + j).html("");
      }
    }
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //I can start from any random corner
  var startPos = ["00", "02", "22", "20"];
  var map; // = rotateBoard(startPos[getRandomInt(0, 3)]);

  //start a new game
  var restartGame = function(me, player) {
    if (game) {
      clean();
      curpos = buildTree();
    }
    map = rotateBoard(startPos[getRandomInt(0, 3)]);
    game = new TicTacToe(me, player);

    var move = game.me.play();
    updateBoard(game.me, map[0][move]);
  };

  //player toggle button click handler
  $('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');

    /*if ($(this).find('.btn-primary').size()>0) {
    	$(this).find('.btn').toggleClass('btn-primary');
    }*/
    if ($(this).find('.btn-danger').size() > 0) {
      var player = $(this).find('.btn-danger').html();
      $(this).find('.btn').toggleClass('btn-danger');
      var me;
      if (player == 'O') {
        player = 'O';
        me = 'X';
      } else {
        player = 'X';
        me = 'O';
      }
      //$(this).html(me);
      restartGame(me, player);
    }

    /*if ($(this).find('.btn-success').size()>0) {
    	$(this).find('.btn').toggleClass('btn-success');
    }
    if ($(this).find('.btn-info').size()>0) {
    	$(this).find('.btn').toggleClass('btn-info');
    }*/

    $(this).find('.btn').toggleClass('btn-default');

  });
  
  //game play--triggered when the player clicks on a cell on the game board
  var play = function() {
    var players_move = $(this).prop("id")
    var ifUpdated = updateBoard(game.player, players_move);
    if (!ifUpdated) {
      return false;
    }
    //send move to AI
    updatePosInTree(map[1][players_move]);
    if (game.checkWin()) {
      //won
      game.winner = game.player;
      highlightWin();
      removeClass(["happy-face"], "hide");
      console.log("You Won");
      window.setTimeout(function() {
        unHighlightWin();
        addClass(["happy-face"], "hide");
        restartGame(game.me.name, game.player.name);
      }, 3000);

      return;
    } else if (game.checkDraw()) {
      console.log("Draw!!");
      highlightDraw();
      removeClass(["sad-face"], "hide");
      window.setTimeout(function() {
        unHighlightDraw();
        addClass(["sad-face"], "hide");
        restartGame(game.me.name, game.player.name);
      }, 3000);
    } else {
      var my_move = map[0][game.me.play()];
      console.log(my_move);
      updateBoard(game.me, my_move);
    }
    if (game.checkWin()) {
      //won
      game.winner = game.me;
      highlightWin();
      removeClass(["happy-face"], "hide");
      
      console.log("I Won");
      window.setTimeout(function() {
        unHighlightWin();
        addClass(["happy-face"], "hide");
        restartGame(game.me.name, game.player.name);
      }, 3000);
      return;
    } else if (game.checkDraw()) {
      console.log("Draw!!");
      highlightDraw();
      removeClass(["sad-face"], "hide");
      window.setTimeout(function() {
        unHighlightDraw();
        addClass(["sad-face"], "hide");
        restartGame(game.me.name, game.player.name);
      }, 3000);
    }

  };

  //$("#togglebtn").click(clickedToggleBtn);
  $('#00').click(play);
  $('#01').click(play);
  $('#02').click(play);
  $('#10').click(play);
  $('#11').click(play);
  $('#12').click(play);
  $('#20').click(play);
  $('#21').click(play);
  $('#22').click(play);

  restartGame('X', 'O');

});

//game board object
var Board = function() {
  this.board = [
    ['V', 'V', 'V'],
    ['V', 'V', 'V'],
    ['V', 'V', 'V']
  ];
  this.width = 3;
  this.height = 3;
  this.completed;

  var checkEqual3Num = function(a, b, c) {
    if (a == b && b == c) {
      return true;
    }
    return false;
  };

  this.checkDraw = function() {
    var row1 = this.board[0].indexOf('V') === -1;
    var row2 = this.board[1].indexOf('V') === -1;
    var row3 = this.board[2].indexOf('V') === -1;
    return row1 && row2 && row3;
  };

  this.checkWin = function() {
    var winRow1 = false;
    var winCol1 = false;
    var winDiag1 = false;
    var winRow2 = false;
    var winCol2 = false;
    var winDiag2 = false;
    var winRow3 = false;
    var winCol3 = false;
    if (this.board[0][0] !== 'V') {
      winRow1 = checkEqual3Num(this.board[0][0], this.board[0][1], this.board[0][2]);
      if (winRow1) {
        this.completed = "row1";
        console.log("won row1");
        return true;
      }
      winCol1 = checkEqual3Num(this.board[0][0], this.board[1][0], this.board[2][0]);
      if (winCol1) {
        this.completed = "col1";
        console.log("won col1");
        return true;
      }
      winDiag1 = checkEqual3Num(this.board[0][0], this.board[1][1], this.board[2][2]);
      if (winDiag1) {
        this.completed = "diag1";
        console.log("won diag1");
        return true;
      }
    }
    if (this.board[1][1] !== 'V') {
      winRow2 = checkEqual3Num(this.board[1][0], this.board[1][1], this.board[1][2]);
      if (winRow2) {
        this.completed = "row2";
        console.log("won row2");
        return true;
      }
      winCol2 = checkEqual3Num(this.board[0][1], this.board[1][1], this.board[2][1]);
      if (winCol2) {
        this.completed = "col2";
        console.log("won col2");
        return true;
      }
      winDiag2 = checkEqual3Num(this.board[0][2], this.board[1][1], this.board[2][0]);
      if (winDiag2) {
        this.completed = "diag2";
        console.log("won diag2");
        return true;
      }
    }
    if (this.board[2][2] !== 'V') {
      winRow3 = checkEqual3Num(this.board[2][0], this.board[2][1], this.board[2][2]);
      if (winRow3) {
        this.completed = "row3";
        console.log("won row3");
        return true;
      }
      winCol3 = checkEqual3Num(this.board[0][2], this.board[1][2], this.board[2][2]);
      if (winCol3) {
        this.completed = "col3";
        console.log("won col3");
        return true;
      }
    }

    if (winRow1 || winRow2 || winRow3 || winCol1 || winCol2 || winCol3 || winDiag1 || winDiag2) {
      return true;
    }
    return false;
  };
};

//game object
var TicTacToe = function(me, player) {

  this.board = new Board();
  this.me = new Me(me);
  this.player = new Player(player);
  this.winner;

  this.checkWin = function() {
    return this.board.checkWin();
  };

  this.checkDraw = function() {
    return this.board.checkDraw();
  }
};

//Me - the computer player
var Me = function(name) {
  this.name = name;
  this.play = function() {
    return getMove();
  }
};

//Player - the player who plays against the computer
var Player = function(name) {
  this.name = name;
};