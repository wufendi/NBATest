const getNbaTeamData = require('./getNbaTeamData');
const getTeamRankData = require('./getTeamRankData');
const getLogoSvg = require('./getLogoSvg');
const getTeamDetailData = require('./getTeamDetailData');
const getPlayerDetailData = require('./getPlayerDetailData');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const server = http.createServer((req,res) => {
    const urlObject = url.parse(req.url,true);
    const pathname = urlObject.pathname;
    console.log(urlObject);
    if (pathname === '/getNbaTeamData') {
        getNbaTeamData((data)=>{
            data = JSON.stringify(data);
            res.writeHead(200, {
                'Content-Type': 'text/plain;charset=utf-8',
                'Transfer-Encoding': 'chunked'
            });
            res.write(data);
            res.end();
        })
    } else if(pathname === '/logo-svg') {
        const logo = urlObject.query.logo;
        getLogoSvg(logo,(data) => {
            res.writeHead(200, {
                'Content-Type': 'image/svg+xml',
                'Transfer-Encoding': 'chunked'
            });
            res.write(data);
            res.end();
        })
    } else if (pathname === '/getTeamRankData') {
        getTeamRankData((data)=>{
            data = JSON.stringify(data);
            res.writeHead(200, {
                'Content-Type': 'text/plain;charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'Access-Control-Allow-Origin': 'http://192.168.1.226:8081',
                'Access-Control-Allow-Credentials': true
            });
            res.write(data);
            res.end();
        })
    } else if(pathname === '/getTeamDetailData') {
        const team = urlObject.query.team;
        getTeamDetailData(team,(data) => {
            data = JSON.stringify(data);
            res.writeHead(200, {
                'Content-Type': 'text/json;charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'Access-Control-Allow-Origin': 'http://192.168.1.226:8081',
                'Access-Control-Allow-Credentials': true
            });
            res.write(data);
            res.end();
        })
    }  else if(pathname === '/getPlayersListData') {
        const resultObject = {_id: 0,playerProfile: 1, teamProfile: 1};
        const pageObject = {page: 1, limit: 10};
        let queryObject = {};
        let reqObject = {};
        let reqData = '';
        req.on('data', (chunk) => {
            reqData += chunk;
        });
        req.on('end',  () => {
            reqData = decodeURIComponent(reqData);
            reqObject = querystring.parse(reqData);
            Object.keys(reqObject).forEach((v, i) => { // 优化 查询参数目前只能少些 不能多写
                if (reqObject[v]) {
                    if (v === 'searchName') {
                        queryObject.$or = [{name: new RegExp(reqObject[v] ,"gi")},{displayName: new RegExp(reqObject[v] ,"gi")}];
                    } else if(v === 'englishName') {
                        queryObject.name = new RegExp(reqObject[v] ,"gi");
                    } else if (v === 'page' || v === 'limit'){
                        const value = Number(reqObject[v]);
                        pageObject[v] = !value ? pageObject[v] : value;
                    } else {
                        queryObject[v] = reqObject[v];
                    }
                }
            });
            if (Object.keys(queryObject).length === 0) {
                queryObject = {firstNameEn: /A/};
            }
            console.log(pageObject);
            getPlayerDetailData(queryObject, pageObject, resultObject, (data) => {
                data = JSON.stringify(data);
                res.writeHead(200, {
                    'Content-Type': 'text/json;charset=utf-8',
                    'Transfer-Encoding': 'chunked',
                    'Access-Control-Allow-Origin': 'http://192.168.1.226:8081',
                    'Access-Control-Allow-Credentials': true
                });
                res.write(data);
                res.end();
            })
        });

    }
});
server.listen(8104);