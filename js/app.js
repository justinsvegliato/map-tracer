'use strict';

var React = require('react');
var MapEditor = require('./components/MapEditor.react');
var Simulator = require('./components/Simulator.react');
var ControlPane = require('./components/ControlPane.react');

React.render(
  <MapEditor />,
  document.getElementById('map-editor')
);

React.render(
  <Simulator />,
  document.getElementById('simulator')
);

React.render(
  <ControlPane />,
  document.getElementById('control-pane')
);