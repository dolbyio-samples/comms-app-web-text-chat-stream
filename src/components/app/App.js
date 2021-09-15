import React, { Component } from 'react';
import Conference from '../conference/Conference';
import './App.css';
import VoxeetSDK from '@voxeet/voxeet-web-sdk';
import NavBar from './Navbar';
import Loading from './Loading';

import {
  setUpStreamChatClient,
  getStreamToken,
  connectStreamUser,
  setUpStreamChatChannel,
  disconnectStreamChat,
} from '../../utils/streamUtils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      username: '',
      streamChatClient: '',
      streamChannel: '',
      localParticipant: '',
      localStream: '',
      remoteParticipant: '',
      remoteStream: '',
      isConnecting: true,
    };
    this.getDolbyToken = this.getDolbyToken.bind(this);
    this.refreshDolbyToken = this.refreshDolbyToken.bind(this);
    this.initializeStreamChatClient = this.initializeStreamChatClient.bind(
      this
    );
    this.initDolbySession = this.initDolbySession.bind(this);
  }

  refreshDolbyToken = async () => {
    let url = `${
      process.env.baseUrl || 'http://localhost:3001'
    }/api/auth/dolbyio`;
    return fetch(url)
      .then((data) => this.setState({ isLoaded: true }))
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      });
  };

  getDolbyToken = async () => {
    let url = `${
      process.env.baseUrl || 'http://localhost:3001'
    }/api/auth/dolbyio`;
    return fetch(url)
      .then((res) => {
        return res.json();
      })
      .then(async (result) => {
        await VoxeetSDK.initializeToken(result.accessToken, async () => {
          await this.refreshDolbyToken();
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoaded: true, error });
      });
  };

  initializeStreamChatClient = async () => {
    let client = await setUpStreamChatClient();
    this.setState({ streamChatClient: client });
    let token = await getStreamToken(this.state.username);
    await connectStreamUser(client, this.state.username, token);
  };

  initDolbySession = async () => {
    const constraints = { audio: true, video: true };
    const randomName = 'Guest-' + Math.floor(Math.random() * (100 - 1) + 1);
    this.setState({ username: randomName });

    // initialize Dolby session with randomly generated guest name
    try {
      await VoxeetSDK.session.open({
        name: randomName,
      });
      this.setState({
        isLoaded: true,
      });
    } catch (e) {
      alert(
        'Something went wrong, please refresh the page and try again : ' + e
      );
      this.setState({
        isLoaded: true,
      });
    }

    // create conference, join conference, and start video
    VoxeetSDK.conference
      .create({ alias: 'demo-1on1' })
      .then((conference) => VoxeetSDK.conference.join(conference, constraints))
      .then((conference) =>
        VoxeetSDK.conference.startVideo(VoxeetSDK.session.participant)
      );

    // if steam added is the session participant (yourself), stream will be rendered in self view component
    VoxeetSDK.conference.on('streamAdded', async (participant, stream) => {
      // TODO add in track check
      if (stream.getVideoTracks().length) {
        // Only add the video node if there is a video track
        if (participant.id === VoxeetSDK.session.participant.id) {
          this.setState({
            localParticipant: participant,
            localStream: stream,
            isConnecting: false,
          });
          // otherwise, if the joining participant does not yourself (based on participant id),
          // the stream will be rendered in guest view component
        } else {
          // since a second participant has joined, we can start a stream chat channel with the two joined members
          let channel = await setUpStreamChatChannel(
            this.state.streamChatClient
          );
          this.setState({
            remoteParticipant: participant,
            remoteStream: stream,
            streamChannel: channel,
          });
        }
      }
    });

    VoxeetSDK.conference.on('streamUpdated', async (participant, stream) => {
      if (stream.getVideoTracks().length) {
        // Only add the video node if there is a video track
        if (participant.id === VoxeetSDK.session.participant.id) {
          this.setState({
            localParticipant: participant,
            localStream: stream,
            isConnecting: false,
          });
          // otherwise, if the joining participant does not yourself (based on participant id),
          // the stream will be rendered in guest view component
        } else {
          // since a second participant has joined, we can start a stream chat channel with the two joined members
          let channel = await setUpStreamChatChannel(
            this.state.streamChatClient
          );
          this.setState({
            remoteParticipant: participant,
            remoteStream: stream,
            streamChannel: channel,
          });
        }
      }
    });

    VoxeetSDK.conference.on('streamRemoved', async (participant, stream) => {
      if (participant.id === VoxeetSDK.session.participant.id) {
        await disconnectStreamChat(this.state.streamChatClient);
        this.setState({
          localParticipant: null,
          localStream: null,
          isConnecting: false,
          clientDisconnected: true,
        });
      } else {
        this.setState({
          remoteParticipant: null,
          remoteStream: null,
          clientDisconnected: true,
        });
      }
    });
  };

  async componentDidMount() {
    await this.getDolbyToken();
    await this.initDolbySession();
    await this.initializeStreamChatClient();
  }

  async componentWillUnmount() {
    await VoxeetSDK.conference
      .leave()
      .then(() => {
        VoxeetSDK.session.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      isLoaded,
      isConnecting,
      localParticipant,
      localStream,
      remoteParticipant,
      remoteStream,
      clientDisconnected,
    } = this.state;
    if (isLoaded) {
      return (
        <div className="App">
          <NavBar />
          <Conference
            interactivityConsumerKey={this.state.key}
            interactivityConsumerSecret={this.state.secret}
            streamChatClient={this.state.streamChatClient}
            streamChannel={this.state.streamChannel}
            isConnecting={isConnecting}
            localParticipant={localParticipant}
            localStream={localStream}
            remoteParticipant={remoteParticipant}
            remoteStream={remoteStream}
            clientDisconnected={clientDisconnected}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <NavBar />
          <Loading />
        </div>
      );
    }
  }
}

export default App;
