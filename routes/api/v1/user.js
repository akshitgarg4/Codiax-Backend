const express = require("express");
const router = express.Router();
const userAPI = require("../../../controllers/api/users");

//post because it will take along the form inputs
router.post('/login', userAPI.createsession);
router.post('/signup', userAPI.signup);



module.exports = router;
