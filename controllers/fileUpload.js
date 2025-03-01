const File = require("../models/file");

// local file handler

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
   // console.log("file aa gyi", file);
    // kis path pr store krna hai
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    //console.log(path);
    // move the file
    file.mv(path, (err) => {
      console.log(err);
    });

    res.status(200).json({
      success: true,
      message: "local file uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
      data: err,
    });
  }
};



