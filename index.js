"use strict";
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
let port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Mailer");
});
app.get("/mailer/:email/:data", (req, res) => {
  mail(req.params.email, req.params.data).catch((e) => {
    res.send(e);
  });
});
app.listen(port, () => {
  console.log(`Example app is listening on port https://localhost:${port}`);
});
async function mail(to, data) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "mimify.mailer@gmail.com",
      pass: "mimify@mailer123456",
    },
  });
  let info = await transporter.sendMail({
    from: '"verifier mimify " mimify.mailer@gmail.com', // sender address
    to: to, // list of receivers
    subject: "Hello ✔", // Subject line
    text: data, // plain text body
    html: `<b>${data}</b>`, // html body
  });
  console.log(info.messageId);
  res.send(true);
}
