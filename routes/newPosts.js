var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res) {
    console.log("Running POST New Post");

    var postData = req.body;

    var query = 'INSERT INTO Posts (PostTitle, PostText, PostDate, ClubName, public) VALUES (?, ?, ?, ?, ?)';

    req.pool.query(query, [postData.postTitle, postData.postText, postData.publishDate, postData.clubName, postData.public], function(err, result) {
        if (err) {
            console.error('Error inserting new post:', err);
            res.status(500);
            return;
        }

        res.json({success: true});
    });
});

module.exports = router;
