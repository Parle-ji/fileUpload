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

function isFileTypeSupported(fileType, suportedType) {
  return suportedType.includes(fileType);
}

const cloudinary = require("cloudinary").v2;

// const fileUploadToCloudinary = async (file, folder) => {

// };
async function fileUploadToCloudinary(file, folder, quality = 100) {
  const option = {
    folder,
    public_id: file.name, // Set the file name as public_id
    unique_filename: false, // Disable random name generation
    overwrite: true, // Overwrite existing file with same name
    resource_type: "auto",
    transformation: [{ quality }, { fetch_format: "auto" }],
  };

  return await cloudinary.uploader.upload(file.tempFilePath, option);
}
// image upload handler
exports.imageUpload = async (req, res) => {
  try {
    //data fetching
    const file = req.files.file;
    const { name, tags, email } = req.body;
    console.log(name, tags, email, file.name);
    // console.log(file);

    const suportedType = ["jpeg", "jpg", "png", "avif"];

    const fileType = file.name.split(".").pop().toLowerCase();
    // console.log(fileType);

    //validation
    if (!isFileTypeSupported(fileType, suportedType)) {
      return res.status(401).json({
        success: false,
        message: "file type not supported",
      });
    }

    // agar supported file hai to
    const responce = await fileUploadToCloudinary(file, "database");
    console.log(responce);
    const data = File({
      name,
      email,
      tags,
      imageUrl: responce.secure_url,
    });
    // console.log(data);
    const result = await data.save();
    return res.status(200).json({
      success: true,
      result,
      message: "image uploaded successfully",
    });
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({
      success: false,
      data: err.message,
      message: "internal server errr",
    });
  }
};

// video uploader

exports.videoUpload = async (req, res) => {
  try {
    //data fetching
    const { name, tags, email } = req.body;
    const file = req.files.file;
    // console.log(name, tags, email, file);

    // validation

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return res.status(402).json({
        success: false,
        message: "file size is too large",
      });
    }

    const fileType = file.name.split(".").pop().toLowerCase();
    console.log("filetype:-", fileType);
    const supportedType = ["mp4", "mov"];

    if (!isFileTypeSupported(fileType, supportedType)) {
      return res.status(400).json({
        success: false,
        message: "file type is not supported",
      });
    }

    // agar supported hai to
    // console.log("saving into cloude storage");
    const response = await fileUploadToCloudinary(file, "database");
    // console.log("response :-", response.secure_url);

    if (!response) {
      return res.status(401).json({
        success: false,
        message: "responce create krne me dikkat aayi.",
      });
    }

    // agar response aa gya cloude storage se to database me entry create kro
    const result = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });
    return res.status(200).json({
      success: true,
      data: response.secure_url,
      message: "file uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// image compresure

exports.imagecompression = async (req, res) => {
  try {
    const file = req.files.file;
    const { name, email, tags } = req.body;
    // console.log(name, email, tags, file);

    // vailidation
    const fileType = file.name.split(".").pop().toLowerCase();
    // console.log(fileType);
    const supportedType = ["png", "jpeg", "jpg"];

    if (!isFileTypeSupported(fileType, supportedType)) {
      return res.status(402).json({
        success: false,
        message: "filetype not supported",
      });
    }
    console.log("file supported");

    // reduce and upload into cloudinary
    const response = await fileUploadToCloudinary(file, "database", 10);
    console.log("URL:-", response.secure_url);

    // create entry in database
    const result = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    return res.status(200).json({
      success: true,
      data: response.secure_url,
      message: "image reduce and uploaded",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// video reducer

exports.videoReducer = async (req, res) => {
  try {
    const file = req.files.file;
    const { name, tags, email } = req.body;

    // console.log(name, tags, email);
    // console.log(file.name, file.size);

    // vailidation
    const supportedType = ["mp4", "3gp", "mov"];
    const fileType = file.name.split(".").pop().toLowerCase();
    console.log(fileType);

    if (!isFileTypeSupported(fileType, supportedType)) {
      return res.status(402).json({
        success: false,
        message: "file type not supported",
      });
    }
    //upload to cloudinary db
    console.log("file type supported");
    const response = await fileUploadToCloudinary(file, "database", 50);
    // console.log(response.secure_url);
    // console.log("response:-", response)

    //create entry in database
    const result = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });

    // success message
    return res.status(200).json({
      success: true,
      data: response.secure_url,
      message: "file uploaded to cloudinary",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
