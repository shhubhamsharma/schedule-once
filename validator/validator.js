var validator = function() {};




validator.prototype.validateUpload = function(params) {
    if (!params.description || !params.files) {
        return "Failed";
    } else {
        return "Passed";
    }
};

module.exports=validator;