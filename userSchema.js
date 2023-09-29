const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    about: {
        type: String,
        required: true
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;