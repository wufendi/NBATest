const fs = require('fs');
function getLogoSvg(name, fn) {
    const rs = fs.createReadStream(`./group-logo-svg/${name}.svg`);
    let data = ''
    rs.on('data',(chunk) => {
        data += chunk;
    });
    rs.on('end',()=> {
        fn(data);
    })
}
module.exports = getLogoSvg;