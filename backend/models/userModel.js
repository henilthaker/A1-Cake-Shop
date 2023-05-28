// requiring packages and modules
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password)
        throw Error('All fields are required');
    const user = await this.findOne({ email });
    if (!user)
        throw Error('Incorrect email');
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        throw Error('Incorrect password');
    return user;
}

// static signup method
userSchema.statics.signup = async function (name, email, password, role) {
    if (!name || !email || !password)
        throw Error('All fields are mandatory');

    // check if email is a valid email if password is strong or not
    if (!validator.isEmail(email))
        throw Error('Please enter a valid email');
    if (!validator.isStrongPassword(password))
        throw Error('Password not string enough');

    // check if email is already in use or not
    const already_user = await this.findOne({ email });
    if (already_user)
        throw Error('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hash_pswd = await bcrypt.hash(password, salt);
    const user = await this.create({ name, email, password: hash_pswd, role });
    return user;
}
module.exports = mongoose.model('user', userSchema);