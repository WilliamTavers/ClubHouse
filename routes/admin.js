var express = require('express');
var router = express.Router();

// Middleware
// When accessing AdminMembers.html - Checks if user has Admin status.

router.use(function(req, res, next) {
    // Check if the user is logged in
    if (!req.session.username) {
        res.redirect('/login.html');
        return;
    }

    var loggedInUname = req.session.username;
    var adminQuery = 'SELECT AdminStatus FROM Users WHERE username = ?';

    req.pool.query(adminQuery, [loggedInUname], function(err, rows) {
        // Handle error
        if (err) {
            res.status(500).send('Error Getting AdminStatus (500)');
            return;
        }

        var adminStatus = rows[0].AdminStatus;

        // If user is not admin
        if (adminStatus !== 1) {
            res.status(403).send('YOU ARE NOT AN ADMIN. 403 FORBIDDEN');
        } else {
            next();
        }
    });
});

module.exports = router;