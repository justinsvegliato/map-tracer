var React = require('react');

var Marker = React.createClass({
  render: function () {
    var className = 'material-icons marker';
    if (this.props.isActive) {
      className += " active-marker";
    }

    var style = {
      left: this.props.x - 5,
      top: this.props.y - 5
    };
    return <i className={className} onClick={this.props.onClick} style={style}>gps_fixed</i>;
  }
});

module.exports = Marker;
