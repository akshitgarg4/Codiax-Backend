const express = require("express");
const router = express.Router();
const friendsAPI = require("../../../controllers/api/friends");
const passport = require("passport");


//post because it will take along the form inputs
router.get('/create_friendship',passport.authenticate('jwt',{session:false}), friendsAPI.create);
router.get('/remove_friendship',passport.authenticate('jwt',{session:false}), friendsAPI.remove);
router.get('/fetch_user_friends/:userId',passport.authenticate('jwt',{session:false}), friendsAPI.friends);




module.exports = router;
