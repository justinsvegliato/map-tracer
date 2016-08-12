var React = require('react');

var Line = React.createClass({
    render: function() {
        var from = this.props.from;
        var to = this.props.to;
        if (to.x < from.x) {
            from = this.props.to;
            to = this.props.from;
        }

        var len = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
        var angle = Math.atan((to.y - from.y) / (to.x - from.x));

        var style = {
            position: 'absolute',
            transform: `translate(${from.x - .5 * len * (1 - Math.cos(angle))}px, ${from.y + .5 * len * Math.sin(angle)}px) rotate(${angle}rad)`,
            width: `${len}px`,
            height: `${0}px`,
            borderBottom: this.props.style || '1px solid black'
        };

        return <div className='line' style={style}></div>;
    }
});

module.exports = Line;