var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the updateProfile with name " + req.session.username);
  // Perform the database query to update the profile information in the 'users' table
  var UserID = req.session.UserID;
  var Profile = req.body;
  var query = 'UPDATE Users SET GivenName = ?, username = ?, Email = ?, Surname = ?, password = ? WHERE UserID = ?';
  req.pool.query(query, [Profile.FirstName, Profile.UserName, Profile.Email, Profile.Surname, Profile.Password, UserID], function(err, rows) {
    if (err) {
      console.error('Update error:', err);
      res.status(500);
    } else {
      // Added Successfully
      console.log("Updated Successfully");
      res.end();
    }
  });
});

module.exports = router;
