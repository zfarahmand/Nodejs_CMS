require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , required: true , unique: true},
    password: {type: String , required: true , min: 8},
    admin: {type: Boolean , default: false}
} , {timestamps: true});

userSchema.pre('save' , function(next){
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS)).then((salt) => {
        bcrypt.hash(this.password, salt).then((hash) => {
            this.password = hash;
            next();
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

userSchema.methods.comparePasswords = function(password){
    return bcrypt.compare(password , this.password);
}

module.exports = new mongoose.model('User' , userSchema);