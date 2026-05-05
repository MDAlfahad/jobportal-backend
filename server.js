const express = require("express");
require("dotenv").config();

const { connectdb } = require("./src/config/db");

const app = require("./src/app");
const PORT = process.env.PORT || 3000;

(async () => {
  app.listen(PORT, () => {
    
    console.log(`server running on port ${PORT}]`);
  });
})();
