const sendEmail = require("../config/mail");

const sendApplicationMail = async ({
  name,
  email,
  position,
  companyName,
  companyEmail,
}) => {

  // User Mail
  await sendEmail(
    email,
    "Application Received – Thank You for Applying",

    `
      <h2>Dear ${name}</h2>

      <p>
        Thank you for applying for the position of 
        <b>${position}</b> at <b>${companyName}</b>
      </p>

      <p>
        We have received your application successfully.
      </p>

      <p><b>Applied On:</b> ${new Date().toLocaleDateString()}</p>

      <br/>

      <p>Best Regards</p>
      <p>${companyName}</p>
    `
  );

  // Company Mail
  await sendEmail(
    companyEmail,
    `New Job Applicant Received - ${position}`,

    `
      <h2>New Application Received</h2>

      <p>${name} applied for ${position}</p>

      <p><b>Email:</b> ${email}</p>
    `
  );
};

module.exports = sendApplicationMail;