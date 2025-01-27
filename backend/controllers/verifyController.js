const { transporter } = require('../config/email')

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "",
    subject: "Verify you email",
    text: "This is a test email",
  };

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
});

 