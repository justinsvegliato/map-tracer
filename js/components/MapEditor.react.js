'use strict';

var React = require('react');
var $ = require('jquery');
var Map = require('./Map.react');
var InputField = require('./InputField.react');
var GraphDialog = require('./GraphDialog.react');
var MapTracerStore = require('../stores/MapTracerStore');
var MapTracerActions = require('../actions/MapTracerActions');

var offset = 0;

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
    isSimulationRunning: MapTracerStore.isSimulationRunning()
  };
}

var MapEditor = React.createClass({
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function () {
    MapTracerStore.addChangeListener(this._onStoreChange);

    setTimeout(function() {
      var snackbar = document.querySelector('.mdl-js-snackbar');
      snackbar.MaterialSnackbar.showSnackbar({
        timeout: 4000,
        message: "I didn't have time to validate the form yet. You could probably break everything by using bad values."
      });
    }, 500);
  },
  componentWillUnmount: function () {
    MapTracerStore.removeChangeListener(this._onStoreChange);
  },
  _onStoreChange: function() {
    this.setState(getState());
  },
  _onImageUrlChange: function(event) {
    MapTracerActions.setImageUrl(event.target.value);
  },
  _onInitialXPositionChange: function(event) {
    MapTracerActions.setInitialXPosition(event.target.value);
  },
  _onTerminalXPositionChange: function(event) {
    MapTracerActions.setTerminalXPosition(event.target.value);
  },
  _onInitialYPositionChange: function(event) {
    MapTracerActions.setInitialYPosition(event.target.value);
  },
  _onTerminalYPositionChange: function(event) {
    MapTracerActions.setTerminalYPosition(event.target.value);
  },
  _onImageWidthChange: function(event) {
    MapTracerActions.setImageWidth(event.target.value);
  },
  _onImageHeightChange: function(event) {
    MapTracerActions.setImageHeight(event.target.value);
  },
  _onClick: function() {
    var dialog = document.querySelector('dialog');
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
    dialog.showModal();
  },
  render: function() {
    var isReady = this.state.imageUrl && this.state.initialXPosition && this.state.terminalXPosition
      && this.state.initialYPosition && this.state.terminalYPosition && this.state.imageWidth
      && this.state.imageHeight && !this.state.isSimulationRunning;

    return (
      <div>
        <h4>Generator</h4>
        <p>This app lets you lay a graph on top of an image (like a picture of a simulated world). You can create nodes by simply clicking anywhere on the image. Then, if you want to connect two nodes, click one of the nodes to select it and then click the other. This will put an edge between them and then select the next node. You can unselect a node by clicking it again. Once you're done mapping out the world, just enter the dimensions of the image and the bounds of the simulated environment and then click <strong>Generate</strong>. This will give you a graph that you can use to plan!</p>
        <p>By the way, if you mess up, you can always delete a node by selecting it and then clicking the trash can in the top right corner. This will delete that node and all of its edges.</p>

        <h5>Image</h5>
        <InputField disabled={this.state.isSimulationRunning} className='large-input' id='image-url' label='Enter an image URL...' value={this.state.imageUrl} onChange={this._onImageUrlChange} />
        <Map />
        <InputField disabled={this.state.isSimulationRunning} className='medium-input' id='image-width' label='Image Width' value={this.state.imageWidth} onChange={this._onImageWidthChange} />
        <InputField disabled={this.state.isSimulationRunning} className='medium-input' id='image-height' label='Image Height' value={this.state.imageHeight} onChange={this._onImageHeightChange} />

        <h5>World</h5>
        <InputField disabled={this.state.isSimulationRunning} className='medium-input' id='initial-x-position' label='Initial X Position' value={this.state.initialXPosition} onChange={this._onInitialXPositionChange} />
        <InputField disabled={this.state.isSimulationRunning} className='medium-input' id='terminal-x-position' label='Terminal X Position' value={this.state.terminalXPosition} onChange={this._onTerminalXPositionChange} />
        <InputField disabled={this.state.isSimulationRunning} className='medium-input' id='initial-y-position' label='Initial Y Position' value={this.state.initialYPosition} onChange={this._onInitialYPositionChange} />
        <InputField disabled={this.state.isSimulationRunning} className='medium-input' id='terminal-y-position' label='Terminal Y Position' value={this.state.terminalYPosition} onChange={this._onTerminalYPositionChange} />

        <button disabled={!isReady} className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={this._onClick}>Generate</button>

        <GraphDialog graph={this.state.graph} />
        
        <div className='mdl-js-snackbar mdl-snackbar'>
          <div className='mdl-snackbar__text'></div>
          <button className="mdl-snackbar__action" type="button"></button>
        </div>
      </div>
    );
  }
});

module.exports = MapEditor;
