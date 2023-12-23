var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("Running Get Club Events");
  const clubName = req.query.clubName;

  if(!clubName) {
    return res.status(400).send('Missing club name');
  }

  const query = 'SELECT * FROM Event WHERE ClubName = ? ORDER BY EventDate DESC';

  req.pool.query(query, [clubName], function (error, results) {
      if (error) {
          console.error(error);
          res.status(500);
          return;
      }

      res.json(results);
  });
});

module.exports = router;