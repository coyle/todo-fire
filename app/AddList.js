var
  React = require('react'),
  AddList;

AddList = React.createClass({
  getInitialState: function() {
    return {
      listName: ''
    }
    
  },

  handleChange: function(e) {
    this.setState({
      listName: e.target.value
    });
  },

  handleSubmit: function(e) {
    this.props.add(this.state.listName);
    this.setState({
      listName: ''
    });
  },

  render: function() {
    return (
      <div>
        <h3>Create New List</h3>
        <input type="text" className="form-control" value={this.state.listName} placeholder="List Name" onChange={this.handleChange} />
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
});

module.exports = AddList;