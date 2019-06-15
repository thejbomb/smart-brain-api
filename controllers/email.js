const nodemailer = require('nodemailer')

// The credentials for the email account you want to send mail from. 
const credentials = {
  host: 'smtp.outlook.com',
  port: 465,
  secure: true,
  auth: {
    user: 'face-req-confirm@outlook.com', 
    pass: '159aobp159aobp',  
  }
}

// Getting Nodemailer all setup with the credentials for when the 'sendEmail()'
// function is called.
const transporter = nodemailer.createTransport(credentials)

// exporting an 'async' function here allows 'await' to be used
// as the return value of this function.
module.exports = async (receiver, name, password) => {

  await transporter.sendMail({
    from: 'face-req-confirm@outlook.com',
    to: receiver,
    subject: 'Email confirmation',
    text: `Hello ${name}, your password for https://facereq-smart-brain.herokuapp.com/ is ${password}.`
  })

}