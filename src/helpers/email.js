const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  // host: 'smtp.gmail.com',
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});
const sendEmail = (toEmail, body)=>{
  return new Promise(async(resolve, reject)=>{
    try {
    let info = await transporter.sendMail({
      from: 'rinoboy84@gmail.com', // sender address
      to: toEmail, // list of receivers
      subject: "percobaan", // Subject line
      html: `<!DOCTYPE html>
  <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .container{
      height: 200px;
      height: 200px;
      background-color: yellow;
      border: 5px;
      margin-left: auto;
      margin-right: auto;
    }

  </style>
</head>
<body>
  <div class="container">
    <h1>hello word</h1>
    <p>${body}</p>
  </div>
</body>
</html>`,
    });
    resolve(info)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  sendEmail
}

