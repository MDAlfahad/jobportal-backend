const express = require("express");
const db = require("../config/db")
const { v4: uuidv4 } = require("uuid");
const formRoute = express.Router();
formRoute.use(express.json());

formRoute.post("/form", (req, res)=>{

    const[name, email, prefrences, contact,] = req.body;
})