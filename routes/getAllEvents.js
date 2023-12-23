var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the all events");
  // Perform the database query to check if the username and password exist in the 'users' table
  var query = 'SELECT * FROM Event ORDER BY EventDate DESC';
  req.pool.query(query, function(err, rows) {
    if (err) {
      console.error('User Clubs error:', err);
      res.status(500);
      return;
    }

    if (rows.length > 0) {
      // If there are ANY events
      res.json(rows);
      console.log(rows);
    } else {
      // If no events at all?
      console.log("route found no clubs");
      res.json({ success: false });
    }
  });

});

module.exports = router;
