var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the route with name " + req.session.username);
  // Perform the database query to check if the username and password exist in the 'users' table
  var username = req.session.username;
  var query = 'SELECT * FROM Users WHERE username = ?';
  req.pool.query(query, [username], function(err, rows) {
    if (err) {
      console.error('Login Error:', err);
      res.status(500).json({ success: false });
      return;
    }

    if (rows.length > 0) {
      // If the login credentials are valid
      res.json(rows);
      console.log(rows);
    } else {
      // If the login credentials are invalid
      res.json({ success: false });
    }
  });

});

module.exports = router;
