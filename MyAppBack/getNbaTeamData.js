// mongoosejs.com/docs/index.html
let mongoose = require('mongoose');
let db = mongoose.connection;
let Schema = mongoose.Schema;
let groupSchema = new Schema({
    abbr: String,
    city: String,
    cityEn: String,
    code: String,
    conference: String,
    displayAbb: String,
    displayConference: String,
    division: String,
    id: String,
    isAllStarTeam: Boolean,
    isLeagueTeam: Boolean,
    leagueId: String,
    name: String,
    nameEn: String,
});
let groupsModel = mongoose.model('groups', groupSchema);
function getNbaTeamData(queryObject, fn) {
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
    const query = Object.assign({},{_id:0}, queryObject);
    groupsModel.find({}, query, (err, data) => {
        if (!err) {
            fn(data);
            console.log('查询数成功');
        } else {
            console.log('查询数据失败');
            throw err;
        }
    });
}

module.exports = getNbaTeamData;