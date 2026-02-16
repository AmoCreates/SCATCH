const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SCATCH';
mongoose.connect(MONGODB_URI)
.then( ()=> {
    dbgr("connect");
})
.catch((err) => {
    dbgr("MONGO_DB CONNECTION FAILED ",err)
    console.error('Connection error details:', err);
})

mongoose.connection.on('error', err => console.error('Mongoose error:', err));

module.exports = mongoose.connection;