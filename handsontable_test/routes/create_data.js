var sqlite3 = require('sqlite3');
var path = require('path');
var dbPath = path.join(__dirname, "test.db");
var db = new sqlite3.Database(dbPath);

//db.run( "create table save_data ( id int, key text, value text )");
db.run( "create table send_data_info ( url text, data_set text, id int, key text, value text, primary key( url, data_set, id ) )");
