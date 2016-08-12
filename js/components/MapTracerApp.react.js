var React = require('react');
var Map = require('./Map.react');
var InputField = require('./InputField.react')
var RepresentationDialog = require('./RepresentationDialog.react')
var MapTracerStore = require('../stores/MapTracerStore');
var MapTracerActions = require('../actions/MapTracerActions');


var MapTracerApp = React.createClass({
  getInitialState: function() {
    return {
      representation: MapTracerStore.getRepresentation(),
      imageUrl: MapTracerStore.getImageUrl(),
      initialXPosition: MapTracerStore.getInitialXPosition(),
      terminalXPosition: MapTracerStore.getTerminalXPosition(),
      initialYPosition: MapTracerStore.getInitialYPosition(),
      terminalYPosition: MapTracerStore.getTerminalYPosition(),
      imageWidth: MapTracerStore.getImageWidth(),
      imageHeight: MapTracerStore.getImageHeight()
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
      representation: MapTracerStore.getRepresentation(),
      imageUrl: MapTracerStore.getImageUrl(),
      initialXPosition: MapTracerStore.getInitialXPosition(),
      terminalXPosition: MapTracerStore.getTerminalXPosition(),
      initialYPosition: MapTracerStore.getInitialYPosition(),
      terminalYPosition: MapTracerStore.getTerminalYPosition(),
      imageWidth: MapTracerStore.getImageWidth(),
      imageHeight: MapTracerStore.getImageHeight()
    });
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
  _onButtonClick: function() {
    var dialog = document.querySelector('dialog');
    dialog.showModal();
  },
  render: function() {
    return (
      <div>
        <InputField className='large-input' id='image-url' label='Image URL' value={this.state.imageUrl} onChange={this._onImageUrlChange} />

        <Map />

        <InputField className='medium-input' id='initial-x-position' label='Initial X Position' value={this.state.initialXPosition} onChange={this._onInitialXPositionChange} />
        <InputField className='medium-input' id='terminal-x-position' label='Terminal X Position' value={this.state.terminalXPosition} onChange={this._onTerminalXPositionChange} />
        <InputField className='medium-input' id='initial-y-position' label='Initial Y Position' value={this.state.initialYPosition} onChange={this._onInitialYPositionChange} />
        <InputField className='medium-input' id='terminal-y-position' label='Terminal Y Position' value={this.state.terminalYPosition} onChange={this._onTerminalYPositionChange} />
        <InputField className='medium-input' id='image-width' label='Image Width' value={this.state.imageWidth} onChange={this._onImageWidthChange} />
        <InputField className='medium-input' id='image-height' label='Image Height' value={this.state.imageHeight} onChange={this._onImageHeightChange} />

        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this._onButtonClick}>Generate</button>

        <RepresentationDialog representation={this.state.representation} />
      </div>
    );
  }
});

module.exports = MapTracerApp;
