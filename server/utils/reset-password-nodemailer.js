const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// const {EMAIL_SERVICE_USER, EMAIL_SERVICE_PASS} = process.env;

// console.log("hello",EMAIL_SERVICE_USER, EMAIL_SERVICE_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SERVICE_USER,
    pass: process.env.EMAIL_SERVICE_PASS,
  },
});

const sendMail = async (emailFrom,emailTo, message) => {
  try {
    const info = await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: "Reset Password",
      text: message,
    });

    console.log("message sent", info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
