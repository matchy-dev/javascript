var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var path = require('path');
var dbPath = path.join(__dirname, "test.db");
var db = new sqlite3.Database(dbPath);

/* POST users listing. */
router.post('/', function(req, res, next) {
    console.log("########################################");
    console.log('params: ' + JSON.stringify(req.params));
    console.log('body: ' + JSON.stringify(req.body));
    console.log('query: ' + JSON.stringify(req.query));
    console.log("########################################");
    db.serialize(function(){
        var data_set = req.body.data_set;
        console.log("data_set:" + data_set);
        db.all("select url, key, value from request_data_info where data_set = ? order by id", [data_set], function(err, row){
            if(err){
                console.log(err);
                throw err;
            }
            var url = "";
            var row_data = [];
            for(var i=0; i<row.length; i++){
                console.log(row[i]);
                url = row[i].url;
                row_data[i] = [row[i].key, row[i].value];
            }
            res.contentType('application/json');
            out_data = {url:url, row_data:row_data};
            console.log(JSON.stringify(out_data));
            res.send(JSON.stringify(out_data));
        });
    });
});

module.exports = router;
