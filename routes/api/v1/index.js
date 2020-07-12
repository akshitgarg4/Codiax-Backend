const express = require('express');
const router = express.Router();
router.use('/posts' , require('./posts'));
router.use('/users' , require('./user'));
router.use('/comments' , require('./comments'));
router.use('/friendship' , require('./friends.js'));
router.use('/likes' , require('./likes.js'));


module.exports = router;