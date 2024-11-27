const TelegramBot = require('node-telegram-bot-api');

const token = '7647014073:AAFFKvvya4szgDLKIsi87O9mlBr_eXPRWlQ';

const bot = new TelegramBot(token, { polling: true });

const webAppUrl = 'https://fluffy-boba-873f41.netlify.app/';

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Приветствую тебя фермер!',{
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Играть', web_app: {url: webAppUrl}}]
                ]
            }
        });
    }

    if (text === '/donate') {
         await bot.sendMessage(chatId, 'Деньгу закидуй мне по номеру телефона +79166944211')
    }

    //   bot.sendMessage(chatId, `${msg.text} это ты`);
});
