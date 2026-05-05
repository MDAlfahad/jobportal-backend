const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db");
const authMiddleware = require("../middleware/jobpostMiddleware");
const { v4: uuidv4 } = require("uuid");

const applyForm = express.Router();

//job application post

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();

    const baseName = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")
      .replace(/[^\w\-]/g, "")
      .toLowerCase();
    const uniqueName = `${baseName}_${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("INVALID_FILE_TYPE"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: fileFilter,
});

const uploadMiddleware = (req, res, next) => {
  const uploadSingle = upload.single("resume");

  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File is too large. Maximum size is 5MB." });
      }
      return res.status(400).json({ message: "File upload error." });
    } else if (err && err.message === "INVALID_FILE_TYPE") {
      return res.status(400).json({
        message: "Invalid file type. Only PDF and Word docs are allowed.",
      });
    } else if (err) {
      return res.status(500).json({ message: "Unknown upload error." });
    }
    next();
  });
};

applyForm.post("/apply-form", uploadMiddleware, async (req, res) => {
  try {
    const {
      number,
      jobId,
      userId,
      username,
      companyId,
      useremail,
      companyname,
      jobdesigination,
      availability,
      travel,
      experience,
    } = req.body;

    if (!jobId || !userId) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume." });
    }
    const resumePath = req.file.filename;
    const appliationId = uuidv4();
    const sqlQuery = `
        INSERT INTO job_applications (application_id,job_id, company_name, user_name,company_id, user_email, user_contact, job_desigination, student_id, availability, travel, experience, resume_path) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
      `;

    const values = [
      appliationId,
      jobId,
      companyname,
      username,
      companyId,
      useremail,
      number,
      jobdesigination,
      userId,
      availability,
      travel,
      experience,
      resumePath,
    ];

    const result = await db.execute(sqlQuery, values);

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
      applicationId: result.insertId,
    });
  } catch (error) {
    console.error("Error submitting application:", error);

    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("Failed to delete orphaned file:", cleanupError);
      }
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});

//job aplicaiton get

applyForm.get("/my-applications", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
    const offset = (page - 1) * limit;

    const [rows] = await db.execute(
      `
  SELECT 
    ja.application_id,
    ja.company_name,
    ja.job_desigination,
    ja.applied_at,
    ja.resume_path,
    ja.status
  FROM job_applications ja
  JOIN job_postdata j ON ja.job_id = j.job_id
  WHERE ja.student_id = ?
  ORDER BY ja.applied_at DESC
  LIMIT ${limit} OFFSET ${offset}
  `,
      [studentId],
    );

    res.status(200).json({
      success: true,
      applications: rows,
      page,
      limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

//company applicaiton

applyForm.get("/company-applications", authMiddleware, async (req, res) => {
  try {
    const companyId = req.user.id;

    const [rows] = await db.execute(
      `
      SELECT 
        application_id,
        company_name,
        user_name, 
        user_email,
        job_desigination,
        applied_at,
        resume_path,
        status,
        student_id
      FROM job_applications
      WHERE company_id = ?
      ORDER BY applied_at DESC
      `,
      [companyId],
    );

    res.status(200).json({
      success: true,
      applications: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch company applications" });
  }
});
//update application status
applyForm.put("/update-status/:id", authMiddleware, async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    await db.execute(
      "UPDATE job_applications SET status = ? WHERE application_id = ?",
      [status, applicationId],
    );

    res.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = applyForm;
