const express = require("express");
const router = express.Router();
const postAPI = require("../../../controllers/api/posts");
const passport = require("passport");

router.get('/',passport.authenticate('jwt',{session:false}),postAPI.getPosts);
router.post('/create',passport.authenticate('jwt',{session:false}) ,postAPI.createPost);


module.exports = router;
