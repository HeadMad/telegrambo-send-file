# Telegrambo Send File

Extension for sending local files as [inputFile](https://core.telegram.org/bots/api#inputfile) using using multipart/form-data. It cam be sended as document, photo, video, audio, voice, video-note, animation, sticker or media group.

<br>

## Installation

<br>You can install Telegrambo Send File using npm:

```
npm install telegrambo-send-file
```
<br>

## Usage
<br>

```js
// bot.js

import telegrambo from 'telegrambo';
import sendFile  from 'telegrambo-send-file';

const bot = telegrambo(process.env.YOU_BOT_TOKEN);

// Initialize new method for bot
bot.sendFile = sendFile(process.env.YOU_BOT_TOKEN);
```

**Returns:**

- `function`: A new method that get argument:
  - `payload` (object, required) - Payload one of methods, where bot send local file.

<br>Example of sending photo:

```js
bot.sendFile({
  chat_id: process.env.CHAT_ID,
  photo: './test.jpg'
});
```

<br>Or sending file as document:

```js
bot.sendFile({
  chat_id: process.env.CHAT_ID,
  document: './test.jpg'
});
```

<br>Or media group:

```js
bot.sendFile({
  chat_id: process.env.CHAT_ID,
  media: [
    {
      type: 'photo'
      photo: './test1.jpg'
    },
    {
      type: 'photo',
      photo: 'CAACaGqaaXKdaaidUMvlVKR8Hr2mQMTgJFYTMjE62L2OaalObaacH4nKuSrNuFTOBDuaMwQ'
    },
    {
      type: 'photo',
      photo: 'https://my-site.com/photo.jpg'
    }
  ]
});
```