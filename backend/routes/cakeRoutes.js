const express = require('express');
const { getAllCakes, getSingleCake, addCake, addComment, deleteCake, updateCake } = require('../controllers/cakeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// requireAuth for all cake routes
router.use(requireAuth);

router.get('/', (req, res) => {
    getAllCakes(req, res);
})
router.get('/:id', (req, res) => {
    getSingleCake(req, res);
})
router.post('/',(req, res) => {
    addCake(req, res);
})
router.delete('/:id', (req, res) => {
    deleteCake(req,res);
})
router.patch('/:id', (req, res) => {
    updateCake(req,res);
});

router.patch('/comments/:id', (req,res)=>{
    addComment(req,res);
})

module.exports = router;