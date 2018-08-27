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
        console.log("url:" + url);
        db.all("select distinct key, value from send_data_info where url = ? and data_set = ? order by id", [req.body.url, req.body.data_set], function(err, row){
            if(err){
                console.log(err);
                throw err;
            }
            var out_data = [];
            if(row.length==0){
                out_data[0] = [ "", "" ];
            }else {
                for(var i=0; i<row.length; i++){
                    console.log(row[i]);
                    out_data[i] = [ row[i].key, row[i].value ];
                }
            }
            res.contentType('application/json');
            res.send(JSON.stringify(out_data));
        });
    });
});

module.exports = router;
