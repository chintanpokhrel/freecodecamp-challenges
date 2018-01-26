var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STOR_KEY = "_chintanpokhrel_recipes";

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    var arr = [];

    _this.handleOpenDialog = _this.handleOpenDialog.bind(_this);
    _this.handleSave = _this.handleSave.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);
    _this.curItemChanged = _this.curItemChanged.bind(_this);
    _this.curIngredsChanged = _this.curIngredsChanged.bind(_this);
    _this.handleEdit = _this.handleEdit.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    _this.storeRecipes = _this.storeRecipes.bind(_this);
    _this.getRecipesFromStorage = _this.getRecipesFromStorage.bind(_this);

    arr = _this.getRecipesFromStorage();

    _this.state = {
      recipes: arr,
      visibility: "hidden",
      curItem: "",
      curIngreds: "",
      dialogTitle: "Add a Recipe"
    };
    return _this;
  }

  _createClass(App, [{
    key: "storeRecipes",
    value: function storeRecipes(arr) {
      console.log(JSON.stringify(arr));
      console.log(arr);
      if (typeof Storage !== "undefined") {
        localStorage.setItem(STOR_KEY, JSON.stringify(arr));
      }
    }
  }, {
    key: "getRecipesFromStorage",
    value: function getRecipesFromStorage() {
      var arr = [];
      if (typeof Storage !== "undefined") {
        var data = localStorage.getItem(STOR_KEY);
        if (!data) {
          arr = [];
        } else {
          arr = JSON.parse(data);
        }
      }
      return arr;
    }
  }, {
    key: "handleSave",
    value: function handleSave() {
      var _this2 = this;

      //Allow user to add a recipe
      var arr = this.state.recipes.concat();
      //Find if the item is already in the list, if no, add, otherwise update
      var pos = arr.findIndex(function (el) {
        return el.item.toLowerCase() == _this2.state.curItem.toLowerCase();
      });
      if (pos == -1) {
        arr.push({
          item: this.state.curItem,
          ingredients: this.state.curIngreds
        });
      } else {
        arr[pos].ingredients = this.state.curIngreds;
      }

      //Save item in local storage
      this.storeRecipes(arr);
      console.log(arr);

      this.setState({
        visibility: "hidden",
        recipes: arr
      });
    }
  }, {
    key: "handleOpenDialog",
    value: function handleOpenDialog() {
      this.setState({
        visibility: "shown",
        curItem: "",
        curIngreds: ""
      });
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        visibility: "hidden"
      });
    }
  }, {
    key: "curItemChanged",
    value: function curItemChanged(evt) {
      this.setState({
        curItem: evt.target.value
      });
    }
  }, {
    key: "curIngredsChanged",
    value: function curIngredsChanged(evt) {
      this.setState({
        curIngreds: evt.target.value
      });
    }
  }, {
    key: "handleEdit",
    value: function handleEdit(recipe) {
      this.setState({
        visibility: "shown",
        curItem: recipe.item,
        curIngreds: recipe.ingredients
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(recipe) {
      var pos = this.state.recipes.findIndex(function (el) {
        return el.item.toLowerCase() == recipe.item.toLowerCase();
      });

      var arr = this.state.recipes.concat();
      arr.splice(pos, 1);

      this.storeRecipes(arr);

      this.setState({
        visibility: "hidden",
        recipes: arr
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Recipes, {
          recipes: this.state.recipes,
          handleEdit: this.handleEdit,
          handleDelete: this.handleDelete
        }),
        React.createElement(
          "button",
          { onClick: this.handleOpenDialog },
          "Add Recipe"
        ),
        React.createElement(AddDialog, {
          visibility: this.state.visibility,
          handleSave: this.handleSave,
          handleClose: this.handleClose,
          curItemChanged: this.curItemChanged,
          curIngredsChanged: this.curIngredsChanged,
          curItem: this.state.curItem,
          curIngreds: this.state.curIngreds,
          dialogTitle: this.state.dialogTitle
        })
      );
    }
  }]);

  return App;
}(React.Component);

var Recipes = function (_React$Component2) {
  _inherits(Recipes, _React$Component2);

  function Recipes(props) {
    _classCallCheck(this, Recipes);

    return _possibleConstructorReturn(this, (Recipes.__proto__ || Object.getPrototypeOf(Recipes)).call(this, props));
  }

  _createClass(Recipes, [{
    key: "render",
    value: function render() {
      var recipes = [];
      for (var i = 0; i < this.props.recipes.length; ++i) {
        var item = this.props.recipes[i].item;
        var ingredients = this.props.recipes[i].ingredients;
        recipes.push(React.createElement(Recipe, {
          item: item,
          ingredients: ingredients,
          handleEdit: this.props.handleEdit,
          handleDelete: this.props.handleDelete
        }));
      }
      return React.createElement(
        "div",
        null,
        recipes
      );
    }
  }]);

  return Recipes;
}(React.Component);

var Recipe = function (_React$Component3) {
  _inherits(Recipe, _React$Component3);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this4 = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

    _this4.handleEdit = _this4.handleEdit.bind(_this4);
    _this4.handleDelete = _this4.handleDelete.bind(_this4);
    return _this4;
  }

  _createClass(Recipe, [{
    key: "handleEdit",
    value: function handleEdit() {
      this.props.handleEdit({
        item: this.props.item,
        ingredients: this.props.ingredients
      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete() {
      this.props.handleDelete({
        item: this.props.item,
        ingredients: this.props.ingredients
      });
    }
  }, {
    key: "render",
    value: function render() {
      var ingredList = this.props.ingredients.split(",");
      var ingredJSX = [];
      for (var i = 0; i < ingredList.length; ++i) {
        ingredJSX.push(React.createElement(
          "p",
          { key: i },
          ingredList[i]
        ));
      }
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            this.props.item
          ),
          ingredJSX
        ),
        React.createElement(
          "button",
          { onClick: this.handleEdit },
          "Edit"
        ),
        React.createElement(
          "button",
          { onClick: this.handleDelete },
          "Delete"
        )
      );
    }
  }]);

  return Recipe;
}(React.Component);

var AddDialog = function (_React$Component4) {
  _inherits(AddDialog, _React$Component4);

  function AddDialog(props) {
    _classCallCheck(this, AddDialog);

    return _possibleConstructorReturn(this, (AddDialog.__proto__ || Object.getPrototypeOf(AddDialog)).call(this, props));
  }

  _createClass(AddDialog, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: this.props.visibility },
        React.createElement(
          "h4",
          null,
          this.props.dialogTitle
        ),
        React.createElement("label", { "for": "recipe_name" }),
        React.createElement("input", {
          type: "text",
          id: "recipe_name",
          placeholder: "Recipe Name",
          onChange: this.props.curItemChanged,
          value: this.props.curItem
        }),
        React.createElement("label", { "for": "ingredients" }),
        React.createElement("textarea", {
          id: "ingredients",
          placeholder: "Enter, ingredients, separated, by, commas",
          onChange: this.props.curIngredsChanged,
          value: this.props.curIngreds
        }),
        React.createElement(
          "button",
          { onClick: this.props.handleSave },
          "Save"
        ),
        React.createElement(
          "button",
          { onClick: this.props.handleClose },
          "Close"
        )
      );
    }
  }]);

  return AddDialog;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));