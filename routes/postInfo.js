var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the posts route with name " + req.session.username);
  // Perform the database query to check if the username and password exist in the 'users' table
  var { ClubName } = req.body;
  var query = 'SELECT * FROM Posts WHERE ClubName = ?';
  req.pool.query(query, [ClubName], function(err, rows) {
    if (err) {
      console.error('Posts error:', err);
      res.status(500).json({ success: false });
      return;
    }

    if (rows.length > 0) {
      // If the login credentials are valid
      res.json(rows);
    } else {
      // If the login credentials are invalid
      console.log("no posts found!");
      res.end();
    }
  });

});

module.exports = router;
