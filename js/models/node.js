var id = 0;

function Node(x, y) {
  this.id = id++;
  this.x = x;
  this.y = y;
}

module.exports = Node;