const express = require("express");
const db = require("../config/db");

const applicationRouter = express.Router();

applicationRouter.get("/application/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM job_applications WHERE application_id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.status(200).json({
        success: true,
        applications: result,
      });
    }
  );
});

module.exports = applicationRouter;