var express = require('express');
var router = express.Router();

// Delete a Post from the database
router.post('/deletePost', function(req ,res) {
    req.pool.getConnection(function(err, connection){
        if (err) {
            res.status(500).send("Error getting connection from pool");
            return;
        }

        var { postID } = req.body
        var query = 'DELETE FROM Posts WHERE PostID = ?';

        connection.query(query, [postID], function(qerr, rows) {
            connection.release();

            if (qerr) {
                res.status(500).send('Error: Something went wrong with : '+query);
            }
            res.send(200);
        });
    });
});

module.exports = router;
