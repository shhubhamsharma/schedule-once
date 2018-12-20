'use strict';
var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();
var util = require('util');
function getNumber(n) {
    switch (parseInt(n.reverse().join(""), 2)) {
        case 63:
            n = 0;
            break;
        case 6:
            n = 1;
            break;
        case 91:
            n = 2;
            break;
        case 79:
            n = 3;
            break;
        case 102:
            n = 4;
            break;
        case 109:
            n = 5;
            break;
        case 125:
            n = 6;
            break;
        case 7:
            n = 7;
            break;
        case 127:
            n = 8;
            break;
        case 111:
            n = 9;
            break;
        default:
            n = ' ';
            break;
    }
    return n;
}
router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files, file) {
        let newOutput = "";

        fs.readFile(files.file.path, function (err, data) {
            function parseSevenSegment(invoiceNumber) {
                var segmentsLine = invoiceNumber.split('\n');
                for (let i = 0; i < (segmentsLine.length); i = i + 4) {
                    if (segmentsLine[i]) {
                        let arr = [
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0]
                        ];
                        var lineArr = segmentsLine[i].split('');
                        var lineArr1 = segmentsLine[i + 1].split('');
                        var lineArr2 = segmentsLine[i + 2].split('');

                        for (let j = 0; j < lineArr.length; j++) {
                            if (lineArr[j] == '_') {
                                arr[Math.floor((j) / 3)][0] = 1;
                            } else if (arr[Math.floor((j) / 3)][0] != 1) {
                                arr[Math.floor((j) / 3)][0] = 0;
                            }
                        }
                        for (let k = 0; k < segmentsLine[i + 1].split('').length; k++) {

                            if (lineArr1[k] == '_') {
                                arr[(Math.floor((k) / 3))][6] = 1;
                            }
                            else if (lineArr1[k] == '|') {
                                if (k % 3 == 0) {
                                    arr[Math.floor((k) / 3)][5] = 1;
                                }
                                if (k % 3 == 2) {
                                    arr[Math.floor((k) / 3)][1] = 1;
                                }
                            } else {
                                if (k % 3 == 0 && arr[Math.floor((k) / 3)][5] != 1) {
                                    arr[Math.floor((k) / 3)][5] = 0;
                                }
                                if (k % 3 == 2 && arr[Math.floor((k) / 3)][1] != 1) {
                                    arr[Math.floor((k) / 3)][1] = 0;
                                }

                            }
                        }
                        for (let l = 0; l < lineArr2.length; l++) {
                            if (lineArr2[l] == '_') {
                                arr[(Math.floor((l) / 3))][3] = 1;
                            }
                            else if (lineArr2[l] == '|') {
                                if (l % 3 == 2) {
                                    arr[Math.floor((l) / 3)][2] = 1;
                                }
                                if (l % 3 == 0) {
                                    arr[Math.floor((l) / 3)][4] = 1;
                                }
                            } else {
                                if (l % 3 == 2 && arr[Math.floor((l) / 3)][2] != 1) {
                                    arr[Math.floor((l) / 3)][2] = 0;
                                }
                                if (l % 3 == 0 && arr[Math.floor((l) / 3)][4] != 1) {
                                    arr[Math.floor((l) / 3)][4] = 0;
                                }

                            }
                        }
                        for (var l in arr) {
                            newOutput = newOutput + getNumber(arr[l]);
                        }
                        newOutput = newOutput + '\n';
                        
                    } else {
                        continue;
                    }
                }
                
            }
            parseSevenSegment(String(data));
            fs.writeFile("output_story_txt.txt", newOutput, function(err) {
                if(err) {
                    return console.log(err);
                }
                res.send(newOutput);
            }); 
        });
    });
    form.on('error', function(err) {
        res.status(500)
        res.send({"message":err});
    });
    form.on('aborted', function() {
        res.status(0);
        res.send({"message":aborted});
    });

});

module.exports = router;
