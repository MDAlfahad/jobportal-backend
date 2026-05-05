const express = require("express");
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

const uploadImage = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

uploadImage.post("/upload_photo", upload.single("image"), (req, res) => {
  const filename = req.file.filename;
  const userId = req.body.userId;

  db.query(
    "UPDATE user_logindata SET user_image = ? WHERE user_id = ?",
    [filename, userId],
    (err, result) => {
      if (err) return res.status(500).json({
        success: false,
        message: "Failed to Upload Image"
      });

      res.json({
        sucess:true,
        message: "Uploaded Successfully",
        file: filename,
      });
    },
  );
});

uploadImage.post("/companyDetails", upload.single("image"), (req, res) => {
  const { address, number, userId } = req.body;

  const filename = req.file.filename;
  db.query(
    "UPDATE user_logindata SET user_address=?, user_phone=?, user_image=? WHERE user_id=?",
    [address, number, filename, userId],
    (err, result)=>{
      if(err) return res.status(500).json({
        success: false,
        message: "Failed to upload Image"
      });

      res.json({
        success:true,
        message: "Uploaded sucessfuly",
        
      });
    },
  );
});

module.exports = uploadImage;
