var React = require('react');
var $ = require("jquery");
var Marker = require('./Marker.react');
var Line = require('./Line.react');
var MapTracerStore = require('../stores/MapTracerStore');
var MapTracerActions = require('../actions/MapTracerActions');
var Node = require('../models/Node');
var Edge = require('../models/Edge');

var Map = React.createClass({
  getInitialState: function () {
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
      image: MapTracerStore.getImageUrl(),
      nodes: MapTracerStore.getNodes(),
      edges: MapTracerStore.getEdges(),
      initialXPosition: MapTracerStore.getInitialXPosition(),
      terminalXPosition: MapTracerStore.getTerminalXPosition(),
      initialYPosition: MapTracerStore.getInitialYPosition(),
      terminalYPosition: MapTracerStore.getTerminalYPosition(),
      imageWidth: MapTracerStore.getImageWidth(),
      imageHeight: MapTracerStore.getImageHeight(),
      previousNode: MapTracerStore.getPreviousNode()
    });
  },
  _onMapClick: function(event) {
    //var xScale = (this.state.terminalXPosition - this.state.initialXPosition) / this.state.imageWidth;
    //var yScale = (this.state.terminalYPosition - this.state.initialYPosition) / this.state.imageHeight;

    //var x = (imageX * xScale) + this.state.initialXPosition;
    //var y = (imageY * yScale) + this.state.initialYPosition;

    var x = event.pageX; // - $("#image").offset().left;
    var y = event.pageY; // - $("#image").offset().top;
    MapTracerActions.addNode(new Node(x , y));
  },
  _onMarkerClick: function(node) {
    if (this.state.previousNode && this.state.previousNode.x === node.x && this.state.previousNode.y === node.y) {
      MapTracerActions.setPreviousNode();
    } else {
      if (this.state.previousNode) {
        MapTracerActions.addEdge(new Edge(this.state.previousNode, node));
      }
      MapTracerActions.setPreviousNode(node);
    }
  },
  render: function() {
    var nodes = this.state.nodes.map(function(node) {
      if (this.state.previousNode) {
        var isActive = this.state.previousNode.x === node.x && this.state.previousNode.y === node.y;
      }
      return <Marker isActive={isActive} node={node} onClick={this._onMarkerClick.bind(this, node)} />
    }.bind(this));

    var lines = this.state.edges.map(function(edge) {
      return <Line from={{x: edge.startNode.x, y: edge.startNode.y}} to={{x: edge.endNode.x, y: edge.endNode.y}} style="2px solid orange" />;
    });

    var data = '';
    if (this.state.previousNode) {
      data = this.state.previousNode.x;

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