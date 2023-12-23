var express = require('express');
var session = require('express-session');
const { response } = require('../app');
var router = express.Router();

router.post('/', function(req,res,next){
    console.log("attempting a logout");
    if ('username' in req.session) {
        delete req.session.username;
        delete req.session.UserID;
        res.end();
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
