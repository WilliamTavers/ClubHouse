var express = require('express');
var router = express.Router();

// Get all user acount details from database
router.get('/getUsers', function(req, res) {
    req.pool.getConnection(function(err, connection){
        if (err) {
            res.status(500).send("Error getting connection from pool");
            return;
        }

        var query = 'SELECT * FROM Users';
        connection.query(query, function(qerr, rows) {
            connection.release();

            if (qerr) {
                res.status(500).send('Error: Something went wrong with : SELECT * FROM Users');
            } else {
                res.send(rows);
            }
        });
    });
});

// Update admin status
router.post('/updateAdminStatus', function(req ,res) {
    req.pool.getConnection(function(err, connection){
        if (err) {
            res.status(500).send("Error getting connection from pool");
            return;
        }
        var { id, status } = req.body;
        console.log("ID: "+id);
        console.log("Status: "+status);

        var query = 'UPDATE Users SET AdminStatus = ? WHERE UserID = ?';

        connection.query(query, [status, id], function(qerr, rows) {
            connection.release();

            if (qerr) {
                res.status(500).send('Error: Something went wrong with : UPDATE Users SET AdminStatus = ? WHERE UserID = ?');
            }
            res.send(200);
        });
    });
});

module.exports = router;