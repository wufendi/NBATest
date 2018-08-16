const getNbaTeamData = require('./getNbaTeamData');
const getTeamRankData = require('./getTeamRankData');
const getLogoSvg = require('./getLogoSvg');
const getTeamDetailData = require('./getTeamDetailData');
const http = require('http');
const url = require('url');
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
                'Content-Type': 'text/plain;charset=utf-8',
                'Transfer-Encoding': 'chunked',
                'Access-Control-Allow-Origin': 'http://192.168.1.226:8081',
                'Access-Control-Allow-Credentials': true
            });
            res.write(data);
            res.end();
        })
    }
});
server.listen(8104);