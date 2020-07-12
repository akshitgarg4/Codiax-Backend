const express = require("express");
const router = express.Router();
const commentsAPI = require("../../../controllers/api/comments");
const passport = require("passport");

router.post('/',passport.authenticate('jwt',{session:false}),commentsAPI.createComment);

module.exports = router;
