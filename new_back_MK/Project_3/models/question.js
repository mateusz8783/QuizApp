var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

var db = mongoose.connection;

// User Schema
var QuestionSchema = mongoose.Schema({
	question: {
		type: String,
		index: true
	},
	answer_1: {
		type: String
	},
	answer_2: {
		type: String
	},
	answer_3: {
		type: String
	},
	corr_ans: {
		type: String
	},
	owner: {
		type: String
	},
	profileimage:{
		type: String
	}
});

var Question = module.exports = mongoose.model('Question', QuestionSchema);

module.exports.createQuestion = function(newQuestion, callback){
	newQuestion.save(callback);
	console.log("Question created")
}
