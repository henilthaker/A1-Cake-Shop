const express = require('express');
const router = express.Router();
const { getAllCakes, getSingleCake, addCake } = require('../controllers/cakeController');

router.get('/', (req, res) => {
    getAllCakes(req, res);
})
router.get('/:id', (req, res) => {
    getSingleCake(req, res);
})
router.post('/', (req, res) => {
    addCake(req, res);
})
router.delete('/:id', (req, res) => {
    res.json({ mssg: 'delete a cake' });
})
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'update a cake' });
});

module.exports = router;