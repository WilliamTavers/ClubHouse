var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log("Running Get Event Attendees");
    const eventID = req.query.eventID;

    var query = `
    SELECT Users.GivenName
    FROM Users
    INNER JOIN EventMembers ON Users.UserID = EventMembers.UserID
    WHERE EventMembers.EventID = ?`;

    req.pool.query(query, [eventID], function(err, rows) {
        if (err) {
            console.error('Error fetching attendees:', err);
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

