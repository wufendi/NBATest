// mongoosejs.com/docs/index.html
// 获取球员的具体信息
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
let currentModel;
let currentSchema;
currentSchema = new Schema({
    name: String,
    team: String,
    country: String,
    firstNameEn: String,
    lastNameEn: String,
    displayName: String,
    playerProfile: Object,
    stats: Object,
    teamProfile: Object,
}, {collection:'playerDetail'});
currentModel = mongoose.model('playerDetail', currentSchema);
function getPlayerDetailData(queryObject, pageObject, resultObject, fn) {
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
    currentModel.find(queryObject, resultObject).skip((pageObject.page-1)*pageObject.limit).limit(pageObject.limit).exec('find' ,(err, data) => {
        if (!err) {
            fn(data);
            console.log('查询数成功');
        } else {
            console.log('查询数据失败');
            throw err;
        }
    });
}
module.exports = getPlayerDetailData;
// getTeamDetailData({country: '中国'},{playerProfile: 1, teamProfile: 1},(data) => {
//     console.log(data);
// });