var express = require('express');
var router = express.Router();

router.post('/', function(req ,res) {
  req.pool.getConnection(function(err, connection){
      if (err) {
          res.status(500).send("Error getting connection from pool");
          return;
      }

      var { eventID } = req.body;
      var query = 'DELETE FROM Event WHERE EventID = ?';

      connection.query(query, [eventID], function(qerr, rows) {
          connection.release();

          if (qerr) {
              res.status(500).send('Error: Something went wrong with : '+query);
          }
          res.send(200);
      });
  });
});

module.exports = router;
