const mongoose = require('mongoose');
const cake = require('../models/cakeModel');
const user = require('../models/userModel');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// const upload = multer({storage:storage});

const getAllCakes = async (req, res) => {
    const all_cakes = await cake.find({});
    res.status(200).json(all_cakes);
}

const getSingleCake = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        res.status(300).json({ 'error': 'invalid doc id' });
    else {
        const single_cake = await cake.findById(id);
        if (!single_cake)
            res.status(404).json({ 'mssg': 'no such cake found' });
        res.status(200).json(single_cake);
    }
}

const addCake = async (req, res) => {
    const { title, price } = req.body;
    // const img = {
    //     data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
    //     contentType: 'image/png'
    // }
    const empty_fields = [];
    if (!title)
        empty_fields.push('title');
    if (!price)
        empty_fields.push('price');
    if (empty_fields.length > 0)
        return res.status(400).json({ empty_fields, 'error': 'please fill all the fields' });
    // in above line "return" is very important
    try {
        const added_cake = await cake.create({ title, price });
        // if (!added_cake)
        //     res.status(300).json({ 'mssg': 'error in adding the cake' });
        res.status(200).json({ added_cake });
    } catch (err) {
        res.status(200).json({ 'error': err.message });
    }
}

const addComment = async (req, res) => {
    try {
        const cake_id  = req.params.id;
        const user_id  = req.user._id;
        const cur_user = await user.findById(user_id);
        const {description} = req.body;
        const username = cur_user.name;
        // const comments = await cake.findById(cake_id).select('comments');
        // above line will even if I am selecting only comments, it by default includes _id property.
        const cur_cake = await cake.findById(cake_id);
        // console.log(cur_cake);
        cur_cake.comments.push({ user_id, username, description });
        await cur_cake.save();
        res.status(200).json({'message':'comment added successfully'});
    } catch (error) {
        res.status(300).json({ 'error': error.message });
    }
}
module.exports = { getAllCakes, getSingleCake, addCake, addComment };