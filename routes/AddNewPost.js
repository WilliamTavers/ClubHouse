var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the updatenewPost with name " + req.session.username);
  // Perform the database query to update the profile information in the 'users' table
  var PostInfo = req.body;
  var query = 'INSERT INTO Posts (PostTitle, PostText, ClubName, Public, PostDate) VALUES (?, ?, ?, ?, current_timestamp)';
  req.pool.query(query, [PostInfo.PostTitle, PostInfo.PostText, PostInfo.ClubName, PostInfo.PulicPrivate], function(err, rows) {
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
