var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the attendevent route with id " + req.session.UserID);
  // Perform the database query to check if the username and password exist in the 'users' table
  var UserID = req.session.UserID;
  if(!UserID){
    return;
  }
  var { EventID } = req.body;
  var query = 'INSERT INTO EventMembers (EventID, UserID) VALUES (?, ?)';
  console.log("GettingHere");
  req.pool.query(query, [EventID,UserID], function(err) {
    if (err) {
      console.error('User Clubs error:', err);
      res.status(500);
    } else {
      // Added Successfully
      console.log("Added Successfully");
      res.end();
    }
  });

});

module.exports = router;
