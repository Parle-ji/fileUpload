const express = require("express");
const router = express.Router();

//imageUpload , videoUpload, imageReducer,
const { localFileUpload, imageUpload, videoUpload } = require("../controllers/fileUpload");


router.get("/test", (req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome to test route"
    })
})


router.post("/localfileupload", localFileUpload);
router.post('/imageUpload',imageUpload);
router.post('/videoupload', videoUpload)

module.exports = router;
