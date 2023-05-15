const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , required: true , unique: true},
    password: {type: String , required: true , min: 8},
    admin: {type: Boolean , default: false},
    rememberToken: {type: String , default: null}
} , {timestamps: true});

userSchema.pre('save' , function(next){
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS)).then((salt) => {
        bcrypt.hash(this.password, salt).then((hash) => {
            this.password = hash;
            next();
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

userSchema.pre('findOneAndUpdate' , function(next){
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS)).then((salt) => {
        bcrypt.hash(this.getUpdate().password, salt).then((hash) => {
            this.getUpdate().password = hash;
            next();
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

userSchema.methods.comparePasswords = function(password){
    return bcrypt.compare(password , this.password);
}

userSchema.methods.setRememberToken = function(req , res) {
    const rememberToken = uniqueString();

    res.cookie('remember_token' , rememberToken , {
        maxAge: process.env.REMEMBER_EXPIRE,
        httpOnly: true,
        signed: true
    });
    this.updateOne({rememberToken: rememberToken}).catch(err => console.log(err));
}

module.exports = new mongoose.model('User' , userSchema);