var express = require('express');
var router = express.Router();

/* GET Manage page. */
router.get('/Manage', function(req, res, next) {
  res.render('Manage', { title: 'Manage' });
});

router.get('/Manage/:ClubName', function(req, res, next) {
  res.send(req.params.ClubName);
});

module.exports = router;
