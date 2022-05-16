const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const req = require('express/lib/request');

router.get('/', (req, res) => {
  res.send('it works')
})

router.post('/', (req, res) => {
  console.log(req.body);
  let data = req.body;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'userdemo1011@gmail.com',
      pass: '@covid123'
    }
  });
  let content = `
    <div>
      <h2>Thắc mắc của độc giả</h2>
      <span><b>From:</b> ${data.ten} ${data.ho}</span>
      <br>
      <span><b>Email:</b> ${data.email}</span>
      <br>
      <span><b>Question:</b> ${data.cauHoi}</span>
    </div>
  `
  let mailOptions = {
    from: 'userdemo1011@gmail.com',
    to: 'covidinformation1011@gmail.com',
    subject: 'Sending Email using Node.js',
    html: content,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  console.log(res.statusCode);
})

module.exports = router;