const express = require("express");
const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadImage = express.Router();

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

uploadImage.post(
  "/upload_photo",
  upload.single("image"),
  (req, res) => {
    try {
      const filename = req.file.filename;
      const userId = req.body.userId;

      db.query(
        "UPDATE user_logindata SET user_image = ? WHERE user_id = ?",
        [filename, userId],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to Upload Image",
            });
          }

          const fileUrl = `${req.protocol}://${req.get(
            "host"
          )}/uploads/${filename}`;

          res.json({
            success: true,
            message: "Uploaded Successfully",
            file: fileUrl,
          });
        }
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = uploadImage;   
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
