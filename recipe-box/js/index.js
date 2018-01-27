var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*Local Storage handling */
var STOR_KEY = "_chintanpokhrel_recipes";
var getRecipesFromStorage = function getRecipesFromStorage() {
  var arr = [];
  if (typeof Storage !== "undefined") {
    var data = localStorage.getItem(STOR_KEY);
    arr = data && JSON.parse(data);
    if (!arr) {
      arr = [];
    }
  }
  return arr;
};

var storeRecipes = function storeRecipes(arr) {
  if (typeof Storage !== "undefined") {
    localStorage.setItem(STOR_KEY, JSON.stringify(arr));
  }
};
/*Local Storage handling end*/

/*React Components*/
/********************************
1. App - top level component, stateful
2. Recipes - stateless
        ----- Recipe - stateless
3. AddDialog - dialog to add new recipe/update existing one - stateless
********************************/

/*top level stateful component */

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

    arr = getRecipesFromStorage();

    _this.state = {
      recipes: arr,
      visibility: "",
      curItem: "",
      curIngreds: "",
      dialogTitle: "Add a Recipe"
    };
    return _this;
  }

  _createClass(App, [{
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
      storeRecipes(arr);

      this.setState({
        //visibility: "hidden",
        recipes: arr
      });
      closeDialog();
    }
  }, {
    key: "handleOpenDialog",
    value: function handleOpenDialog() {
      this.setState({
        //visibility: "shown",
        curItem: "",
        curIngreds: ""
      });
      openDialog();
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      closeDialog();
      /*
      this.setState({
        visibility: "hidden"
      });*/
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
        //visibility: "shown",
        curItem: recipe.item,
        curIngreds: recipe.ingredients
      });
      openDialog();
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(recipe) {
      var pos = this.state.recipes.findIndex(function (el) {
        return el.item.toLowerCase() == recipe.item.toLowerCase();
      });

      var arr = this.state.recipes.concat();
      arr.splice(pos, 1);

      storeRecipes(arr);

      this.setState({
        //visibility: "hidden",
        recipes: arr
      });
      closeDialog();
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
          { onClick: this.handleOpenDialog, className: "add-recipe" },
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
          "li",
          { key: i },
          ingredList[i]
        ));
      }
      return React.createElement(
        "div",
        { className: "recipe" },
        React.createElement(
          "h3",
          { onClick: handleRecipeClick },
          this.props.item
        ),
        React.createElement(
          "div",
          { className: "item-detail hidden" },
          React.createElement(
            "h4",
            null,
            "Ingredients"
          ),
          React.createElement(
            "ul",
            null,
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
        { className: "dialog", id: "dialog" },
        React.createElement(
          "div",
          { className: "dialog-content" },
          React.createElement(
            "span",
            { className: "close", id: "btn-close" },
            "\xD7"
          ),
          React.createElement(
            "h4",
            null,
            this.props.dialogTitle
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { "for": "recipe_name" },
              "Name"
            ),
            React.createElement("input", {
              type: "text",
              id: "recipe_name",
              placeholder: "Recipe Name",
              onChange: this.props.curItemChanged,
              value: this.props.curItem
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { "for": "ingredients" },
              "Ingredients"
            ),
            React.createElement("input", {
              type: "text",
              id: "ingredients",
              placeholder: "Ingredients, separated, by, commas",
              onChange: this.props.curIngredsChanged,
              value: this.props.curIngreds
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { onClick: this.props.handleSave, id: "btn-save" },
              "Save"
            )
          )
        )
      );
    }
  }]);

  return AddDialog;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("container"));

/*Styling*/
function handleRecipeClick(event) {
  event.target.nextSibling.classList.toggle("hidden");
  var recipeDetail = document.querySelectorAll(".item-detail");
  for (var i = 0; i < recipeDetail.length; ++i) {
    if (event.target.nextSibling !== recipeDetail[i]) {
      recipeDetail[i].classList.add("hidden");
    }
  }
}

/*dialog handling*/
function closeDialog() {
  document.getElementById("dialog").style.display = "none";
}

function openDialog() {
  document.getElementById("dialog").style.display = "block";
}

document.getElementById("btn-close").onclick = function () {
  closeDialog();
};

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("dialog")) {
    closeDialog();
  }
});

/*dialog handling end*/
/*Styling end*/