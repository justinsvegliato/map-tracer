var React = require('react');

var GraphDialog = React.createClass({
  render: function() {
    return (
      <dialog id='graph-dialog' className='mdl-dialog'>
        <h4 className='mdl-dialog__title'>Graph</h4>
        <div id='graph' className='mdl-dialog__content'><pre>{this.props.graph}</pre></div>
        <div className='mdl-dialog__actions'>
          <button type='button' className='mdl-button close'>Close</button>
        </div>
      </dialog>
    );
  }
});

module.exports = GraphDialog;