const express = require("express");
const router = express.Router();
const userAPI = require("../../../controllers/api/users");
const passport = require("passport");


//post because it will take along the form inputs
router.post('/login', userAPI.login);
router.post('/signup', userAPI.signup);
router.post('/edit',passport.authenticate('jwt',{session:false}), userAPI.edit);
router.post('/:userId',passport.authenticate('jwt',{session:false}), userAPI.profile);
router.get('/search',passport.authenticate('jwt',{session:false}), userAPI.search);






module.exports = router;
