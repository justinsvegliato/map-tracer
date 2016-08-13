'use strict';

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
    selectedNode: MapTracerStore.getSelectedNode(),
    isSimulationRunning: MapTracerStore.isSimulationRunning(),
    simulationNodes: MapTracerStore.getSimulationNodes()
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
    if (!MapTracerStore.isSimulationRunning()) {
      var offset = $("#image").offset();
      MapTracerActions.setImageOffset(offset.left, offset.top);

      MapTracerActions.addNode(new Node(event.pageX, event.pageY));
    }
  },
  _onMarkerClick: function(node) {
    if (!MapTracerStore.isSimulationRunning()) {
      if (this.state.selectedNode && this.state.selectedNode.x === node.x && this.state.selectedNode.y === node.y) {
        MapTracerActions.deselectNode();
      } else {
        if (this.state.selectedNode) {
          MapTracerActions.addEdge(new Edge(this.state.selectedNode, node));
        }
        MapTracerActions.selectNode(node);
      }
    }
  },
  _getMarker: function(node) {
    var isActive = this.state.selectedNode && this.state.selectedNode === node;
    return <Marker isActive={isActive} node={node} onClick={this._onMarkerClick.bind(this, node)} />;
  },
  _getLine: function(edge) {
    return <Line startNode={edge.startNode} endNode={edge.endNode} />;
  },
  _getSimulationMarkers: function() {
    return this.state.simulationNodes.map(function(node) {
      return <Marker node={node} />;
    });
  },
  _getSimulationLines: function() {
    var simulationLines = [];
    for (var i = 0; i < this.state.simulationNodes.length - 1; i++) {
      simulationLines.push(<Line startNode={this.state.simulationNodes[i]} endNode={this.state.simulationNodes[i + 1]} />);
    }
    return simulationLines;
  },
  render: function() {
    var markers = this.state.nodes.map(this._getMarker);
    var lines = this.state.edges.map(this._getLine);

    var simulationMarkers = this._getSimulationMarkers()
    var simulationLines = this._getSimulationLines();

    return (
      <div id='map'>
        <img id='image' src={this.state.image} onClick={this._onMapClick} />

        <div>{lines}</div>
        <div>{markers}</div>

        <div>{simulationLines}</div>
        <div>{simulationMarkers}</div>
      </div>
    );
  }
});

module.exports = Map;