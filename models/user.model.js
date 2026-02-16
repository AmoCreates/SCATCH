const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,

    email: String,

    password: String,

    contact: Number,

    picture: String,

    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product'
    }],
    
    orders: []
});

module.exports = mongoose.model('user', userSchema)