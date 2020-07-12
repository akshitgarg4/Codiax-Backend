const express = require('express');
const router = express.Router();
router.use('/posts' , require('./posts'));
router.use('/users' , require('./user'));
router.use('/comments' , require('./comments'));

module.exports = router;