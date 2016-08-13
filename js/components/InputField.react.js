'use strict';

var React = require('react');

var InputField = React.createClass({
  render: function () {
    var className = 'mdl-textfield mdl-js-textfield';
    if (this.props.className) {
      className += " " + this.props.className;
    }

    return (
      <div className={className}>
        <input disabled={this.props.disabled} id={this.props.id} className='mdl-textfield__input' type='text' value={this.props.value} onChange={this.props.onChange}/>
        <label htmlFor={this.props.id} className='mdl-textfield__label'>{this.props.label}</label>
      </div>
    );
  }
});

module.exports = InputField;