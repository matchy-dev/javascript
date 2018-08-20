var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var path = require('path');
var dbPath = path.join(__dirname, "test.db");
var db = new sqlite3.Database(dbPath);

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.serialize(function(){
        db.all("select key, value from save_data order by id", [], function(err, row){
            if(err){
                console.log(err);
                throw err;
            }
            var out_data = [];
            for(var i=0; i<row.length; i++){
                out_data[i] = [row[i].key, row[i].value];
            }
            res.contentType('application/json');
            res.send(JSON.stringify(out_data));
        });
    });
});

module.exports = router;
