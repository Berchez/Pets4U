const express = require('express');
const db = require('../app');
const { route } = require("./auth");

const router = express.Router();


router.get('/', (req, res) => {
    db.query('SELECT * FROM Produto WHERE 1', function(err, results, fields) {
        if (err) throw err;
        res.render('homepage', { data: results });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/cadastroProduto', (req, res) => {
    res.render('cadastroProduto.hbs');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/carrinho', (req, res) => {
    res.render('carrinho');
});

router.get('/removeProduto', (req, res) => {
    res.render('removeProduto');
});

module.exports = router;