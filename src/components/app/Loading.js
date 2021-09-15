import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Loading;
