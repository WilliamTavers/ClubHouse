var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ClubPage', function(req, res, next) {
  res.render('ClubPage', { title: 'Clubs' });
});

module.exports = router;
