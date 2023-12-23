/* eslint-disable arrow-parens */
var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("Running the getManagedClubs route with id ");

    var UserID  = req.session.UserID;
    var query = 'SELECT ClubName FROM ClubAdmins WHERE UserID = ?';
    req.pool.query(query, [UserID], function(err, rows) {
        if (err) {
            console.error('Managed Clubs error:', err);
            res.status(500);
            return;
        }

        if (rows.length > 0) {
            // If they manage clubs
            res.json(rows);
            console.log(rows);
        } else {
            // If no clubs managed
            console.log("route found no managed clubs");
            res.json({ success: false });
        }
    });
});

module.exports = router;
