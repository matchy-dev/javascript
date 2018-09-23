var weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];

function zeroPad(val){
	out_str = ('0' + val).slice(-2);
	return out_str;
}

function zeroPad2(val){
	out_str = ('00' + val).slice(-3);
	return out_str;
}

function getDateInfo(dt){
	var year = dt.getFullYear();
	var mon = zeroPad(dt.getMonth() + 1);
	var day = zeroPad(dt.getDate());
	var wday = "(" + weekDay[dt.getDay()] + ")";
	var hour = zeroPad(dt.getHours());
	var min = zeroPad(dt.getMinutes());
	var sec = zeroPad(dt.getSeconds());
	var msec = zeroPad2(dt.getMilliseconds());

	return {
		year: year,
		mon: mon,
		day: day,
		wday: wday,
		hour: hour,
		min: min,
		sec: sec,
		msec: msec
	};
}

function getTimeStampStrBase(dt, outWeekDay){
	var dtInfo = getDateInfo(dt);

	if(!outWeekDay){
		dtInfo.wday = "";
	}

	var timeStampStr =
		dtInfo.year + "-" +
		dtInfo.mon + "-" +
		dtInfo.day +
		dtInfo.wday + " " +
		dtInfo.hour + ":" +
		dtInfo.min + ":" +
		dtInfo.sec + "." +
		dtInfo.msec;
	
	return timeStampStr;
}

function getTimeStampStrNoHyphen(dt){
	var dtInfo = getDateInfo(dt);

	var timeStampStr =
		dtInfo.year +
		dtInfo.mon +
		dtInfo.day +
		dtInfo.hour +
		dtInfo.min +
		dtInfo.sec +
		dtInfo.msec;
	
	return timeStampStr;
}

function getDateStr(dt){
	var dtInfo = getDateInfo(dt);

	var dateStr =
		dtInfo.year + "-" +
		dtInfo.mon + "-" +
		dtInfo.day;

	return dateStr;
}

function getDateStrNoHyphen(dt){
	var dtInfo = getDateInfo(dt);

	var dateStr =
		dtInfo.year +
		dtInfo.mon +
		dtInfo.day;

	return dateStr;
}


function addYear(in_dt, add_year){
	var add_dt = new Date(in_dt.getTime());
	add_dt.setFullYear(add_dt.getFullYear() + add_year);
	// 入力データが 02/29 の場合
	if((in_dt.getMonth() == (2-1)) && (in_dt.getDate() == 29)){
		// 加算後が 3月となっている場合
		if(add_dt.getMonth() == (3-1)){
			add_dt.setDate(add_dt.getDate()-1);
		}
	}
	return add_dt;
}

module.exports = {
	getTimeStampStr: function (dt){
		return getTimeStampStrBase(dt, false);
	},
	getTimeStampStrFull: function (dt){
		return getTimeStampStrBase(dt, true);
	},
	getTimeStampStrNoHyphen: getTimeStampStrNoHyphen,
	getDateStr: getDateStr,
	getDateStrNoHyphen: getDateStrNoHyphen,
	addYear: addYear
}
