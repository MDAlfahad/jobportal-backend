const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// REGISTER NORMAL USER
router.post("/register_User", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(500).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const [existing] = await db.query(
      "SELECT user_id FROM user_logindata WHERE user_email = ?",
      [email],
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const userid = uuidv4();
    const hashpass = await bcrypt.hash(password, 12);

    await db.query(
      `
      INSERT INTO user_logindata
      (
        user_id,
        user_name,
        user_email,
        user_password,
        user_status,
        auth_role
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [userid, name, email, hashpass, 1, "user"],
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Register User Error:", err);

    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// REGISTER COMPANY
router.post("/register_company", async (req, res) => {
  try {
    const { name, email, password, mobilenumber } = req.body;

    const [existing] = await db.query(
      "SELECT user_id FROM user_logindata WHERE user_email = ?",
      [email],
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const userid = uuidv4();
    const hashpass = await bcrypt.hash(password, 12);

    await db.query(
      `
      INSERT INTO user_logindata
      (
        user_id,
        user_name,
        user_email,
        user_password,
        user_phone,
        user_status,
        auth_role
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [userid, name, email, hashpass, mobilenumber, 1, "company"],
    );

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
    });
  } catch (err) {
    console.error("Register Company Error:", err);

    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// LOGIN USER / COMPANY
router.post("/login_users", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [results] = await db.query(
      "SELECT * FROM user_logindata WHERE user_email = ?",
      [email],
    );

    if (results.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.user_password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        role: user.auth_role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const { user_password, ...safeUser } = user;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
