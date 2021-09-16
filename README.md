# Integrating Chat Using Stream

This React application demonstrates the integration of Stream's chat messaging service into a video conference application built with Dolby.io.

Learn more about Stream here: https://getstream.io/

# Getting Started

## Pre-Requisites

In order to make use of this demo you will need:

- Dolby.io Account -- get your _Consumer Key_ & _Secret_ at https://dolby.io

- Stream Account -- get your _Consumer Key_ & _Secret_ for Stream Chat Messaging at https://getstream.io/chat/

## Setup

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

This will initiate a token server to return any API keys as well as a React application in the browser that participants will auto-join. To test locally, the application can be opened in two seperate tabs in the browser. By default, this will be found at `localhost:3000`.
