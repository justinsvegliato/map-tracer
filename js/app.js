var React = require('react');
var MapTracerApp = require('./components/MapTracerApp.react');
var DataPanel = require('./components/DataPanel.react');

React.render(
  <MapTracerApp />,
  document.getElementById('map-tracer')
);

React.render(
  <DataPanel />,
  document.getElementById('data-panel')
);