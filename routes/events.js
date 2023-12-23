var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/Events', function(req, res, next) {
  res.render('Events', { title: 'Events' });
});

module.exports = router;
