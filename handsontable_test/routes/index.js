var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var path = require('path');
var dbPath = path.join(__dirname, "test.db");
var db = new sqlite3.Database(dbPath);

/* GET home page. */
router.get('/', function(req, res, next) {
    db.serialize(function(){
        db.all("select distinct url from send_data_info order by 1", [], function(err, row){
            if(err){
                console.log(err);
                throw err;
            }
            var out_data = [];
            for(var i=0; i<row.length; i++){
                out_data[i] = row[i];
                console.log(out_data[i]);
            }
            res.render('index', { title: 'Express', url_list: out_data });
        });
    });
});

module.exports = router;
