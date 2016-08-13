'use strict';

// TODO: Fix some of the casting issues. We should be using integers throughout the whole app.
function getScaledPosition(position, scale, initialPosition) {
  return (position * scale) + parseFloat(initialPosition);
}

module.exports = {
  getCoordinates: function(x, y) {
    return '(' + x + ', ' + y + ')';
  },
  getScale: function(initialPosition, terminalPosition, reducedLength) {
    return (terminalPosition - initialPosition) / reducedLength;
  },
  getReversedScale: function(initialPosition, terminalPosition, reducedLength) {
    return reducedLength / (terminalPosition - initialPosition);
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
      var weight = Math.sqrt(Math.pow(scaledEndNode.x - scaledStartNode.x, 2) + Math.pow(scaledEndNode.y - scaledStartNode.y, 2));

      return {
        id: edge.id,
        startNodeId: edge.startNode.id,
        endNodeId: edge.endNode.id,
        weight: weight
      };
    });

    return JSON.stringify({
      nodes: scaledNodeSet,
      edges: adjustedEdges
    }, null, 2);
  }
};