import React, { Component } from 'react';
import './buttons.css';

class Hangup extends Component {
  render() {
    return (
      <div>
        <button
          onClick={this.props.onClick}
          type="button"
          className="btn btn-block btn-lg btn-circle btn-xl hangup-color"
        >
          <i className="fas fa-phone"></i>
        </button>
      </div>
    );
  }
}

export default Hangup;
