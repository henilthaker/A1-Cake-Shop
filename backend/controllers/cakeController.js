const mongoose = require('mongoose');
const cake = require('../models/cakeModel');
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
        const added_cake = await cake.create({ title, price});
        // if (!added_cake)
        //     res.status(300).json({ 'mssg': 'error in adding the cake' });
        res.status(200).json({ added_cake });
    } catch (err) {
        res.status(200).json({ 'error': err.message });
    }
}
module.exports = { getAllCakes, getSingleCake, addCake };