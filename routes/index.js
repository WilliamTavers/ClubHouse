var express = require('express');
var session = require('express-session');
const { response } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Login
router.post('/login', function(req,res,next){
  console.log("index usernbame is " + req.body.username);
  var { username, password } = req.body;
  // Database query to check if the username and password exist in the 'Users' table
  var query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
  req.pool.query(query, [username, password], function(err, rows) {
    if (err) {
      console.error('Login Error:', err);
      res.status(500).json({ success: false });
      return;
    }

        if (rows.length > 0) {
            // If the login credentials are valid
            console.log("userID in index session equal to " + rows[0].UserID);
            req.session.username = req.body.username;
            req.session.UserID = rows[0].UserID;
            console.log("username in index session equal to " + req.session.username);
            res.json({ success: true });
        } else {
            // If the login credentials are invalid
            console.log("failed login");
            res.json({ success: false });
        }
    });
  // res.end();
});

// SignUp
router.post('/signup', function(req,res,next){
    var signUpData = req.body;

    // Check to see if a user with the ID being posted exists in the Users table
    var checkQuery = 'SELECT * FROM Users WHERE UserID = ?';
    req.pool.query(checkQuery, [signUpData.Uid], function(err, rows){
    if (err) {
        console.error('Error with /signup:', err);
        res.sendStatus(500);
        return;
    }
    if (rows.length >0) {
        // Send a json object so we can have the error text in the HTML update
        res.json({ UserIDExists: true });
    } else {
        // IF there are no collisions with UserID, then insert the new user into the database
        var query = 'INSERT INTO Users (UserID, GivenName, Surname, Email, password, username, AdminStatus) VALUES (?, ?, ?, ?, ?, ?, ?)';
        var values = [signUpData.Uid, signUpData.Fname, signUpData.Lname, signUpData.Email,
        signUpData.Pwrd, signUpData.Uname, 0];

        req.pool.query(query, values, function(err1, rows1) {
            if (err1) {
                console.error('Error with /signup:', err1);
                res.sendStatus(500);
                return;
            }
            // Set the Session to the username of the newly created account
            req.session.username = signUpData.Uname;
            // Send a json object so we can have the error text in the HTML update
            res.json({ UserIDExists: false });
        });
    }
    });
});

module.exports = router;
