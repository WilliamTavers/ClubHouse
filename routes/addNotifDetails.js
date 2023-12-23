var express = require('express');
var session = require('express-session');
const { render } = require('../app');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("ran the addNotifDetils route with id " + req.session.UserID);
  // Perform the database query to update the notifications in the 'clubmembers' table
  var UserID = req.session.UserID;
  console.log(UserID);
  if(!UserID){
    return;
  }
  var { PostDetail, EventDetail} = req.body;
  var query = 'UPDATE ClubMembers SET PostNotifications = ?, EventNotifications = ? WHERE UserID = ?';
  req.pool.query(query, [PostDetail, EventDetail, UserID], function(err) {
    if (err) {
      console.error('Club Members notif error:', err);
      res.status(500);
    } else {
      // Updated Successfully
      console.log("Updated Successfully");
      res.end();
    }
  });

});

module.exports = router;
