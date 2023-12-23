var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran all clubs route");
  // Perform the database query to get all clubs
  var query = 'SELECT * FROM Clubs';
  req.pool.query(query, function(err, rows) {
    if (err) {
      console.error('All Clubs error:', err);
      res.status(500);
      return;
    }

    if (rows.length > 0) {
      // Clubs in database
      res.json(rows);
      console.log(rows);
    } else {
      // No clubs in database
      console.log("route found no clubs");
      res.json({ success: false });
    }
  });

});

module.exports = router;
