const express = require("express");
const multer = require("multer");

const { sendImg } = require("../controller/vision.js");
const { simple } = require("../controller/simple.js");
const router = express.Router();
const upload = multer();

router.post("/vision", upload.single("photo"), sendImg);
router.post("/simple", simple);

module.exports = router;
