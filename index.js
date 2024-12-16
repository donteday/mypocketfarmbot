require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const TelegramBot = require('node-telegram-bot-api');
const sequelize = require('./db');
const UserModel = require('./models');
const userRoutes = require('./routes/userRoutes');
const updateGarden = require('./routes/updateGarden');
const findUser = require('./routes/findUser');
const fs = require('fs');
const https = require('https');

const app = express();
// const httpServer = createServer(app);
const httpsServer = https.createServer({
    key: fs.readFileSync('./server.cert'),
    cert: fs.readFileSync('./server.key')
  }, app);
const io = new Server(httpsServer, {
  cors: {
    origin: process.env.WEB_APP_URL || "http://89.104.69.78:5000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL || 'https://fluffy-boba-873f41.netlify.app/';

const bot = new TelegramBot(token, { polling: true });

// Middleware
app.use(cors({ origin: webAppUrl }));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/updateGarden', updateGarden);
app.use('/api/findUser', findUser);

// WebSocket handlers
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('getFriendFarm', async (friendChatId) => {
    try {
      const plants = await UserModel.findAll({ where: { userChatId: friendChatId } });
      socket.emit('friendFarmData', plants);
    } catch (error) {
      console.error('Error fetching friend farm:', error);
    }
  });

  socket.on('getUserData', async (chatId) => {
    try {
      const user = await UserModel.findOne({ where: { chatId } });
      if (user) {
        socket.emit('userData', user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });

  socket.on('stealPlant', async ({ plantId, friendChatId, chatId }) => {
    try {
      const plant = await Plant.findOne({ where: { id: plantId, userChatId: friendChatId } });
      if (plant && plant.growthStage > 0) {
        await plant.update({ growthStage: plant.growthStage - 1 });
        
        await Plant.create({
          name: plant.name,
          growthStage: 1,
          date: new Date(),
          riseTime: plant.riseTime,
          userChatId: chatId
        });

        io.to(friendChatId).emit('plantStolen', plant);
        socket.emit('plantStolen', plant);
      }
    } catch (error) {
      console.error('Error stealing plant:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Telegram bot handlers
bot.on('message', async (msg) => {
  const chatId = String(msg.chat.id);
  const text = msg.text;
  const userName = msg.chat.username;

  try {
    const existingUser = await UserModel.findOne({ where: { chatId, userName } });

    if (text === '/start') {
      if (!existingUser) {
        await UserModel.create({ chatId, userName });
        await bot.sendMessage(chatId, 'Приветствую тебя фермер!', {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Играть', web_app: { url: webAppUrl } }]
            ]
          }
        });
      } else {
        await bot.sendMessage(chatId, 'Жми кнопку играть, фермер!', {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Играть', web_app: { url: webAppUrl } }]
            ]
          }
        });
      }
    } else if (text === '/donate') {
      await bot.sendMessage(chatId, 'Деньгу закидуй мне по номеру телефона +79166944211');
    } else if (text === '/users') {
      const users = await UserModel.findAll();
      console.log(users[0].dataValues.id);
    }
  } catch (error) {
    console.error('Error handling Telegram message:', error);
  }
});

// Server startup
const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Соединение с базой данных установлено.');

    httpsServer.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
  }
};

startServer();