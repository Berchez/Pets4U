const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.post('/cadastroProduto', authController.cadastroProduto);

router.post('/gomePageFuncionario', authController.login);


module.exports = router;