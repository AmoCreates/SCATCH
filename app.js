const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path'); 
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

const db = require('./config/mongoose_connection');
const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/indexRouter');

const app = express();
const port = 3000;

aapp.set('views', path.join(process.cwd(), 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());

app.use('/', indexRouter);
app.use('/owner', ownerRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter);

module.exports = app;