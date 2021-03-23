const express = require('express');
const { route } = require("./auth");

const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/funcionario', (req, res) => {
    res.render('homePageFuncionario.hbs');
});

router.get('/cadastroProduto', (req, res) => {
    res.render('cadastroProduto.hbs');
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;
