const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');


mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then( ()=> {
    dbgr("connect");
})
.catch((err) => {
    dbgr("MONGO_DB CONNECTION FAILED ",err)
})

module.exports = mongoose.connection;