// routes/userRoutes.js
const express = require('express');
// const { User } = require('./../models'); // Импортируйте вашу модель User
const User = require('./../models');
const router = express.Router();

// Маршрут для получения данных пользователя по chatId
router.get('/:chatId', async (req, res) => {
    const { chatId } = req.params;
    try {
        const user = await User.findOne({ where: { chatId } });

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.status(200).json({ userData: user.userData });
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
        
    }
});

module.exports = router;