var express = require('express');
var router = express.Router();

// Middleware
// When accessing Manage.html - Checks if user is a manager of a club

router.use(function(req, res, next) {
    // Check if the user is logged in
    if (!req.session.username) {
        res.redirect('/login.html');
        return;
    }

    var loggedInUname = req.session.username;
    var getUserID = 'SELECT UserID FROM Users WHERE username = ?';
    var managerStatusQuery = 'SELECT * FROM ClubAdmins WHERE UserID = ?';

    // Get UserID from Users table
    req.pool.query(getUserID, [loggedInUname], function(err1, rows1) {
        // Handle error
        if (err1) {
            res.status(500).send('Error Getting User ID (500)');
            return;
        }

        var currentUserID = rows1[0].UserID;

        // Check if UserID is in ClubAdmins table (Check if they are a club manager)
        req.pool.query(managerStatusQuery, [currentUserID], function(err2, rows2) {
            // Handle error
            if (err2) {
                res.status(500).send('Error Getting ClubAdmins Status (500)');
                return;
            }

            // If user is not a club manager
            if (rows2.length <= 0) {
                res.status(403).send('YOU ARE NOT A CLUB MANAGER. 403 FORBIDDEN');
            } else {
                next();
            }
        });
    });
});

module.exports = router;