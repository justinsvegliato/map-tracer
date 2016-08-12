'use strict';

var React = require('react');
var MapTracerHelper = require('../services/MapTracerHelper');

var Line = React.createClass({
  render: function () {
    var startNode = this.props.startNode;
    var endNode = this.props.endNode;

    if (endNode.x < startNode.x) {
      startNode = this.props.endNode;
      endNode = this.props.startNode;
    }

    var len = Math.sqrt(Math.pow(endNode.x - startNode.x, 2) + Math.pow(endNode.y - startNode.y, 2));
    var angle = Math.atan((endNode.y - startNode.y) / (endNode.x - startNode.x));

    var style = {
      position: 'absolute',
      transform: `translate(${startNode.x - .5 * len * (1 - Math.cos(angle))}px, ${startNode.y + .5 * len * Math.sin(angle)}px) rotate(${angle}rad)`,
      width: `${len}px`,
      height: `${0}px`,
      borderBottom: '2px solid orange'
    };

    return <div className='line' style={style}></div>;
  }
});

module.exports = Line;