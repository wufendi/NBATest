// mongoosejs.com/docs/index.html
// 获取球员的具体信息
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
let currentModel;
let currentSchema;
currentSchema = new Schema({
    name: String
}, {collection:'allCountry'});
currentModel = mongoose.model('allCountry', currentSchema);
function getAllCountryData(fn) {
    mongoose.connect('mongodb://localhost/nba');
    db.on('error',() => {
        console.log('连接失败')
    });
    db.once('open', function() {
        console.log('连接成功')
    });
    db.once('close', function() {
        console.log('断开成功')
    });
    currentModel.find({}, {_id:0, name: 1},(err, data) => {
        if (!err) {
            let _data = []
            data.forEach((v,i) => {
                _data.push(v.name)
            })
            fn(_data);
            console.log('查询数成功');
        } else {
            console.log('查询数据失败');
            throw err;
        }
    });
}
module.exports = getAllCountryData;
/*
getAllCountryData((data) => {
    console.log(data);
});*/
