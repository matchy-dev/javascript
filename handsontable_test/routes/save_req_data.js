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
        var data_set = req.body.data_set;
        var url = req.body.url;
        var out_data = req.body.data;

        db.run("delete from request_data_info where data_set = ?", [data_set] );
        var stmt = db.prepare("insert into request_data_info values( ?, ?, ?, ?, ? )");
        var no, key, value;
        no = 0;
        for(var i=0; i<out_data.length; i++){
            key = out_data[i][0];
            if(key){
                key = key.replace(/\r$|\n$|\r\n$/, "");
                if(key.length>0){
                    console.log(JSON.stringify(out_data[i]) + " " + key + ":" + key.length);
                    value = out_data[i][1];
                    if((value==null)||(value.length==0)){
                        value = null;
                    } else {
                        value = value.replace(/\r$|\n$|\r\n$/, "");
                    }
                    stmt.run( data_set, url, i, key, value);
                    no++;
                }
            }
        }
        stmt.finalize();
    });

    res.contentType('application/json');
    var out_str = '{"RESULT": "OK"}';
    console.log(out_str);
    res.send(out_str);
});

module.exports = router;
