var
  Firebase = require('firebase'),
  React = require('react'),
  AddItem = require('./addItem'),
  List = require('./List'),
  ListContainer;

ListContainer = React.createClass({

  getInitialState: function() {
    return ({
      list: []
    });
  },

  componentDidMount: function() {
    this.firebaseRef = new Firebase('');
    this.firebaseRef.on('child_added', function(snapshot) {
      this.setState({
        list: this.state.list.concat([{key: snapshot.key(), val: snapshot.val()}])
      });
    }.bind(this));

    this.firebaseRef.on('child_removed', function(snapshot) {
      var 
        key = snapshot.key(),

        newList = this.state.list.filter(function(item) {
          return item.key !== key;
        });

        this.setState({
          list: newList
        });
    }.bind(this));
  },

  handleAddItem: function(item) {
    this.firebaseRef.push(item);
  },

  handleRemoveItem: function(index) {
    var
      item = this.state.list[index];

    this.firebaseRef.child(item.key).remove();
  },

  render: function() {
    var
      styles = {
        container: {
          border: "1px solid rgb(208, 208, 208)",
          marginTop: 10,
          marginBottom: 10,
          borderRadius: 5
        },
        remove: {
          top: 15,
          color: "rgb(222, 79, 79)",
          float: "left",
          cursor: 'pointer'
        }
      }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12" style={styles.container}>
              <div
                className="glyphicon glyphicon-remove"
                style={styles.remove}
                onClick={this.props.remove.bind(null, this.props.index)}>
              </div>
            <h3 className="text-center"> {this.props.title} </h3>
            <AddItem add={this.handleAddItem}/>
            <List items={this.state.list.map(function(item){return item.val})} remove={this.handleRemoveItem}/>
          </div>
        </div>
      </div>
    )
  }

});

module.exports = ListContainer;

