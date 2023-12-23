var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the clubmembers route with id " + req.session.UserID);
  // Perform the database query to check if the username and password exist in the 'users' table
  var UserID = req.session.UserID;
  var query = 'SELECT ClubName FROM ClubMembers WHERE UserID = ?';
  req.pool.query(query, [UserID], function(err, rows) {
    if (err) {
      console.error('User Clubs error:', err);
      res.status(500);
      return;
    }

    if (rows.length > 0) {
      // If they have clubs
      res.json(rows);
      console.log(rows);
    } else {
      // If no clubs found
      console.log("route found no clubs");
      res.json({ success: false });
    }
  });

});

module.exports = router;
