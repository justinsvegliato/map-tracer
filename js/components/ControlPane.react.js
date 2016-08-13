'use strict';

var React = require('react');
var MapTracerStore = require('../stores/MapTracerStore');
var MapTracerActions = require('../actions/MapTracerActions');
var MapTracerHelper = require('../services/MapTracerHelper');

function getState() {
  return {
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
  render: function() {
    return (
      <div>
        <span id='delete' className='icons material-icons' onClick={this._onDelete.bind(this, this.state.selectedNode)}>delete</span>
      </div>
    );
  }
});

module.exports = InfoPane;
