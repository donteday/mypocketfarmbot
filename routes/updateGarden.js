const express = require('express');
const User = require('./../models');
const router = express.Router();

router.put('/:chatId', async (req, res) => {
    const { chatId } = req.params;
    const { dataGarden } = req.body;

    try {
        const user = await User.findOne({ where: { chatId } });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        user.dataGarden = dataGarden;
        await user.save;
        res.status(200).json({ dataGarden: user.dataGarden });
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
    }
});

module.exports = router;