const express = require("express");
const db = require("../config/db");

const jobdata = express.Router();

jobdata.get("/jobdata", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM job_postdata");

    res.status(200).json(result);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

jobdata.post("/delete-job", (req, res) => {
  const { job_id } = req.body;

  if (!job_id) {
    return res.status(400).json({
      success: false,
      message: "Job ID is required",
    });
  }

  try{
    const sql = "DELETE FROM job_postdata WHERE job_id = ?";

  db.query(sql, [job_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  });
  } catch(err){
    return res.status(404).json({
      message: "Database Error"
    })
  }
});
module.exports = jobdata;
