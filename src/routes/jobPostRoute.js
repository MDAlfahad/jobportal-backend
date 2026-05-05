const express = require("express");
const db = require("../config/db");
const { v4: uuidv4, validate: Uuid } = require("uuid");
const jobpostauth = require("../middleware/jobpostMiddleware");

const postjob = express.Router();


// POST JOB
postjob.post("/postjob", jobpostauth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const job_id = uuidv4();

    const {
      desigination,
      companyname,
      companyEmail,
      locationtype,
      worktype,
      location,
      startdate,
      annualCTC,
      experience,
      jobtype,
      certificate,
      vacancies,
      joboffering,
      applyby,
      aboutthisjob,
      requirements,
      skills,
      aboutcompany,
    } = req.body;

    const sql = `
      INSERT INTO job_postdata 
      (
        job_id,
        job_desigination,
        company_email,
        company_name,
        job_location,
        location_type,
        job_workingtype,
        job_type,
        job_startdate,
        job_ctc,
        job_experience,
        certifications,
        job_vacancies,
        job_offering,
        job_lastdate,
        job_description,
        job_requirements,
        job_skills,
        about_company,
        user_id
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const values = [
      job_id,
      desigination,
      companyEmail,
      companyname,
      location,
      locationtype,
      worktype,
      jobtype,
      startdate,
      annualCTC,
      experience,
      certificate,
      vacancies,
      joboffering,
      applyby,
      aboutthisjob,
      requirements,
      skills,
      aboutcompany,
      user_id,
    ];

    await db.query(sql, values);

    res.status(201).json({
      status: true,
      message: "Job posted successfully",
      job_id,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
});


// FETCH JOBS POSTED BY LOGGED-IN USER
postjob.get("/jobpostdata", jobpostauth, async (req, res) => {
  try {
    const user_id = req.user.id;

    const [result] = await db.query(
      "SELECT * FROM job_postdata WHERE user_id = ?",
      [user_id]
    );

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error" });
  }
});


// FETCH ALL JOBS
postjob.get("/jobdata", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM job_postdata");

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database Error" });
  }
});


// FETCH JOB BY ID
postjob.get("/jobdata/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!Uuid(id)) {
      return res.status(400).json({
        error: "Invalid job ID format",
      });
    }

    const [result] = await db.query(
      "SELECT * FROM job_postdata WHERE job_id = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    res.json(result[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

module.exports = postjob;