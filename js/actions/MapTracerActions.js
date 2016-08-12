var AppDispatcher = require('../dispatcher/AppDispatcher');
var MapTracerConstants = require('../constants/MapTracerConstants');

var MapTracerActions = {
  setImageUrl: function(imageUrl) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_IMAGE_URL,
      imageUrl: imageUrl
    });
  },
  addNode: function(node) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.ADD_NODE,
      node: node
    });
  },
  deleteNode: function(node) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.DELETE_NODE,
      node: node
    });
  },
  addEdge: function(edge) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.ADD_EDGE,
      edge: edge
    });
  },
  setPreviousNode: function(previousNode) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_PREVIOUS_NODE,
      previousNode: previousNode
    });
  },
  setInitialXPosition: function(position) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_INITIAL_X_POSITION,
      position: position
    });
  },
  setTerminalXPosition: function(position) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_TERMINAL_X_POSITION,
      position: position
    });
  },
  setInitialYPosition: function(position) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_INITIAL_Y_POSITION,
      position: position
    });
  },
  setTerminalYPosition: function(position) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_TERMINAL_Y_POSITION,
      position: position
    });
  },
  setImageWidth: function(width) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_IMAGE_WIDTH,
      width: width
    });
  },
  setImageHeight: function(height) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_IMAGE_HEIGHT,
      height: height
    });
  }
};

module.exports = MapTracerActions;