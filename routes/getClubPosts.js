var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("Running Get Club Posts");
    const clubName = req.query.clubName;

    var query = 'SELECT * FROM Posts WHERE ClubName = ?';
    req.pool.query(query, [clubName], function(err, rows) {
        if (err) {
            console.error('Error fetching posts:', err);
            res.status(500);
            return;
        }

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json([]);
        }
    });
});

module.exports = router;
