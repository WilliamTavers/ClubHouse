var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the home event info with name " + req.session.username);
  // Perform the database query to get events in the club its given
  var { ClubName } = req.body;
  console.log(ClubName);
  var query = 'SELECT * FROM Event WHERE ClubName = ? ORDER BY EventDate DESC';
  console.log(query);
  req.pool.query(query, [ClubName], function(err, rows) {
    if (err) {
      console.error('Posts error:', err);
      res.status(500).json({ success: false });
      return;
    }

    if (rows.length > 0) {
      // If the login credentials are valid
      console.log(rows);
      res.json(rows);
    } else {
      // If the login credentials are invalid
      console.log("no posts found!");
      res.end();
    }
  });

});

module.exports = router;
