<!--
[![Build Package](https://github.com/dolbyio-samples/template-repo/actions/workflows/build-package.yml/badge.svg)](https://github.com/dolbyio-samples/template-repo/actions/workflows/build-package.yml)
[![Publish Package](https://github.com/dolbyio-samples/template-repo/actions/workflows/publish-package.yml/badge.svg)](https://github.com/dolbyio-samples/template-repo/actions/workflows/publish-package.yml)
[![npm](https://img.shields.io/npm/v/dolbyio-samples/template-repo)](https://www.npmjs.com/package/dolbyio-samples/template-repo)
[![License](https://img.shields.io/github/license/dolbyio-samples/template-repo)](LICENSE)

Adding shields would also be amazing -->

# Integrating Chat Using Stream

Integrating chat functionality into an application that utilizes Dolby.io's Stream API. 

# Overview
This React application demonstrates the integration of Stream's chat messaging service into a video conference application built with Dolby.io. Chat integration with streaming applications can be useful for enabling users to communicate with each other while watching a live stream or participating in interactive sessions.

# Requirements 
In order to make use of this demo you will need:

- [Dolby.io Account](https://dolby.io) -- get your _Consumer Key_ & _Secret_ 

- [Stream Account](https://getstream.io/chat/) -- get your _Consumer Key_ & _Secret_ for Stream Chat Messaging


# Getting Started 

Clone the project and install dependencies:

```sh
npm install
```

You will also need to configure your credentials in the environment.

```sh
cp .env.example .env
```

Then edit that file to set your own _Consumer Key_ and _Secret_ for Dolby.io and Stream services, respectively

## Start

Run:

```sh
npm start
```

This will initiate a token server to return any API keys as well as a React application in the browser that participants will auto-join. To test locally, the application can be opened in two separate tabs in the browser. By default, this will be found at `localhost:3000`.

# Report a Bug 
In the case any bugs occur, report it using Github issues, and we will see to it. 

# Forking
We welcome your interest in trying to experiment with our repos.

# Feedback 
If there are any suggestions or if you would like to deliver any positive notes, feel free to open an issue and let us know!

# Learn More
For a deeper dive, we welcome you to review the following:
  - [Communications API](https://docs.dolby.io/communications-apis/docs)
  - [Getting Started with React](https://docs.dolby.io/communications-apis/docs/getting-started-with-reactnative-sdk)
  - [How-to Share Your Screen with Audio in a WebRTC Video Call](https://dolby.io/blog/how-to-share-your-screen-with-audio-in-a-webrtc-video-call/)
  - [Kickstart Video Calls for Your React Web App with UIKit](https://dolby.io/blog/kickstart-video-calls-for-your-react-web-app-with-uikit/)
  - [Building a Virtual Event and Webinar Application with React and Dolby.io](https://dolby.io/blog/building-a-virtual-event-and-webinar-application-with-react-and-dolby-io/)

# About Dolby.io

Using decades of Dolby's research in sight and sound technology, Dolby.io provides APIs to integrate real-time streaming, voice & video communications, and file-based media processing into your applications. [Sign up for a free account](https://dashboard.dolby.io/signup/) to get started building the next generation of immersive, interactive, and social apps.

<div align="center">
  <a href="https://dolby.io/" target="_blank"><img src="https://img.shields.io/badge/Dolby.io-0A0A0A?style=for-the-badge&logo=dolby&logoColor=white"/></a>
&nbsp; &nbsp; &nbsp;
  <a href="https://docs.dolby.io/" target="_blank"><img src="https://img.shields.io/badge/Dolby.io-Docs-0A0A0A?style=for-the-badge&logoColor=white"/></a>
&nbsp; &nbsp; &nbsp;
  <a href="https://dolby.io/blog/category/developer/" target="_blank"><img src="https://img.shields.io/badge/Dolby.io-Blog-0A0A0A?style=for-the-badge&logoColor=white"/></a>
</div>

<div align="center">
&nbsp; &nbsp; &nbsp;
  <a href="https://youtube.com/@dolbyio" target="_blank"><img src="https://img.shields.io/badge/YouTube-red?style=flat-square&logo=youtube&logoColor=white" alt="Dolby.io on YouTube"/></a>
&nbsp; &nbsp; &nbsp; 
  <a href="https://twitter.com/dolbyio" target="_blank"><img src="https://img.shields.io/badge/Twitter-blue?style=flat-square&logo=twitter&logoColor=white" alt="Dolby.io on Twitter"/></a>
&nbsp; &nbsp; &nbsp;
  <a href="https://www.linkedin.com/company/dolbyio/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white" alt="Dolby.io on LinkedIn"/></a>
</div>
