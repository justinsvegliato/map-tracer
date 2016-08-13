'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MapTracerConstants = require('../constants/MapTracerConstants');

var MapTracerActions = {
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
  selectNode: function(selectedNode) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SELECT_NODE,
      selectedNode: selectedNode
    });
  },
  deselectNode: function() {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.DESELECT_NODE
    });
  },
  addEdge: function(edge) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.ADD_EDGE,
      edge: edge
    });
  },
  clearMap: function() {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.CLEAR_MAP
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
  setImageUrl: function(imageUrl) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_IMAGE_URL,
      imageUrl: imageUrl
    });
  },
  setImageWidth: function(imageWidth) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_IMAGE_WIDTH,
      imageWidth: imageWidth
    });
  },
  setImageHeight: function(imageHeight) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_IMAGE_HEIGHT,
      imageHeight: imageHeight
    });
  },
  setImageOffset: function(imageLeftOffset, imageTopOffset) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_IMAGE_OFFSET,
      imageLeftOffset: imageLeftOffset,
      imageTopOffset: imageTopOffset
    });
  },
  setSimulationCoordinates: function(coordinates) {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.SET_SIMULATION_COORDINATES,
      coordinates: coordinates
    });
  },
  startSimulation: function() {
    AppDispatcher.dispatch({
      actionType: MapTracerConstants.START_SIMULATION
    });
  },
};

module.exports = MapTracerActions;