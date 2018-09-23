var express = require('express');
var router = express.Router();

var fs = require('fs');
var date_util = require(__dirname + '/../date_util.js');

var title = 'file download';

var download_path = __dirname + '/../public/uploads/';

/* GET users listing. */
router.get('/', function(req, res, next) {
	var files = fs.readdirSync(download_path);
	var file_list = [];
	var file_data;
	var stat;
	var file_date;
	for(var i=0; i<files.length; i++){
		stat = fs.statSync(download_path + files[i]);
		file_date = stat.mtime;
		console.log(file_date + " " + files[i]);
		file_data = {name: files[i], date: file_date};
		file_list.push(file_data);
	}
	// リバースソート
	file_list.sort(function(a, b){
		return b.date - a.date;
	});
	file_list.forEach(function(dt){
		dt.date_str = date_util.getTimeStampStr(dt.date);
	});
	res.render('download', { title: title, file_list: file_list });
});

/* POST users listing. */
router.post('/', function(req, res, next) {
	console.log(req.body);
	var file_name;
	for(key in req.body){
		file_name = key;
		break;
	}
	var file_path = download_path + file_name;
	console.log(file_path);
	res.download(file_path);
});

module.exports = router;
