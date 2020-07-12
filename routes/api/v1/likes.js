const express = require("express");
const router = express.Router();
const likesAPI = require("../../../controllers/api/likes");
const passport = require("passport");


//post because it will take along the form inputs
router.get('/toggle',passport.authenticate('jwt',{session:false}), likesAPI.toggleLike);

module.exports = router;
