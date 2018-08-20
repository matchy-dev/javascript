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
        var data_set = req.body.data_set;
        var out_data = req.body.data;

        db.run("delete from send_data_info where url = ? and data_set = ?", [url, data_set] );
        var stmt = db.prepare("insert into send_data_info values( ?, ?, ?, ?, ? )");
        for(var i=0; i<out_data.length; i++){
            if(out_data[i][0] && out_data[i][1]){
                console.log(out_data[i]);
                stmt.run( url, data_set, i, out_data[i][0], out_data[i][1]);
            }
        }
        stmt.finalize();
    });

    res.contentType('application/json');
    var out_str = '{"OK"}';
    console.log(out_str);
    res.send(out_str);
});

module.exports = router;
