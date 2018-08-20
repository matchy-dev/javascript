var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var path = require('path');
var dbPath = path.join(__dirname, "test.db");
var db = new sqlite3.Database(dbPath);

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log("########################################");
    console.log('params: ' + JSON.stringify(req.params));
    console.log('body: ' + JSON.stringify(req.body));
    console.log('query: ' + JSON.stringify(req.query));
    console.log("########################################");
    db.serialize(function(){
        var url = req.body.url;
        console.log("url:" + url);
        db.all("select distinct data_set from send_data_info where url = ? order by 1", [req.body.url], function(err, row){
            if(err){
                console.log(err);
                throw err;
            }
            var out_data = [];
            for(var i=0; i<row.length; i++){
                console.log(row[i]);
                out_data[i] = row[i].data_set;
            }
            res.contentType('application/json');
            console.log(JSON.stringify(out_data));
            res.send(JSON.stringify(out_data));
        });
    });
});

module.exports = router;
