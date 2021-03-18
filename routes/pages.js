const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

// router.get('/registrar', (req, res) => {
//     res.render('registrar');
// });

module.exports = router;
