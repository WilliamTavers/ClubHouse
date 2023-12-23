var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ManageEvents', function(req, res, next) {
  res.render('ManageEvents', { title: 'Manage Events' });
});

module.exports = router;
