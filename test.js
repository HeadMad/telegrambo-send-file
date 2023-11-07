import telegrambo from "telegrambo";
import sendFile from "./index.js";

const bot = telegrambo(process.env.BOT_TOKEN);

bot.sendFile = sendFile(process.env.BOT_TOKEN);

bot.sendFile('photo', {
  chat_id: process.env.CHAT_ID,
  photo: './test.jpg',
}).then(console.log);

