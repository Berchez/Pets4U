const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");

dotenv.config({ path: './.env' });

console.log(__dirname);

const app = express();

var db = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

module.exports = db;

const publiDirectory = path.join(__dirname, './public');
app.use(express.static(publiDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse Json bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');


//Define Routes
app.use('/', require('./routes/pages.js'));
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
    console.log("Server started");
});