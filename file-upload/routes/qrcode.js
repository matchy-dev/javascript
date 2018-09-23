var qr = require('qr-image');

var os = require('os');
function getLocalAddress() {
    var ifacesObj = {}
    ifacesObj.ipv4 = [];
    ifacesObj.ipv6 = [];
    var interfaces = os.networkInterfaces();

    for (var dev in interfaces) {
        interfaces[dev].forEach(function(details){
            if (!details.internal){
                switch(details.family){
                    case "IPv4":
                        ifacesObj.ipv4.push({name:dev, address:details.address});
                    break;
                    case "IPv6":
                        ifacesObj.ipv6.push({name:dev, address:details.address})
                    break;
                }
            }
        });
    }
    return ifacesObj;
};
var ifObj = getLocalAddress();
var address = ifObj.ipv4[0].address;

module.exports = function (port){
    var url = "http://" + address + ":" + port + "/";
    console.log(url);
    var qr_svg = qr.image(url, { type: 'svg' });
    qr_svg.pipe(require('fs').createWriteStream(__dirname + '/../public/images/qr.svg'));
}
