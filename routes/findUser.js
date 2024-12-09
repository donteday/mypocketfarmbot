const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Импортируйте вашу модель пользователя

router.get('/users', async (req, res) => {
        const { search } = req.query; // Получаем параметр поиска из запроса

        try {
                const users = await User.findAll({
                        where: {
                                userName: {
                                        [Op.like]: `%${search}%` // Используем оператор LIKE для поиска по имени пользователя
                                }
                        },
                        limit: 6 // Ограничиваем результат 6 пользователями
                });

                return res.json(users);
        } catch (error) {
                console.error('Ошибка при получении пользователей:', error);
                return res.status(500).json({ message: 'Ошибка сервера' });
        }
});

module.exports = router;