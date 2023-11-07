import fs from 'fs';
import https from 'https';
import FormData from 'form-data';

export default initializeSendFileMethod;

/**
 * Generates a function that sends a file using the given token.
 *
 * @param {string} token - The token used to authenticate the request.
 * @return {function} - A function that accepts a bot, type, and params as arguments and returns a Promise that resolves to the result of the request.
 */
function initializeSendFileMethod(token) {
  /**
   * @param {TelegramBot} bot - The bot instance.
   * @return {function} - A function that accepts a type and params.
   */
  return function applyToBot(bot) {
    /**
     * @param {string} type - Send local file as type.
     * @param {object} params - The parameters of the request.
     * @return {Promise} - A Promise that resolves to the result of the request.
     */
    return function sendFileMethod(type, params) {
      const method = 'send' + type[0].toUpperCase() + type.substring(1);
      const form = new FormData();
      for (let [key, value] of Object.entries(params)) {
        if (key === type)
          value = fs.ReadStream(value);

        form.append(key, value);
      }

      return new Promise((resolve, reject) => {
        const options = {
          hostname: 'api.telegram.org',
          port: 443,
          path: `/bot${token}/${method}`,
          method: 'POST',
          headers: form.getHeaders(),
        };

        const req = https.request(options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            const result = JSON.parse(data);
            resolve(result);
          });

          req.on('error', reject);
        });

        form.pipe(req);
      });
    };    // sendFileMethod
  };      // applyToBot
}         // initializeSendFileMethod
