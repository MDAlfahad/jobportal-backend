const express = require("express");
const mailrouter = express.Router();
const sendEmail = require("../config/mail");

mailrouter.post("/sendMail", async (req, res) => {
  try {
    const { name, email, position, companyName, companyEmail } = req.body;

    if (!name || !email || !position || !companyEmail) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    // Email to User
    await sendEmail(
      email,
      "Application Received – Thank You for Applying",
      `
      <h2>Dear ${name}</h2>
      <p>Thank you for applying for the position of <b>${position}</b> at <b>${companyName}</b></p>
      
      <p>We have successfully received your application and our recruitment team is currently reviewing your profile.</p>
      <h2><b>Application Details:</b></h2>
      
      <p><b>Position: </b> ${position}</p>
       <p> <b>Company:</b> ${companyName}</p>
       <p> <b>Applied On:</b> ${new Date().toLocaleDateString()}</p>
      <p>If your qualifications match our requirements, we will contact you regarding the next steps.</p>
      <p>We appreciate your interest in joining our team and wish you the best of luck.</p>
      <p>Best Regards,</p>
      <p><b>${companyName}</b> Hiring Tream</p>
      <p><b>${companyEmail}</b></p>

      `,
    );

    // Email to Company
    await sendEmail(
      companyEmail,
      `New Job Applicatant recieved - ${position}`,
      `
      <h2>New Job Application Received – ${position}</h2>
      <h3>Dear Hiring Team,</h3>
      <p>${name} has applied for the position of ${position}.</p>
      <h2>Candidate Details</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Applied on: ${new Date().toLocaleDateString()}</p>
      `, 
    );

    res.status(200).json({
      success: true,
      message: `${name}, you successfully applied for ${position}`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Application failed",
    });
  }
});

// subscribe route

mailrouter.post("/subscribe", async (req,res)=>{
  try{
    const{email} = req.body
    if(!email){
      return res.status(400).json({
        success: false,
        message: "Email Required",
      });
    };
    await sendEmail(
      email,
      "Thankyou for subscribing—JOB PORTAL",

      `
      <h3>Subscribed for Job Alerts</h3>
      <p>Get the latest job openings and career updates directly in your inbox.</p>

      <div><h4>JOB PORTAL</h4>
      <p><b>jobportal.com</b></p>
      </div>
      `

    )
    res.status(200).json({
      success: true,
      message: "Sucessfully Subscribed !"
    })
  }catch(error){
    console.log("Subscribed Failed !", error)
  }
})

module.exports = mailrouter;
