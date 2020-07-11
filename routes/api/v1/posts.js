const express = require("express");
const router = express.Router();
const postAPI = require("../../../controllers/api/posts_api");

router.get('/', postAPI.index);

module.exports = router;
