'use strict';

var Node = require('./Node.js');
var MapTracerHelper = require('../services/MapTracerHelper');

var id = 0;

function Edge(startNode, endNode) {
  this.id = id++;
  this.startNode = startNode;
  this.endNode = endNode;
}

module.exports = Edge;