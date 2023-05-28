const express = require('express');
const multer = require('multer');
const { getAllCakes, getSingleCake, addCake, addComment, deleteCake, updateCake } = require('../controllers/cakeController');
const fs = require('fs');
const path = require('path');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage:storage});

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