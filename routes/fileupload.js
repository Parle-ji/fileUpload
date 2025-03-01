const express = require("express");
const router = express.Router();

//imageUpload , videoUpload, imageReducer,
const { localFileUpload, imageUpload } = require("../controllers/fileUpload");


router.get("/test", (req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome to test route"
    })
})


router.post("/localfileupload", localFileUpload);
router.post('/imageUpload',imageUpload);


module.exports = router;
