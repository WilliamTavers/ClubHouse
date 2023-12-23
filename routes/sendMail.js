var express = require('express');
var session = require('express-session');
const nodemailer = require("nodemailer");
var router = express.Router();

router.post('/', function(req, res, next) {
  var message = req.body;

  console.log(nodemailer);
  console.log("ran getEmails function");
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "73f0a8765c2b03",
      pass: "8e334a329d2b97"
    }
  });

  console.log(message);

  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
});


});

module.exports = router;
