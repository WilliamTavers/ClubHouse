var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();


router.get('/', function(req, res, next) {
  console.log("Running the clubMembers route");
  const clubName = req.query.clubName;


  // check if clubName is valid
  if(!clubName) {
    return res.status(400).send('Missing club name');
  }

  const query = 'SELECT Users.GivenName FROM ClubMembers INNER JOIN Users ON ClubMembers.UserID = Users.UserID WHERE ClubMembers.ClubName = ?';

  req.pool.query(query, [clubName], function (error, results, fields) {
      if (error) {
          console.error(error);
          return res.status(500).send('Database error');
      }

      // Create an array with just the first names
      const firstNames = results.map(row => row.GivenName);
      console.log(firstNames);


      return res.json(firstNames);
  });
});

module.exports = router;