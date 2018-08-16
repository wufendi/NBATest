// mongoosejs.com/docs/index.html
let mongoose = require('mongoose');
let db = mongoose.connection;
let Schema = mongoose.Schema;
let groupsRankSchema = new Schema({
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
    aheadAtHalfLoss: String,
    aheadAtHalfWin: String,
    aheadAtThirdLoss:String,
    aheadAtThirdWin:String,
    behindAtHalfLoss:String,
    behindAtHalfWin:String,
    behindAtThirdLoss:String,
    behindAtThirdWin:String,
    clinched:String,
    confGamesBehind:Number,
    confLoss:Number,
    confRank:Number,
    confWin:Number,
    divGameBehind:Number,
    divLoss:Number,
    divRank:Number,
    divWin:Number,
    fewerTurnoversLoss:String,
    fewerTurnoversWin:String,
    homeLoss:Number,
    homeStreak:String,
    homeWin:Number,
    last10:String,
    last10Home:String,
    last10Road:String,
    leadInFgpctloss:String,
    leadInFgpctwin:String,
    leadInRebLoss:String,
    leadInRebWin:String,
    loseStreak:String,
    losses:Number,
    onHotStreak:String,
    oppover500Loss:String,
    oppover500Win:String,
    oppscore100PlusLoss:String,
    oppscore100PlusWin:String,
    otloss:String,
    otwin:String,
    pointsAgainst:Number,
    pointsDiff:Number,
    pointsFor:Number,
    roadLoss:Number,
    roadStreak:String,
    roadWin:Number,
    score100PlusLoss:String,
    score100PlusWin:String,
    streak:String,
    tenPtsOrMoreLoss:String,
    tenPtsOrMoreWin:String,
    threePtsOrLessLoss:String,
    threePtsOrLessWin:String,
    tiedAtHalfLoss:String,
    tiedAtHalfWin:String,
    tiedAtThirdLoss:String,
    tiedAtThirdWin:String,
    winPct:Number,
    winStreak:String,
    wins:Number
});
let groupsRankModel = mongoose.model('groupsRank', groupsRankSchema);
function getTeamRankData(fn) {
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
    groupsRankModel.find({}, {_id:0,name:1, abbr:1, city:1,nameEn: 1,conference: 1, wins: 1, losses:1, winPct:1, confGamesBehind: 1}, (err, data) => {
        if (!err) {
            fn(data);
            console.log('查询数成功');
        } else {
            console.log('查询数据失败');
            throw err;
        }
    });
}

module.exports = getTeamRankData;