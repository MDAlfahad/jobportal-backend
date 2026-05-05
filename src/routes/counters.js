const express = require("express");
const db = require("../config/db");

const userauth = express.Router();

// GET USER ROLE COUNTS
userauth.get("/user-count", async (req, res) => {
  try {
    const [result] = await db.query(
      `
      SELECT auth_role, COUNT(*) as count
      FROM user_logindata
      GROUP BY auth_role
      `,
    );

    const stats = {
      user: 0,
      company: 0,
      admin: 0,
    };

    result.forEach((item) => {
      if (stats.hasOwnProperty(item.auth_role)) {
        stats[item.auth_role] = item.count;
      }
    });

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (err) {
    console.error("User Count Error:", err);

    res.status(500).json({
      success: false,
      error: "Database Error",
    });
  }
});

// from count 

userauth.get("/form_count", async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT COUNT(*) AS count FROM job_applications`
    );

    const stats = {
      applicationCount: result[0].count,
    };

    res.status(200).json({
      success: true,
      stats,
    });

  } catch (err) {
    console.log("Application Count error:", err);

    res.status(500).json({
      success: false,
      error: "Database error",
    });
  }
});
module.exports = userauth;
