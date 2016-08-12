'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var MapTracerConstants = require('../constants/MapTracerConstants');
var MapTracerHelper = require('../services/MapTracerHelper');

var CHANGE_EVENT = 'change';

var nodes = [];
var edges = [];
var selectedNode = null;

var imageUrl = null;
//var imageUrl = 'https://justinsvegliato.com/img/GenericWorld.png';

var imageWidth = null;
var imageHeight = null;
//var imageWidth = 816;
//var imageHeight = 929;

var imageLeftOffset = null;
var imageTopOffset = null;

var initialXPosition = null;
var terminalXPosition = null;
var initialYPosition = null;
var terminalYPosition = null;
//var initialXPosition = -1500;
//var terminalXPosition = 8500;
//var initialYPosition = -1600;
//var terminalYPosition = 9800;

var MapTracerStore = assign({}, EventEmitter.prototype, {
  getNodes: function() {
    return nodes;
  },
  getEdges: function() {
    return edges;
  },
  getSelectedNode: function() {
    return selectedNode;
  },
  getGraph: function() {
    var xScale = MapTracerHelper.getScale(initialXPosition, terminalXPosition, imageWidth);
    var yScale = MapTracerHelper.getScale(initialYPosition, terminalYPosition, imageHeight);
    return MapTracerHelper.getGraph(nodes, edges, xScale, yScale, initialXPosition, initialYPosition, imageLeftOffset, imageTopOffset);
  },
  getInitialXPosition: function() {
    return initialXPosition;
  },
  getTerminalXPosition: function() {
    return terminalXPosition;
  },
  getInitialYPosition: function() {
    return initialYPosition;
  },
  getTerminalYPosition: function() {
    return terminalYPosition;
  },
  getImageUrl: function() {
    return imageUrl;
  },
  getImageWidth: function() {
    return imageWidth;
  },
  getImageHeight: function() {
    return imageHeight;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case MapTracerConstants.ADD_NODE:
      nodes.push(action.node);
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.DELETE_NODE:
      selectedNode = null;

      nodes = nodes.filter(function(node) {
        return node.id !== action.node.id;
      });

      edges = edges.filter(function(edge) {
        return action.node.id !== edge.startNode.id && action.node.id !== edge.endNode.id;
      });

      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SELECT_NODE:
      selectedNode = action.selectedNode;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.DESELECT_NODE:
      selectedNode = null;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.ADD_EDGE:
      edges.push(action.edge);
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.CLEAR_MAP:
      nodes = [];
      edges = [];
      selectedNode = null;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SET_INITIAL_X_POSITION:
      initialXPosition = action.position;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SET_TERMINAL_X_POSITION:
      terminalXPosition = action.position;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SET_INITIAL_Y_POSITION:
      initialYPosition = action.position;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SET_TERMINAL_Y_POSITION:
      terminalYPosition = action.position;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SET_IMAGE_URL:
      imageUrl = action.imageUrl.trim();

      nodes = [];
      edges = [];
      selectedNode = null;

      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SET_IMAGE_WIDTH:
      imageWidth = action.imageWidth;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SET_IMAGE_HEIGHT:
      imageHeight = action.imageHeight;
      MapTracerStore.emitChange();
      break;
    case MapTracerConstants.SET_IMAGE_OFFSET:
      imageLeftOffset = action.imageLeftOffset;
      imageTopOffset = action.imageTopOffset;
      MapTracerStore.emitChange();
      break;
    default:
      // No operation
  }
});

module.exports = MapTracerStore;
