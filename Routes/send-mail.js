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
      user: 'userdemo1011@gmail.com', //mail để gửi
      pass: 'bsdkgtbsbwkhfpbb'
    }
  });
  let content = `
    <div style="padding: 20px 0;
          display: flex;
          width: 100%;
          height: 100%;
          background-color: #ffebeb;
          color: #3d3d3d;
          justify-content: center;
          align-items: center">
      <div style="margin: 0 auto;
           width: 80%;
           background-color: #fff;
           padding: 20px;
           border-radius: 16px;
           box-shadow: 0 0 20px rgba(0, 0, 0, 0.4)">
        <h2>Thắc mắc của độc giả</h2>
        <div><b>Name:</b> ${data.ten} ${data.ho}</div>
        <br>
        <div><b>Email:</b> ${data.email}</div>
        <br>
        <div><b>Question:</b> ${data.cauHoi}</div>
      </div>
    </div>
  `
  let mailList = [
    'covidinformation1011@gmail.com', 
    'hoangsonle2582000@gmail.com'
  ];
  mailList.toString()
  let mailOptions = {
    from: 'userdemo1011@gmail.com',
    // to: "'covidinformation1011@gmail.com', 'hoangsonle2582000@gmail.com'", // mail để nhận
    to: mailList,
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