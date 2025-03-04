const express = require("express");
const router = express.Router();

//imageUpload , videoUpload, imageReducer,
const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imagecompression,
  videoReducer,
} = require("../controllers/fileUpload");

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "welcome to test route",
  });
});

router.post("/localfileupload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoupload", videoUpload);
router.post("/imagecompression", imagecompression);
router.post("/videoreducer", videoReducer);

module.exports = router;
