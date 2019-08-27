// データ設定
function set(){
    var data_str = document.getElementById("set_data").value;
    var data = {};

    var form_data = document.forms.form_id;

    try {
        // JSONパース
        data = JSON.parse(data_str);
    } catch(err){
        console.log(err);
        // タブ区切り
        if(data_str.indexOf("\t")!=-1){
            data = divide_data(data_str, /\r\n|\n/, "\t");
        }
        // タブ区切り
        if(data_str.indexOf(",")!=-1){
            data = divide_data(data_str, ",", "=");
        }
    }

    console.log("set_id:" + sel_id);
    var save_params = conf_data[sel_id].params;
    for(key in data){
        if(form_data[key]){
            form_data[key].value = data[key];
            for(var i=0; i<save_params.length; i++){
                if(save_params[i].name == key){
                    // 値の変更を保存
                    save_params[i].value = data[key];
                }
            }
        }
    }
    console.log(data);
}

function divide_data(data_str, data_sep, key_val_sep){
    var data = {};
    var key_vals = data_str.split(data_sep);
    var key_val;
    for(var i=0; i<key_vals.length; i++){
        key_val = key_vals[i].split(key_val_sep);
        if(key_val.length>1){
            data[key_val[0]] = key_val[1];
        }
    }
    return data;
}
