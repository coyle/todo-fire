var
  React = require('react'),
  ListContainer = require('./ListContainer'),
  AddList = require('./AddList');

var App = React.createClass({
  getInitialState: function() {
    return ({
      lists: []
    })
  },

  addNewList: function(name) {
    var
      list = {
        listName: name,
        index: this.state.lists.length
      };

    this.setState({
      lists: this.state.lists.concat([list])
    });
  },

  removeList: function(index) {
    var newLists = this.state.lists;
    
    newLists.splice(index, 1);

    this.setState({
      lists: newLists
    });
  },

  render: function() {
    var componentList = this.state.lists.map(function(item) {
      console.log(item);
      return (
        <ListContainer title={item.listName} index={item.index} remove={this.removeList}/>
      )
    }.bind(this));

    return (
      <div className="container">
        <div className="row">
          <AddList add={this.addNewList}/>
          {componentList}
        </div>
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)