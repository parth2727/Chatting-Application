const mongoose = require('mongoose')
const bcrpty = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userschema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_url: {
        type: String,
        required: true
    },
    friends: {
        type: [String]
    }

})




/// we are hasing pw
userschema.pre('save', async function(next) {
    console.log("enter schema");

    if (this.isModified('password')) {
        console.log("save password function in");
        const salt = await bcrpty.genSalt(10);
        const hash = await bcrpty.hash(this.password, salt)
        this.password = hash;
        this.password = bcrpty.hash(this.password, 10);
    }
    next();

});
userschema.methods.generateAuthToken = async function() {
    try {
        let tokentha = jwt.sign({ _id: this._id }, process.env.KEY);
        this.tokens = this.tokens.concat({ token: tokentha });
        await this.save();
        return tokentha;
    } catch (err) {
        console.log(err);

    }
}

const User = mongoose.model('User', userschema);
module.exports = User;