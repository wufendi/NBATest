// mongoosejs.com/docs/index.html
// 获取球队的具体信息 资料/赛程/数据/数据王/球员/对比
let mongoose = require('mongoose');
let db = mongoose.connection;
let Schema = mongoose.Schema;
let teamDetailSchema = new Schema({
    monthGroups: Array, // 赛程 http://china.nba.com/static/data/team/schedule_warriors.json data.payload.monthGroups
    data: Array, // 数据 常规赛/季后赛 http://china.nba.com/static/data/team/stats_warriors.json data.payload。seasons
    info: Object, // 教练 http://china.nba.com/static/data/team/standing_warriors.json
    datace: Object, // 数据王 http://china.nba.com/static/data/team/leader_warriors.json data.payload.{}
    players: Array, // 球员 http://china.nba.com/static/data/team/roster_warriors.json
    contrast: Array, //对比 http://china.nba.com/static/data/team/hotzone_warriors.json http://china.nba.com/static/data/league/teamhotzone.json
});
function getTeamDetailData(name, fn) {
    let teamDetailModel
    name = name.toLowerCase();
    mongoose.connect('mongodb://localhost/teamDetail');
    db.on('error',() => {
        console.log('连接失败')
    });
    db.once('open', function() {
        console.log('连接成功')
    });
    db.once('close', function() {
        console.log('断开成功')
    });
    teamDetailModel = mongoose.model(name, teamDetailSchema, name);
    teamDetailModel.findOne({}, (err, data) => {
        if (!err) {
            fn(data);
            console.log('查询数成功');
        } else {
            console.log('查询数据失败');
            throw err;
        }
    });
}
module.exports = getTeamDetailData;