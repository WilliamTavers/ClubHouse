var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the getEmailPosts route");
    var { ClubName } = req.body;
  // Perform the database query to All users that want to receive emails
  var query = 'SELECT * FROM Users WHERE UserID IN (SELECT UserID FROM ClubMembers WHERE EventNotifications = 1 AND ClubName = ?)';
  req.pool.query(query, [ClubName], function(err, rows) {
    if (err) {
      console.error('Email Error:', err);
      res.status(500).json({ success: false });
      return;
    }

    if (rows.length > 0) {
      // If the there is someone that wants emails
      res.json(rows);
      console.log(rows);
    } else {
      // If the login credentials are invalid
      res.json({ success: false });
    }
  });

});

module.exports = router;
