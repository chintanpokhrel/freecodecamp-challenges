var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*Careful with the below two, RECURSION */
var createArray = function createArray(length) {
  var arr = new Array(length || 0);
  var i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) {
      arr[length - i - 1] = createArray.apply(this, args);
    }
  }

  return arr;
};

var cloneArray = function cloneArray(arr) {
  var copy = [];
  if (Array.isArray(arr)) {
    var i = 0;
    while (i < arr.length) {
      copy.push(cloneArray(arr[i++]));
    }
  } else {
    copy = arr;
  }
  return copy;
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      generation: 1,
      m: 30,
      n: 30,
      life: createArray(30, 30),
      interval: 500,
      intervalId: 0,
      running: false
    };
    _this.initArray = _this.initArray.bind(_this);
    _this.applyRules = _this.applyRules.bind(_this);
    _this.countLiveNeighbors = _this.countLiveNeighbors.bind(_this);
    _this.handleStart = _this.handleStart.bind(_this);
    _this.handlePause = _this.handlePause.bind(_this);
    _this.handleClear = _this.handleClear.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleGenerate = _this.handleGenerate.bind(_this);
    _this.handleSpeedChange = _this.handleSpeedChange.bind(_this);
    _this.handleResize = _this.handleResize.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "initArray",
    value: function initArray() {
      var num_fill = 0.3 * this.state.m * this.state.n;
      var life_copy = cloneArray(this.state.life);
      console.log(life_copy[0].length);
      for (var i = 0; i < num_fill; ++i) {
        var j = Math.floor(Math.random() * this.state.m);
        var k = Math.floor(Math.random() * this.state.n);
        life_copy[j][k] = true;
      }

      this.setState({
        life: life_copy
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initArray();
      this.handleStart();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.state.intervalId);
    }
  }, {
    key: "countLiveNeighbors",
    value: function countLiveNeighbors(i, j) {
      //1. Find out the neighbors that exist
      var life = this.state.life;
      var neighbors = 0;
      // Neighbors are normally
      //[i-1][j-1], [i-1][j], [i-1][j+1]
      //[i][j-1],           ,   [i][j+1]
      //[i+1][j-1], [i+1][j], [i+1][j+1]
      var vx = [],
          vy = [];
      var m = this.state.m;
      var n = this.state.n;

      if (i > 0 && i < m - 1) {
        vx.push(i - 1, i, i + 1);
      } else if (i > 0) {
        vx.push(i - 1, i);
      } else if (i < m - 1) {
        vx.push(i, i + 1);
      } else {
        vx.push(i);
      }

      if (j > 0 && j < n - 1) {
        vy.push(j - 1, j, j + 1);
      } else if (j > 0) {
        vy.push(j - 1, j);
      } else if (j < n - 1) {
        vy.push(j, j + 1);
      } else {
        vy.push(j);
      }

      //2. Count how many of them are alive
      for (var x = 0; x < vx.length; ++x) {
        for (var y = 0; y < vy.length; ++y) {
          if (!(vx[x] == i && vy[y] == j)) {
            neighbors += life[vx[x]][vy[y]] ? 1 : 0;
          }
        }
      }

      return neighbors;
    }
  }, {
    key: "applyRules",
    value: function applyRules() {
      /*
      if (this.state.generation == 0) {
        this.initArray();
        this.setState({
          generation: 1
        });
        return;
      }*/

      var life_copy = cloneArray(this.state.life);
      var life = this.state.life;

      for (var i = 0; i < this.state.m; ++i) {
        for (var j = 0; j < this.state.n; ++j) {
          var neighbors = this.countLiveNeighbors(i, j);
          //Overcrowding: if i,j is alive and neighbors > 3 then die due to overcrowding
          if (life[i][j] && neighbors > 3) {
            life_copy[i][j] = false;
          }

          //Isolation: if i, j is alive and neighbors < 2 then die due to isolation
          if (life[i][j] && neighbors < 2) {
            life_copy[i][j] = false;
          }

          //Birth: if i, j is dead but has 3 live neighbors, then take birth
          if (!life[i][j] && neighbors == 3) {
            //console.log(i+" "+j+" "+ neighbors);
            life_copy[i][j] = true;
          }
        }
      }

      this.setState({
        life: life_copy,
        generation: this.state.generation + 1
      });
    }
  }, {
    key: "handleStart",
    value: function handleStart() {
      //if game is off then switch it on
      if (!this.state.running) {
        var intervalId = setInterval(this.applyRules, this.state.interval);
        this.setState({
          intervalId: intervalId,
          running: true
        });
      }
    }
  }, {
    key: "handlePause",
    value: function handlePause() {
      if (this.state.running) {
        clearInterval(this.state.intervalId);
        this.setState({
          running: false
        });
      }
    }
  }, {
    key: "handleClear",
    value: function handleClear() {
      clearInterval(this.state.intervalId);
      this.setState({
        running: false,
        life: createArray(this.state.m, this.state.n),
        intervalId: 0,
        generation: 0
      });
    }

    //unused

  }, {
    key: "handleGenerate",
    value: function handleGenerate() {
      this.handleClear();
      this.initArray();
      this.handleStart();
    }
  }, {
    key: "handleClick",
    value: function handleClick(i, j) {
      var life_copy = cloneArray(this.state.life);
      life_copy[i][j] = !life_copy[i][j];
      this.setState({
        life: life_copy
      });
    }
  }, {
    key: "handleSpeedChange",
    value: function handleSpeedChange(value) {
      console.log("Triggering!");
      clearInterval(this.state.intervalId);
      if (this.state.running) {
        var intervalId = setInterval(this.applyRules, value);
        this.setState({
          interval: value,
          intervalId: intervalId
        });
      } else {
        this.setState({
          interval: value
        });
      }
    }
  }, {
    key: "handleResize",
    value: function handleResize(m, n) {
      this.handleClear();
      var arr = createArray(m, n);

      this.setState({
        m: m,
        n: n
      });
    }
  }, {
    key: "render",
    value: function render() {
      var rows = [];
      for (var i = 0; i < this.state.m; ++i) {
        var cols = [];
        rows.push([]);
        for (var j = 0; j < this.state.n; ++j) {
          cols.push(React.createElement(Cell, { life: this.state.life[i][j], handleClick: this.handleClick, i: i, j: j }));
        }
        rows[i] = React.createElement(
          "tr",
          null,
          cols
        );
      }
      return React.createElement(
        "div",
        null,
        React.createElement(TopPanel, { handleStart: this.handleStart, handlePause: this.handlePause, handleClear: this.handleClear, generation: this.state.generation }),
        React.createElement(
          "table",
          null,
          rows
        ),
        React.createElement(BottomPanel, { speed: this.state.interval, handleSpeedChange: this.handleSpeedChange, m: this.state.m, n: this.state.n, handleResize: this.handleResize })
      );
    }
  }]);

  return App;
}(React.Component);

var TopPanel = function (_React$Component2) {
  _inherits(TopPanel, _React$Component2);

  function TopPanel(props) {
    _classCallCheck(this, TopPanel);

    return _possibleConstructorReturn(this, (TopPanel.__proto__ || Object.getPrototypeOf(TopPanel)).call(this, props));
  }

  _createClass(TopPanel, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { onClick: this.props.handleStart },
          "Start"
        ),
        React.createElement(
          "button",
          { onClick: this.props.handlePause },
          "Pause"
        ),
        React.createElement(
          "button",
          { onClick: this.props.handleClear },
          "Clear"
        ),
        React.createElement(
          "label",
          null,
          "Generations: ",
          this.props.generation
        )
      );
    }
  }]);

  return TopPanel;
}(React.Component);

var Cell = function (_React$Component3) {
  _inherits(Cell, _React$Component3);

  function Cell(props) {
    _classCallCheck(this, Cell);

    var _this3 = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, props));

    _this3.handleClick = _this3.handleClick.bind(_this3);
    return _this3;
  }

  _createClass(Cell, [{
    key: "handleClick",
    value: function handleClick() {
      this.props.handleClick(this.props.i, this.props.j);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("td", {
        className: this.props.life ? "alive" : "dead",
        onClick: this.handleClick
      });
    }
  }]);

  return Cell;
}(React.Component);

var BottomPanel = function (_React$Component4) {
  _inherits(BottomPanel, _React$Component4);

  function BottomPanel(props) {
    _classCallCheck(this, BottomPanel);

    return _possibleConstructorReturn(this, (BottomPanel.__proto__ || Object.getPrototypeOf(BottomPanel)).call(this, props));
  }

  _createClass(BottomPanel, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(SpeedController, { speed: this.props.speed, handleClick: this.props.handleSpeedChange })
      );
    }
  }]);

  return BottomPanel;
}(React.Component);

var SizeController = function (_React$Component5) {
  _inherits(SizeController, _React$Component5);

  function SizeController(props) {
    _classCallCheck(this, SizeController);

    var _this5 = _possibleConstructorReturn(this, (SizeController.__proto__ || Object.getPrototypeOf(SizeController)).call(this, props));

    _this5.handleClick = _this5.handleClick.bind(_this5);
    return _this5;
  }

  _createClass(SizeController, [{
    key: "handleClick",
    value: function handleClick(event) {
      var mn = event.target.value.split('x');
      console.log(mn);
      this.props.handleClick(mn[0], mn[1]);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "span",
        { className: "board-size" },
        React.createElement(
          "label",
          { "for": "resize-1" },
          "50x50"
        ),
        React.createElement("input", { type: "radio", id: "resize-1", name: "board-size", value: "50x50", checked: this.props.m + "x" + this.props.n == "50x50", onClick: this.handleClick }),
        React.createElement(
          "label",
          { "for": "resize-2" },
          "40x60"
        ),
        React.createElement("input", { type: "radio", id: "resize-2", name: "board-size", value: "40x60", checked: this.props.m + "x" + this.props.n == "40x60", onClick: this.handleClick }),
        React.createElement(
          "label",
          { "for": "resize-3" },
          "60x70"
        ),
        React.createElement("input", { type: "radio", id: "resize-3", name: "board-size", value: "60x70", checked: this.props.m + "x" + this.props.n == "60x70", onClick: this.handleClick })
      );
    }
  }]);

  return SizeController;
}(React.Component);

var SpeedController = function (_React$Component6) {
  _inherits(SpeedController, _React$Component6);

  function SpeedController(props) {
    _classCallCheck(this, SpeedController);

    var _this6 = _possibleConstructorReturn(this, (SpeedController.__proto__ || Object.getPrototypeOf(SpeedController)).call(this, props));

    _this6.handleClick = _this6.handleClick.bind(_this6);
    return _this6;
  }

  _createClass(SpeedController, [{
    key: "handleClick",
    value: function handleClick(event) {
      this.props.handleClick(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      {/*Speed Controller*/}
      return React.createElement(
        "span",
        { className: "speed" },
        React.createElement(
          "label",
          { "for": "fast" },
          "fast"
        ),
        React.createElement("input", { type: "radio", id: "fast", name: "speed", value: "500", checked: this.props.speed == 500, onClick: this.handleClick }),
        React.createElement(
          "label",
          { "for": "medium" },
          "medium"
        ),
        React.createElement("input", { type: "radio", id: "medium", name: "speed", value: "1000", checked: this.props.speed == 1000, onClick: this.handleClick }),
        React.createElement(
          "label",
          { "for": "resize-3" },
          "slow"
        ),
        React.createElement("input", { type: "radio", id: "slow", name: "speed", value: "1500", checked: this.props.speed == 1500, onClick: this.handleClick })
      );
    }
  }]);

  return SpeedController;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));