const sgMail = require("@sendgrid/mail");
const config = require("./../libs/config.js");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (to, from, subject, html) => {
  //   const msg = {
  //     to: "test@example.com",
  //     from: "test@example.com",
  //     subject: "Sending with Twilio SendGrid is Fun",
  //     text: "and easy to do anywhere, even with Node.js",
  //     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  //   };
  sgMail.send({
    to,
    from,
    subject,
    html,
  });
};
