function ajax(url, method, send_data, res_func){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.response);
            } else {
                console.log("status = " + xhr.status);
            }
            var res = {};
            res.status = xhr.status;
            res.data = xhr.response;
            if (typeof xhr.responseType != "json") {
                try {
                    var jsonData = JSON.parse(res.data);
                    console.log("in ajax2 type:" + typeof jsonData);
                    res.data = jsonData;
                } catch (e) {
                    console.log(e);
                }
            }
            res_func(res);
        }
    };
    
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = "json";
    xhr.send(send_data);
}
