var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the attendOrLeave route with id " + req.session.UserID);
  // Perform the database query to check if the user and event exist in the 'eventmembers' table
  var UserID = req.session.UserID;
  var { EventID } = req.body;
  var query = 'SELECT * FROM EventMembers WHERE UserID = ? AND EventID = ?';
  req.pool.query(query, [UserID, EventID], function(err, rows) {
    if (err) {
      console.error('User Event error:', err);
      res.status(500);
    }

    if (rows.length > 0) {
      // If the user is going to event
      console.log("User found in event!");
      res.json(rows);
    } else {
      // If the login credentials are invalid
      console.log("User not found in event!");
      res.end();
    }
  });

});

module.exports = router;
