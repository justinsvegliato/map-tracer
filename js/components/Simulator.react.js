'use strict';

var React = require('react');
var $ = require('jquery');
var MapTracerStore = require('../stores/MapTracerStore');
var MapTracerActions = require('../actions/MapTracerActions');
var MapTracerHelper = require('../services/MapTracerHelper');

function getState() {
  return {
    graph: MapTracerStore.getGraph(),
    imageUrl: MapTracerStore.getImageUrl(),
    initialXPosition: MapTracerStore.getInitialXPosition(),
    terminalXPosition: MapTracerStore.getTerminalXPosition(),
    initialYPosition: MapTracerStore.getInitialYPosition(),
    terminalYPosition: MapTracerStore.getTerminalYPosition(),
    imageWidth: MapTracerStore.getImageWidth(),
    imageHeight: MapTracerStore.getImageHeight(),
    simulationNodes: MapTracerStore.getSimulationNodes(),
    coordinates: MapTracerStore.getCoordinates(),
    isSimulationRunning: MapTracerStore.isSimulationRunning()
  };
}

var Simulator = React.createClass({
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
  _onChange: function(event) {
    var value = event.target.value;

    var coordinates = [];
    if (value) {
      var rawCoordinates = JSON.parse(value).coordinates;

      var xScale = MapTracerHelper.getReversedScale(this.state.initialXPosition, this.state.terminalXPosition, this.state.imageWidth);
      var yScale = MapTracerHelper.getReversedScale(this.state.initialYPosition, this.state.terminalYPosition, this.state.imageHeight);

      coordinates = rawCoordinates.map(function (coordinate) {
        var offset = $('#image').offset();
        var adjustedX = (coordinate[0] - this.state.initialXPosition) * xScale + offset.left;
        var adjustedY = (coordinate[1] - this.state.initialYPosition) * yScale + offset.top;
        return [adjustedX, adjustedY];
      }.bind(this));
    }

    MapTracerActions.setSimulationCoordinates(coordinates);
  },
  _onClick: function() {
    MapTracerActions.startSimulation();
  },
  render: function () {
    var isReady = this.state.imageUrl && this.state.initialXPosition && this.state.terminalXPosition
      && this.state.initialYPosition && this.state.terminalYPosition && this.state.imageWidth
      && this.state.imageHeight && !this.state.isSimulationRunning;

    var isSimulationReady = this.state.coordinates.length;

    return (
      <div id='#simulator'>
        <h4>Simulator</h4>

        <div className='mdl-textfield mdl-js-textfield large-textfield'>
          <textarea disabled={!isReady} id='coordinates' className='mdl-textfield__input' type='text' rows= '5' onChange={this._onChange}></textarea>
          <label className='mdl-textfield__label' htmlFor='coordinates'>Enter coordinates to simulate...</label>
        </div>

        <a href='#image' disabled={!isReady || !isSimulationReady} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this._onClick}>Play</a>
      </div>
    );
  }
});

module.exports = Simulator;