require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
const webAppUrl = 'https://fluffy-boba-873f41.netlify.app/';
const sequelize = require('./db');
const UserModel = require('./models');
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const userRoutes = require('./routes/userRoutes');
const updateGarden = require('./routes/updateGarden');
const findUser = require('./routes/findUser');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: webAppUrl // Замените на ваш URL сайта на Netlify
  }));
// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/updateGarden', updateGarden);
app.use('/api/findUser', findUser);
// app.get('/api/users', async (req, res) => {
//     try {
//         const users = await UserModel.findAll();
//         res.json(users);
//     } catch (error) {
//         console.error('Ошибка при получении пользователей:', error);
//         res.status(500).json({ error: 'Ошибка при получении пользователей' });
//     }
// });

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Соединение с базой данных установлено.');
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
});

const start = async () => {

    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        await console.log('vse zaebok');

    } catch (error) {
        console.log('Подключение сломалось');
    }

    bot.on('message', async (msg) => {
        const chatId = String(msg.chat.id);
        const text = msg.text;
        const userName = msg.chat.username;

        // const existingUser  = true;
        // const existingUser  = await UserModel.findOne({ where: { chatId } });

        // console.log(`Checking for user with chatId: ${chatId}`);
        const existingUser = await UserModel.findOne({ where: { chatId, userName } });
        // console.log(`Existing user: ${existingUser}`);

        if (text === '/start') {
            // await UserModel.create({ chatId, userName });

            if (!existingUser) {
                // Если пользователь не найден, создаем нового
                await UserModel.create({ chatId, userName });
                await bot.sendMessage(chatId, 'Приветствую тебя фермер!', {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Играть', web_app: { url: webAppUrl } }]
                        ]
                    }
                });
            } else {
                // Если пользователь уже существует, отправляем соответствующее сообщение
                await bot.sendMessage(chatId, 'Жми кнопку играфть, фермер!', {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Играть', web_app: { url: webAppUrl } }]
                        ]
                    }
                });
            }

        }

        if (text === '/donate') {
            await bot.sendMessage(chatId, 'Деньгу закидуй мне по номеру телефона +79166944211')
        }
        if (text === '/users') {
            const users = await UserModel.findAll();
            await console.log(users[0].dataValues.id);
        }

    });
}

start();


