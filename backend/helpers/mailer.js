const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oAuthLink = "https://developers.google.com/oauthplayground";
const {
  EMAIL,
  MAILING_ID,
  MAILING_SECRECT,
  MAILING_REFRESH_TOKEN,
  MAILING_ACCESS_TOKEN,
} = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRECT,
  MAILING_REFRESH_TOKEN,
  oAuthLink
);

exports.sendVerificationEmail = async (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH_TOKEN,
  });
  const accessToken = auth.getAccessToken();
  const smtp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRECT,
      refreshToken: MAILING_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Email Verification for Social Media.",
    html: ` <div style="max-width: 600px"> <div style=" display: flex; column-gap: 24px; border-bottom: 1px solid #000; padding-bottom: 13px; " > <div style="width: 40px; height: 40px"> <img style="width: 100%; display: inline-block" src="https://i.ibb.co/LrvvfQM/twitter.png" alt="" /> </div> <p style="font-family: sans-serif">Confirm Email</p> </div> <p style="font-family: sans-serif">Hi ${name},</p> <p style="font-family: sans-serif"> Thanks for sign up in Facebook. Please verify your email by click confirm to continue </p> <p style="font-family: sans-serif">Verification Link:</p> <a href="${url}" style=" font-family: sans-serif; padding: 5px 33px; color: #fff; background: #0c88ef; text-decoration: none; display: inline-block; " >Confirm</a > <p style="font-family: sans-serif"> from CIT ©️ Facebook. CIT Platforms, Inc., Attention: Community Support, 1 Facebook Way, Menlo Park, CA 94025 This message was sent to shawon@gmail.com. To help keep your account secure, please don't forward this email. </p> </div>`,
  };
  smtp.sendMail(mailOptions, (error, response) => {
    if (error) return error;
    return response;
  });
};
