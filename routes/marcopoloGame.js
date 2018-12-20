var Promise = require("bluebird");

var marcoPolo = function(){};


marcoPolo.prototype.getSeriesMarcoPolo = function() {
	return new Promise(function (resolve,reject){
	var series=[];
	
	for(var i=1; i<=1000; i++) {
		var lineString = "";
		for(var j=1; j<=1000; j++) {
			if(j%4 === 0 && j%7 === 0) {
				lineString+="marcopolo,";
			} else if (j%4 === 0) {
				lineString+="marco,";
			} else if(j%7 === 0) {
				lineString+="polo,";
			} else {
				lineString+=(j + ",");
			}
		}
		stream.write(lineString)+'\n';
		series.push({line : lineString.substring(0, lineString.length-1)});
	}
	return resolve(series);
	})
	
}



exports=module.exports = marcoPolo;