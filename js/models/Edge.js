var Node = require('./Node.js');

var id = 0;

function Edge(startNode, endNode) {
  this.id = id++;
  this.startNode = startNode;
  this.endNode = endNode;
  this.weight = Math.sqrt(Math.pow(this.endNode.x - this.startNode.x, 2) + Math.pow(this.endNode.y - this.startNode.y, 2));
}

module.exports = Edge;