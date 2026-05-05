const express = require("express");
const db = require("../config/db");
const jobpostauth = require("../middleware/jobpostMiddleware");

const userRouter = express.Router();


// UPDATE LOGGED-IN USER DETAILS
userRouter.post("/user-details", jobpostauth, async (req, res) => {
  try {
    const user_id = req.user.id;

    const { name, contact, address } = req.body;

    const [result] = await db.query(
      `
      UPDATE user_logindata 
      SET 
        user_name = ?, 
        user_phone = ?, 
        user_address = ?
      WHERE user_id = ?
      `,
      [name, contact, address, user_id]
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      affectedRows: result.affectedRows,
    });

  } catch (err) {
    console.error("User Update Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// GET LOGGED-IN USER DETAILS
userRouter.get("/user-data", jobpostauth, async (req, res) => {
  try {
    const user_id = req.user.id;

    const [result] = await db.query(
      `
      SELECT 
        user_id,
        user_name,
        user_email,
        user_phone,
        user_address,
        auth_role
      FROM user_logindata
      WHERE user_id = ?
      `,
      [user_id]
    );

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: result[0],
    });

  } catch (err) {
    console.error("Fetch User Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GETTIN SEPARATE USER DATA ROM DB 
userRouter.get("/all-users", async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT 
        user_id,
        user_name,
        user_email,
        user_phone,
        user_address,
        auth_role,
        created_at
      FROM user_logindata
      WHERE auth_role = 'user'
    `);

    res.status(200).json({
      success: true,
      users,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


userRouter.get("/all-companies", async (req, res) => {
  try {
    const [companies] = await db.query(`
      SELECT 
        user_id,
        user_name,
        user_email,
        user_phone,
        user_address,
        auth_role,
        created_at
      FROM user_logindata
      WHERE auth_role = 'company'
    `);

    res.status(200).json({
      success: true,
      companies,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


module.exports = userRouter;