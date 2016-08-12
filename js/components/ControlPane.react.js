var React = require('react');
var MapTracerStore = require('../stores/MapTracerStore');
var MapTracerActions = require('../actions/MapTracerActions');
var MapTracerHelper = require('../services/MapTracerHelper');

function getState() {
  return {
    nodes: MapTracerStore.getNodes(),
    edges: MapTracerStore.getEdges(),
    selectedNode: MapTracerStore.getSelectedNode()
  };
}

var InfoPane = React.createClass({
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function () {
    MapTracerStore.addChangeListener(this._onStoreChange);
  },
  componentWillUnmount: function () {
    MapTracerStore.removeChangeListener(this._onStoreChange);
  },
  _onStoreChange: function() {
    this.setState(getState());
  },
  _onDelete: function(selectedNode) {
    MapTracerActions.deleteNode(selectedNode);
  },
  _onClear: function() {
    MapTracerActions.clearMap();
  },
  render: function() {
    var coordinates = 'Nothing selected =(';
    if (this.state.selectedNode) {
      var x = this.state.selectedNode.x;
      var y = this.state.selectedNode.y;
      coordinates = MapTracerHelper.getCoordinates(x, y)
    }

    return (
      <div>
        <span>{coordinates}</span>
        <span id='delete' className='icons material-icons' onClick={this._onDelete.bind(this, this.state.selectedNode)}>delete</span>
        <span id='clear' className='icons material-icons' onClick={this._onClear}>clear</span>
      </div>
    );
  }
});

module.exports = InfoPane;
