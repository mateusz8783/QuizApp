const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: String,
    image: {
        type: String,
        required: false
    },
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            },
            image: {
                type: String,
                required: false
            },
        }
    ]
})

module.exports = mongoose.model('Question', QuestionSchema)