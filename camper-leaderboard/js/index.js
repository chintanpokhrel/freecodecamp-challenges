var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getData(callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      callback(data);
    } else if (this.readyState == 4) {
      callback([]);
    }
  };
  xmlhttp.open("GET", "https://fcctop100.herokuapp.com/api/fccusers/top/recent", true);
  xmlhttp.send();
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      leaders: [],
      sortedBy: ""
    };
    _this.sortByLast30 = _this.sortByLast30.bind(_this);
    _this.sortByAllTime = _this.sortByAllTime.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "sortByLast30",
    value: function sortByLast30() {
      var sorted_leaders = this.state.leaders.concat().sort(function (a, b) {
        return b.recent - a.recent;
      });
      this.setState({
        leaders: sorted_leaders,
        sortedBy: "recent"
      });
    }
  }, {
    key: "sortByAllTime",
    value: function sortByAllTime() {
      var sorted_leaders = this.state.leaders.concat().sort(function (a, b) {
        return b.alltime - a.alltime;
      });
      this.setState({
        leaders: sorted_leaders,
        sortedBy: "alltime"
      });
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var that = this;
      getData(function (data) {
        that.setState({
          leaders: data
        });
        that.sortByLast30();
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "table",
        null,
        React.createElement(Caption, null),
        React.createElement(Header, {
          sortByLast30: this.sortByLast30,
          sortByAllTime: this.sortByAllTime,
          sortedBy: this.state.sortedBy
        }),
        React.createElement(Board, { leaders: this.state.leaders })
      );
    }
  }]);

  return App;
}(React.Component);

var Caption = function (_React$Component2) {
  _inherits(Caption, _React$Component2);

  function Caption(props) {
    _classCallCheck(this, Caption);

    return _possibleConstructorReturn(this, (Caption.__proto__ || Object.getPrototypeOf(Caption)).call(this, props));
  }

  _createClass(Caption, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "caption",
        null,
        React.createElement("i", { className: "fa fa-free-code-camp" }),
        "Camper Leaderboard"
      );
    }
  }]);

  return Caption;
}(React.Component);

var Header = function (_React$Component3) {
  _inherits(Header, _React$Component3);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }

  _createClass(Header, [{
    key: "handleRecentSort",
    value: function handleRecentSort() {}
  }, {
    key: "handleAllTimeSort",
    value: function handleAllTimeSort() {}
  }, {
    key: "render",
    value: function render() {
      var sort_class = "fa fa-sort-desc";
      var recent_class = "";
      var alltime_class = "";
      if (this.props.sortedBy == "recent") {
        recent_class = sort_class;
      } else {
        alltime_class = sort_class;
      }
      return React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "#"
          ),
          React.createElement(
            "th",
            null,
            "Name"
          ),
          React.createElement(
            "th",
            { onClick: this.props.sortByLast30 },
            "Points in last 30 days",
            React.createElement("i", { className: recent_class })
          ),
          React.createElement(
            "th",
            { onClick: this.props.sortByAllTime },
            "All time points",
            React.createElement("i", { className: alltime_class })
          )
        )
      );
    }
  }]);

  return Header;
}(React.Component);

var Board = function (_React$Component4) {
  _inherits(Board, _React$Component4);

  function Board(props) {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));
  }

  _createClass(Board, [{
    key: "render",
    value: function render() {
      var leaders = [];
      for (var i = 0; i < this.props.leaders.length; ++i) {
        var img_src = this.props.leaders[i]["img"];
        var username = this.props.leaders[i]["username"];
        var user_url = "https://freecodecamp.com/" + username;
        var recent_points = this.props.leaders[i]["recent"];
        var alltime_points = this.props.leaders[i]["alltime"];

        var leader = React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            i + 1
          ),
          React.createElement(
            "td",
            null,
            React.createElement("img", { src: img_src, alt: "avatar", className: "avatar" }),
            React.createElement(
              "a",
              { href: user_url, target: "_blank" },
              username
            )
          ),
          React.createElement(
            "td",
            null,
            recent_points
          ),
          React.createElement(
            "td",
            null,
            alltime_points
          )
        );

        leaders.push(leader);
      }
      return React.createElement(
        "tbody",
        null,
        leaders
      );
    }
  }]);

  return Board;
}(React.Component);

var Leader = function (_React$Component5) {
  _inherits(Leader, _React$Component5);

  function Leader(props) {
    _classCallCheck(this, Leader);

    return _possibleConstructorReturn(this, (Leader.__proto__ || Object.getPrototypeOf(Leader)).call(this, props));
  }

  _createClass(Leader, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          this.props.num
        ),
        React.createElement(
          "td",
          null,
          "NameCol"
        ),
        React.createElement(
          "td",
          null,
          "30 days points"
        ),
        React.createElement(
          "td",
          null,
          "All time points"
        )
      );
    }
  }]);

  return Leader;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));