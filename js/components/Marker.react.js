var React = require('react');

var Marker = React.createClass({
  render: function () {
    var className = 'icons material-icons marker';
    var type = 'brightness_1';
    var adjustment = 5;

    if (this.props.isActive) {
      className += ' active-marker';
      type = 'gps_fixed'
      adjustment = 12
    }

    var style = {
      left: this.props.node.x - adjustment,
      top: this.props.node.y - adjustment
    };

    return <i className={className} onClick={this.props.onClick} style={style}>{type}</i>;
  }
});

module.exports = Marker;
