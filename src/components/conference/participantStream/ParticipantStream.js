import React, { Component } from 'react';
import './ParticipantStream.css';

class ParticipantStream extends Component {
  componentDidMount() {
    this.updateStream(this.props);
  }

  updateStream(props) {
    const { stream } = props;
    navigator.attachMediaStream(this.video, stream);
  }

  render() {
    const { participant, stream } = this.props;

    return (
      <video
        id={'video-' + participant.id}
        ref={(ref) => (this.video = ref)}
        participant={participant}
        stream={stream}
        autoPlay={true}
        muted
      />
    );
  }
}

export default ParticipantStream;
