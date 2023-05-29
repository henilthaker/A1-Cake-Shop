const mongoose = require('mongoose');
const cake = require('../models/cakeModel');
const user = require('../models/userModel');

const getAllCakes = async (req, res) => {
    //min price and max price will be in the form of string so parse them and convert them to integer
    const min_price = parseInt(req.query.min_price);
    const max_price = parseInt(req.query.max_price);

    // even the below line will work i.e. it will work if you don't parse and keep them as string but it is better to parse to avoid any error
    // const {min_price, max_price} = req.query;
    
    const all_cakes = await cake.find({price:{
        $lte:max_price,
        $gte:min_price
    }});
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
    const { title, price, image } = req.body;
    const empty_fields = [];
    if (!title)
        empty_fields.push('title');
    if (!price)
        empty_fields.push('price');
    if (empty_fields.length > 0)
        return res.status(400).json({ empty_fields, 'error': 'please fill all the fields' });
    // in above line "return" is very important
    try {
        const added_cake = await cake.create({ title, price, image });
        // if (!added_cake)
        //     res.status(300).json({ 'mssg': 'error in adding the cake' });
        res.status(200).json(added_cake);
    } catch (err) {
        res.status(300).json({ 'error': err.message });
    }
}

const addComment = async (req, res) => {
    try {
        const cake_id = req.params.id;
        const user_id = req.user._id;
        const cur_user = await user.findById(user_id);
        const { description } = req.body;
        const username = cur_user.name;
        // const comments = await cake.findById(cake_id).select('comments');
        // above line will even if I am selecting only comments, it by default includes _id property.
        const cur_cake = await cake.findById(cake_id);
        // console.log(cur_cake);
        cur_cake.comments.push({ user_id, username, description });
        await cur_cake.save();
        res.status(200).json({ 'message': 'comment added successfully' });
    } catch (error) {
        res.status(300).json({ 'error': error.message });
    }

}
const deleteCake = async (req, res) => {
    try {
        const cake_id = req.params.id;
        const user_id = req.user._id;
        const cur_user = await user.findById(user_id);
        if (cur_user.role !== 'admin')
            return res.status(300).json({ 'error': 'you are not autorized to delete the cake' });

        if (!mongoose.Types.ObjectId.isValid(cake_id))
            return res.status(300).json({ 'error': 'invalid doc id' });
        else {
            const deleted_cake = await cake.findByIdAndDelete(cake_id);
            if (!deleted_cake)
                return res.status(404).json({ 'error': 'cake not found' });
            return res.status(200).json(deleted_cake);
        }
    } catch (error) {
        res.status(300).json({ 'error': error.message });
    }
}

const updateCake = async (req, res) => {
    try {
        const cake_id = req.params.id;
        const user_id = req.user._id;
        const cur_user = await user.findById(user_id);
        if (cur_user.role !== 'admin')
            return res.status(300).json({ 'error': 'you are not autorized to delete the cake' });

        if (!mongoose.Types.ObjectId.isValid(cake_id))
            return res.status(300).json({ 'error': 'invalid doc id' });
        else {
            const updated_cake = await cake.findOneAndUpdate({ _id: cake_id }, { ...req.body });
            if (!updated_cake)
                return res.status(404).json({ 'error': 'cake not found' });
            return res.status(200).json(updated_cake);
        }
    } catch (error) {
        res.status(300).json({ 'error': error.message });
    }
}
module.exports = { getAllCakes, getSingleCake, addCake, addComment, deleteCake, updateCake };