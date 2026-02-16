const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: String,

    email: String,

    password: String,

    contact: Number,

    gstin: String,

    product: [],

    picture: String,

});

module.exports = mongoose.model('owner', ownerSchema)