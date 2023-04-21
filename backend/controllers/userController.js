const user = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '2d' });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const logged_user = await user.login(email, password);
        const token = createToken(logged_user._id);
        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const created_user = await user.signup(name, email, password);
        const token = createToken(created_user._id);
        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({ 'error': error.message });
    }
}

module.exports = { loginUser, signupUser };