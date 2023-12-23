var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the getUserEvent route with id " + req.session.UserID);
  // Perform the database query to check if the username and password exist in the 'users' table
  var UserID = req.session.UserID;
  var query = 'SELECT * FROM EventMembers WHERE UserID = ?';
  console.log("GettingHere");
  req.pool.query(query, [UserID], function(err, rows) {
    if (err) {
      console.error('User Events error:', err);
      res.status(500);
    } else {
      // Found Successfully
      console.log("Found Events");
      console.log(rows);
      res.json(rows);
    }
  });

});

module.exports = router;
