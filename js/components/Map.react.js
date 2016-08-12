var React = require('react');
var $ = require('jquery');
var Marker = require('./Marker.react');
var Line = require('./Line.react');
var MapTracerStore = require('../stores/MapTracerStore');
var MapTracerActions = require('../actions/MapTracerActions');
var Node = require('../models/Node');
var Edge = require('../models/Edge');

function getState() {
  return {
    image: MapTracerStore.getImageUrl(),
    nodes: MapTracerStore.getNodes(),
    edges: MapTracerStore.getEdges(),
    initialXPosition: MapTracerStore.getInitialXPosition(),
    terminalXPosition: MapTracerStore.getTerminalXPosition(),
    initialYPosition: MapTracerStore.getInitialYPosition(),
    terminalYPosition: MapTracerStore.getTerminalYPosition(),
    imageWidth: MapTracerStore.getImageWidth(),
    imageHeight: MapTracerStore.getImageHeight(),
    selectedNode: MapTracerStore.getSelectedNode()
  };
}

var Map = React.createClass({
  getInitialState: function () {
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
  _onMapClick: function(event) {
    var offset = $("#image").offset();
    MapTracerActions.setImageOffset(offset.left, offset.top);

    MapTracerActions.addNode(new Node(event.pageX , event.pageY));
  },
  _onMarkerClick: function(node) {
    if (this.state.selectedNode && this.state.selectedNode.x === node.x && this.state.selectedNode.y === node.y) {
      MapTracerActions.deselectNode();
    } else {
      if (this.state.selectedNode) {
        MapTracerActions.addEdge(new Edge(this.state.selectedNode, node));
      }
      MapTracerActions.selectNode(node);
    }
  },
  render: function() {
    var nodes = this.state.nodes.map(function(node) {
      if (this.state.selectedNode) {
        var isActive = this.state.selectedNode.x === node.x && this.state.selectedNode.y === node.y;
      }
      return <Marker isActive={isActive} node={node} onClick={this._onMarkerClick.bind(this, node)} />
    }.bind(this));

    var lines = this.state.edges.map(function(edge) {
      return <Line from={{x: edge.startNode.x, y: edge.startNode.y}} to={{x: edge.endNode.x, y: edge.endNode.y}} style='2px solid orange' />;
    });

    var data = '';
    if (this.state.selectedNode) {
      data = this.state.selectedNode.x;
    }

    return (
      <div id='map'>
        <img id='image' src={this.state.image} onClick={this._onMapClick} />
        <div>{lines}</div>
        <div>{nodes}</div>
      </div>
    );
  }
});

module.exports = Map;