import React, { Component } from 'react';
import Hangup from './buttons/Hangup';
import VoxeetSDK from '@voxeet/voxeet-web-sdk';
import './ControlPanel.css';

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hangupDisabled: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    if (this.state.hangupDisabled) {
      return;
    }
    this.setState({ hangupDisabled: true });
    VoxeetSDK.conference
      .leave()
      .then(() => {
        VoxeetSDK.session.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { hangupDisabled } = this.state;
    return (
      <div id="control-panel-container">
        <div className="row justify-content-center mt-3 mb-3">
          <div className="col-md-4 d-flex justify-content-center">
            <Hangup
              onClick={this.handleClick}
              hangupDisabled={hangupDisabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
