'use strict';

function getScaledPosition(position, scale, initialPosition) {
  return (position * scale) + initialPosition;
}

function getDistance(x1, x0, y1, y0) {
  return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

module.exports = {
  getCoordinates: function(x, y) {
    return '(' + x + ', ' + y + ')';
  },
  getScale: function(initialPosition, terminalPosition, reducedLength) {
    return (terminalPosition - initialPosition) / reducedLength
  },
  getGraph: function(nodes, edges, xScale, yScale, initialXPosition, initialYPosition, imageLeftOffset, imageTopOffset) {
    var scaledNodes = {};
    nodes.forEach(function(node) {
      scaledNodes[node.id] = {
        id: node.id,
        x: getScaledPosition(node.x - imageLeftOffset, xScale, initialXPosition),
        y: getScaledPosition(node.y - imageTopOffset, yScale, initialYPosition)
      };
    });

    var scaledNodeSet = Object.keys(scaledNodes).map(function(key) {
      return scaledNodes[key];
    });

    var adjustedEdges = edges.map(function(edge) {
      var scaledStartNode = scaledNodes[edge.startNode.id];
      var scaledEndNode = scaledNodes[edge.endNode.id];
      var weight = getDistance(scaledEndNode.x, scaledStartNode.x, scaledEndNode.y, scaledStartNode.y);

      return {
        id: edge.id,
        startNodeId: edge.startNode.id,
        endNodeId: edge.endNode.id,
        weight: weight
      }
    });

    return JSON.stringify({
      nodes: scaledNodeSet,
      edges: adjustedEdges
    }, null, 2);
  },

};