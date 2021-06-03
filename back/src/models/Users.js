const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    token: String,
    image: {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('User', UsersSchema)