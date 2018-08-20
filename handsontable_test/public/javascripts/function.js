var data = [
    ["", ""]
    ];

var container = document.getElementById('data_table');
var hot = new Handsontable(container, {
    data: data,

    rowHeaders: true,
    colHeaders: true,
    colHeaders: ["key_name", "value"],
    minSpareRows: 1
});

Handsontable.dom.addEvent(load, 'click', function() {
    ajax("/get_data", "GET", "", function(res){
      console.log(res.data);
      hot.loadData(res.data);
    });
  });

  Handsontable.dom.addEvent(save, 'click', function() {
    console.log(hot.getData());
    ajax('/save_data', 'POST', JSON.stringify(hot.getData()), function(res) {
        console.log(res.data);
    });
});

var url = document.getElementById("url");
var data_set = document.getElementById("data_set");

Handsontable.dom.addEvent(save_all_data, 'click', function() {
    var out_data = { url: url.value, data_set: data_set.value, data: hot.getData() };
    console.log(out_data);
    ajax('/save_send_data', 'POST', JSON.stringify(out_data), function(res) {
        console.log(res.data);
    });
});

url.addEventListener( "change", function(){
    console.log(url);
    console.log(url.value);
    var out_data = { url: url.value };
    ajax('/get_set_data', 'POST', JSON.stringify(out_data), function(res) {
        console.log(res.status);
        console.log(res.data);

        var data_set = document.getElementById("data_set_list");
        while(data_set.lastChild){
            data_set.removeChild(data_set.lastChild);
        }
        document.getElementById("data_set").value = "";
        for(var i=0; i<res.data.length; i++){
            console.log(i + ":" + res.data[i]);
            var op = document.createElement("option");
            op.value = res.data[i];
            op.text = res.data[i];
            data_set.appendChild(op);
        }
    });
});

data_set.addEventListener( "change", function(){
    console.log(data_set);
    console.log(url.value);
    console.log(data_set.value);
    var out_data = { url:url.value, data_set:data_set.value };
    ajax('/get_key_val', 'POST', JSON.stringify(out_data), function(res) {
        console.log(res.data);
        hot.loadData(res.data);
      });
  });
