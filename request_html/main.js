var sel_id = 0;

// タブクリック時の処理
function click_tab(id){
    // タブのスタイルを変更
    var selected_menu_id = "menu_id_" + sel_id;
    var menu_id = "menu_id_" + id;
    console.log("id:" + menu_id);
    var menu = document.getElementById(menu_id);
    document.getElementById(selected_menu_id).style.backgroundColor = "";
    var menu = document.getElementById(menu_id);
    menu.style.backgroundColor = "grey";

    // URLを設定
    var url = conf_data[id].url;
    document.getElementById("url").value = url;
    sel_id = id;

    // パラメータを設定
    var param_list, params, param, param_dat;
    param_list = document.getElementById("param_list");
    while(param_list.lastChild){
        param_list.removeChild(param_list.lastChild);
    }
    params = conf_data[id].params;
    for(var i=0; i<params.length; i++){
        console.log("name:" + params[i].name + " data:" + params[i].value);
        var param = document.createElement("tr");
        param.className = "param_item";

        var param_dat;
        // パラメータ名を作成
        param_dat = document.createElement("td");
        param_dat.className = "label";
        param_dat.innerText = params[i].name;
        param.appendChild(param_dat);

        var input_dat;
        // パラメータの値を作成
        param_dat = document.createElement("td");
        input_dat = document.createElement("input");
        input_dat.className = "param_data";
        input_dat.type = "text";
        input_dat.name = params[i].name;
        input_dat.value = params[i].value;
        param_dat.appendChild(input_dat);

        // 値変更時の処理を登録
        (function(html_dat, json_dat){
            html_dat.addEventListener("change", function(){
                console.log("JSON:" + json_dat.value + " HTML:" + html_dat.value);
                json_dat.value = html_dat.value;
            },false);
        })(input_dat, params[i]);
        param.appendChild(param_dat);
        param_list.appendChild(param);
    }
};

// URL変更時の処理を登録
var html_url = document.getElementById("url");
html_url.addEventListener("change", function(){
    console.log("sel_id:" + sel_id + " JSON:" + conf_data[sel_id].url + " HTML:" + html_url.value);
    conf_data[sel_id].url = html_url.value;
},false);

// HTTPリクエスト
function request(method){
    var url = document.getElementById("url").value
    console.log(url);
    document.getElementById("form_id").setAttribute("action", url);
    document.getElementById("form_id").setAttribute("method", method);
    document.getElementById("form_id").submit();
}

// GET リクエスト
function get(){
    request("GET");
}

// POST リクエスト
function post(){
    request("POST");
}

// 初期処理(タブ作成)
var elem;
var menu_bar = document.getElementById("menu_bar");
for(var i=0; i<conf_data.length; i++){
    elem = document.createElement("div");
    elem.id = "menu_id_" + i;
    elem.className = "menu_item";
    elem.innerText = conf_data[i].tab_name;
    menu_bar.appendChild(elem);    
    // console.log(conf_data[i].tab_name);
    (function(elem_, id){
        elem.addEventListener("click", function(){
            click_tab(id);
        }, false);
    })(elem, i);
}

// 最初のタブを選択
click_tab(0);
