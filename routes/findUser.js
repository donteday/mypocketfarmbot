const express = require('express');
const router = express.Router();
const User = require('./../models');
const { Op } = require('sequelize');

router.get('/:search', async (req, res) => {
        const { search } = req.params; // Получаем параметр поиска из запроса
        console.log(search);
        
        try {
                const users = await User.findAll({
                        where: {
                                userName: {
                                        [Op.iLike]: `%${search}%` // Используем оператор LIKE для поиска по имени пользователя
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