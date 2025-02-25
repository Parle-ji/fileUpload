const express = require("express");
const router = express.Router();

//imageUpload , videoUpload, imageReducer,
const { localFileUpload } = require("../controllers/fileUpload");


router.get("/test", (req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome to test route"
    })
})
router.post("/localfileupload", localFileUpload);

module.exports = router;
