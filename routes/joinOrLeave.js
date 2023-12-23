var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the joinOrLeave route with id " + req.session.UserID);
  // Perform the database query to check if the user and club exist in the 'clubmembers' table
  var UserID = req.session.UserID;
  var { ClubName } = req.body;
  var query = 'SELECT * FROM ClubMembers WHERE UserID = ? AND ClubName = ?';
  req.pool.query(query, [UserID, ClubName], function(err, rows) {
    if (err) {
      console.error('User Clubs error:', err);
      res.status(500);
    }

    if (rows.length > 0) {
      // If the login credentials are valid
      console.log("User found in club!");
      res.json(rows);
    } else {
      // If the login credentials are invalid
      console.log("User not found in club!");
      res.end();
    }
  });

});

module.exports = router;
