var React = require('react');
var MapTracerStore = require('../stores/MapTracerStore');
var MapTracerActions = require('../actions/MapTracerActions');

var DataPanel = React.createClass({
  getInitialState: function () {
    return {
      nodes: MapTracerStore.getNodes(),
      edges: MapTracerStore.getEdges(),
      previousNode: MapTracerStore.getPreviousNode()
    };
  },
  componentDidMount: function () {
    MapTracerStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function () {
    MapTracerStore.removeChangeListener(this._onStoreChange);
  },
  _onStoreChange: function() {
    this.setState({
      nodes: MapTracerStore.getNodes(),
      edges: MapTracerStore.getEdges(),
      previousNode: MapTracerStore.getPreviousNode()
    });
  },
  _onClick: function(previousNode) {
    MapTracerActions.deleteNode(previousNode);
  },
  render: function() {
    var data = "No point selected";
    if (this.state.previousNode) {
      var x = this.state.previousNode.x;
      var y = this.state.previousNode.y;
      data = '(' + x + ", " + y + ")";
    }

    return (
      <div>
        <span>{data}</span>
        <span id="delete" className='icons material-icons' onClick={this._onClick.bind(this, this.state.previousNode)}>delete</span>
      </div>
    );
  }
});

module.exports = DataPanel;
