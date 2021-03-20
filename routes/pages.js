const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

// router.get('/registrar', (req, res) => {
//     res.render('registrar');
// });

module.exports = router;
