const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/scatch';
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then( ()=> {
    dbgr("connect");
})
.catch((err) => {
    dbgr("MONGO_DB CONNECTION FAILED ",err)
})

module.exports = mongoose.connection;