import React, { Component } from 'react';
import ControlPanel from '../controlPanel/ControlPanel';
// import VoxeetSDK from '@voxeet/voxeet-web-sdk';
import ParticipantStream from './participantStream/ParticipantStream';
import Plugins from '../plugins/Plugins';
import './Conference.css';

class Conference extends Component {
  render() {
    const {
      streamChatClient,
      streamChannel,
      isConnecting,
      localParticipant,
      localStream,
      remoteParticipant,
      remoteStream,
      clientDisconnected,
    } = this.props;
    if (isConnecting) return null;
    return (
      <div>
        <div className="container-fluid p-0" id="full-screen-video-container">
          <React.Fragment>
            {remoteParticipant ? (
              <div id="guest-view-container">
                <React.Fragment>
                  <ParticipantStream
                    participant={remoteParticipant}
                    stream={remoteStream}
                  />
                  <div className="guest-video-container-label">
                    {remoteParticipant.info.name}
                  </div>
                </React.Fragment>
              </div>
            ) : (
              <div></div>
            )}
            <div id="sidebar-container">
              <div id="self-view-container">
                {localParticipant ? (
                  <React.Fragment>
                    <ParticipantStream
                      participant={localParticipant}
                      stream={localStream}
                    />

                    <div className="self-video-container-label">
                      {localParticipant.info.name}
                    </div>
                  </React.Fragment>
                ) : (
                  <div></div>
                )}
              </div>
              <div id="plugins-container">
                {remoteParticipant ? (
                  <Plugins
                    localParticipant={localParticipant}
                    remoteParticipant={remoteParticipant}
                    streamChatClient={streamChatClient}
                    streamChannel={streamChannel}
                    clientDisconnected={clientDisconnected}
                  />
                ) : (
                  <Plugins
                    localParticipant={localParticipant}
                    streamChatClient={streamChatClient}
                    streamChannel={streamChannel}
                    clientDisconnected={clientDisconnected}
                  />
                )}
              </div>
            </div>
          </React.Fragment>
          <ControlPanel />
        </div>
      </div>
    );
  }
}

export default Conference;
