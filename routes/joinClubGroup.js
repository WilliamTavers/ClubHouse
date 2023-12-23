var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the joinClubGroup route with id " + req.session.UserID);
  // Perform the database query to check if the username and password exist in the 'users' table
  var UserID = req.session.UserID;
  console.log(UserID);
  if(!UserID){
    return;
  }
  var { ClubName } = req.body;
  var query = 'INSERT INTO ClubMembers (UserID, ClubName) VALUES (?, ?)';
  req.pool.query(query, [UserID, ClubName], function(err) {
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
