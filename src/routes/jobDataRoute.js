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

module.exports = jobdata;