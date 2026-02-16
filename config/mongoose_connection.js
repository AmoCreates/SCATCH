const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SCATCH';
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    family: 4,                           
    retryWrites: true,
    w: 'majority',
})
.then( ()=> {
    dbgr("connect");
})
.catch((err) => {
    dbgr("MONGO_DB CONNECTION FAILED ",err)
    console.error('Connection error details:', err);
})

module.exports = mongoose.connection;