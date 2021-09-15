import { StreamChat } from 'stream-chat';
const streamChatKey = process.env.REACT_APP_STREAM_CONSUMER_KEY;

// 1. create client with streamchat key
// return client
export async function setUpStreamChatClient() {
  const client = await new StreamChat(streamChatKey, { timeout: 6000 });
  return client;
}

// 2. get stream token
// given username, return token

export async function getStreamToken(user) {
  let streamTokenUrl = '/api/auth/stream';
  let userToken = await fetch(streamTokenUrl, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: user,
    }),
  })
    .then((response) => response.json())
    .then((getToken) => {
      return getToken;
    })
    .catch((error) => console.warn(error));
  return userToken.token;
}

// 3. Connect user using client with username and token

export async function connectStreamUser(client, user, token) {
  await client.connectUser(
    {
      id: user,
      name: user,
      image: `https://getstream.io/random_svg/?name=${user}`,
    },
    token
  );
}

// 4. fetch stream users
// given client, return stream users

export async function fetchStreamUsers(client) {
  const allUsers = await client.queryUsers(
    {},
    { last_active: -1 },
    { limit: 2 }
  );
  let remote = allUsers.users[1].id;
  let local = allUsers.users[0].id;
  let users = [local, remote];
  return users;
}

// 5. init stream channel
// given members and stream chat client, return channel

export async function initStreamChannel(members, client) {
  let channel = client.channel('messaging', {
    members: members,
  });
  return channel;
}

// 6. create stream chat channel with members
// given client,
// fetch Stream members
// return channel
export async function setUpStreamChatChannel(client) {
  let members = await fetchStreamUsers(client);
  let channel = await initStreamChannel(members, client);
  return channel;
}

// 7. disconnect Stream Chat user and channel
export async function disconnectStreamChat(client) {
  client.disconnect();
}
