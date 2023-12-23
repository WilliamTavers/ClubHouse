var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ClubHomePage', function(req, res, next) {
  res.render('ClubHomePage', { title: 'ClubPage' });
});

router.get('/ClubHomePage/:ClubName', function(req, res, next) {
  res.send(req.params.ClubName);
});

module.exports = router;
