var React = require('react');

var RepresentationDialog = React.createClass({
  render: function() {
    return (
      <dialog id="representation-dialog" className="mdl-dialog">
        <h4 className="mdl-dialog__title">Graph</h4>
        <div id="representation" className="mdl-dialog__content"><pre>{this.props.representation}</pre></div>
        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button close">Close</button>
        </div>
      </dialog>
    );
  }
});

module.exports = RepresentationDialog;