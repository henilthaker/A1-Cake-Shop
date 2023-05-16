const jwt = require('jsonwebtoken');
const user = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(200).json({ 'error': 'Autorization token required' });

    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        req.user = await user.findById(id).select('_id');        
    } catch (error) {
        return res.status(401).json({'error':'Wrong Authorization Token'});
    }
    next();
}
module.exports = requireAuth;