const express = require("express");
const authRoute = require("../src/middleware/auth.middleware");
const jobpost = require("./routes/jobPostRoute");
const userRouter = require("./routes/userDetailsRoute");
const jobdata = require("./routes/jobDataRoute");
const cors = require("cors");
const userauth = require("./routes/counters");
const applyForm = require("./routes/formApply");
const path = require("path");
const mailrouter = require("./routes/mailRoute");
const uploadImage = require("./routes/photoUploadRoute");

const app = express();
app.use(express.json());

<<<<<<< HEAD
app.use(cors({
  origin: "https://jobportal-frontend-one-theta.vercel.app",
  credentials: true
}));
=======
app.use(cors());
>>>>>>> f39a0e9ae6cea790d64d45d7ffb1a0d9a04b9e5e

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

//using routes

app.use("/api", authRoute);
app.use("/api", jobpost);
app.use("/api", userRouter);
app.use("/api", jobdata);
app.use("/api", userauth);
app.use("/api", applyForm);
app.use("/api", mailrouter);
app.use("/api", uploadImage);

module.exports = app;
