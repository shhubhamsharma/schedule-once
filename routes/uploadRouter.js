var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var Validator = require('../validator/validator');
var Utility=require('../Utility/Utility');

/* GET home page. */
router.post('/', function(req, res) {
    var validator = new Validator();
    var validatorResponse = validator.validateUpload(req.body);
    if (validatorResponse === "Failed") {
        res.status(Utility.invalidData.statuscode);
        res.send(Utility.invalidData);
    } else {
        res.status(Utility.success.statuscode);
        res.send(Utility.success);
    }
});

module.exports = router;
