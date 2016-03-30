var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, lowercase: true, unique: true, required: true},
    password: {type: String, required: true},
    admin: {type:Boolean, default: false},
    email: String
})

var User = mongoose.model('User', userSchema);

module.exports = User
