var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var app_class = {
	border: "2px solid black",
	minHeight: "90vh",
	width: "100%",
	maxHeight: "100vh",
	overflow: "auto"
};

var editor_class = {
	width: "45%",
	maxWidth: "100vw",
	minWidth: "300px",
	minHeight: "70vh",
	float: "left",
	display: "flex",
	clear: "both",
	padding: "5px"
};

var textarea_class = {
	width: "100%",
	WebkitBoxSizing: "border-box", /* Safari/Chrome, other WebKit */
	MozBoxSizing: "border-box", /* Firefox, other Gecko */
	BoxSizing: "border-box",
	flex: 1
};

var previewer_class = {
	float: "left",
	width: "45%",
	minWidth: "300px",
	padding: "5px",
	display: "block"
};

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			inputText: ""
		};
		_this.handleChange = _this.handleChange.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: "handleChange",
		value: function handleChange(event) {
			this.setState({
				inputText: event.target.value
			});
		}
	}, {
		key: "render",
		value: function render() {
			var markedText = marked(this.state.inputText);

			return React.createElement(
				"div",
				{ style: app_class },
				React.createElement(Editor, { handleChange: this.handleChange }),
				React.createElement(Previewer, { input: markedText })
			);
		}
	}]);

	return App;
}(React.Component);

;

var Editor = function (_React$Component2) {
	_inherits(Editor, _React$Component2);

	function Editor(props) {
		_classCallCheck(this, Editor);

		return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));
	}

	_createClass(Editor, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ style: editor_class },
				React.createElement("textarea", { style: textarea_class, onChange: this.props.handleChange }),
				" "
			);
		}
	}]);

	return Editor;
}(React.Component);

;

var Previewer = function (_React$Component3) {
	_inherits(Previewer, _React$Component3);

	function Previewer(props) {
		_classCallCheck(this, Previewer);

		return _possibleConstructorReturn(this, (Previewer.__proto__ || Object.getPrototypeOf(Previewer)).call(this, props));
	}

	_createClass(Previewer, [{
		key: "render",
		value: function render() {
			return React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.input }, style: previewer_class });
		}
	}]);

	return Previewer;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));