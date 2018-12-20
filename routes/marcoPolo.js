var express = require('express');
var router = express.Router();
var MarcoPoloGame=require('./marcopoloGame')
/* GET users listing. */
router.get('/', function(req, res, next) {
  var marcoPoloPromise = new MarcoPoloGame();
  marcoPoloPromise.getSeriesMarcoPolo().then(function(result){
    res.send(result);
  }).catch(function(err){
    res.send(err)
  });



});



module.exports = router;
