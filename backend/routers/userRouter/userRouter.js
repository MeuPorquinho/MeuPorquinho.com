const express = require('express');
const userService = require('../../services/userService/userService');

const router = express.Router();

router.post('/login', userService.login)
router.post('/register', userService.register)
router.put('/financial-manager', userService.saveFinances)
router.get('/', userService.getUsers);
router.delete('/:username', userService.deleteUser);

module.exports = router;