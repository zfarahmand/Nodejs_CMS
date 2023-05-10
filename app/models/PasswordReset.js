const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const passwordResetSchema = new mongoose.Schema({
    email: {type: String , required: true},
    token: {type: String , required: true},
    used: {type: Boolean , default: false}
} , {timestamps: {updatedAt: false}});




module.exports = new mongoose.model('Password_Reset' , passwordResetSchema);