const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const { makeError, error404, handleRouteErrors } = require('./errors.js');

const StreamChat = require('stream-chat').StreamChat;

const express = require('express');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dolbyioKey = process.env.REACT_APP_DOLBYIO_CONSUMER_KEY;
const dolbyioSecret = process.env.REACT_APP_DOLBYIO_CONSUMER_SECRET;
const streamKey = process.env.REACT_APP_STREAM_CONSUMER_KEY;
const streamSecret = process.env.REACT_APP_STREAM_CONSUMER_SECRET;

app.get('/api/auth/dolbyio', (req, res, next) => {
  const auth = new Buffer.from(`${dolbyioKey}:${dolbyioSecret}`).toString(
    'base64'
  );
  console.log('Getting Dolby.io token...');
  const options = {
    method: 'POST',
    url: 'https://session.voxeet.com/v1/oauth2/token',
    headers: {
      Authorization: 'Basic ' + auth,
    },
    body: {
      grant_type: 'client_credentials',
    },
    json: true,
  };

  try {
    request(options, (error, response, body) => {
      if (body.error) {
        console.log(
          `Unable to retrieve authentication token for Dolby.io: ${body.error}`
        );
        throw error;
      }
      const token = {
        accessToken: body.access_token,
        refreshToken: body.refresh_token,
      };
      res.json(token);
    });
  } catch (err) {
    return next(err);
  }
});

const serverClient = StreamChat.getInstance(streamKey, streamSecret);

app.post('/api/auth/stream', (req, res, next) => {
  const { input } = req.body;
  console.log('Getting Stream Chat token...');
  if (!input) {
    next(makeError('Missing username', 400));
  }
  try {
    const token = serverClient.createToken(input);
    return res.json({ token: token });
  } catch (err) {
    return next(err);
  }
});

/* provide 404 response if no routes match */
app.use(error404);

/* general error-handler: returns JSON with error info */
app.use(handleRouteErrors);

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Token server listening at http://localhost:${port}`)
);
