import React, {Component} from 'react';
import {Dimensions, ActivityIndicator} from 'react-native';
const Util = {
    getRequest: (url,successCallback, failCallback) => {
        fetch(url)
            .then((res)=>res.json())
            .then((data) => successCallback(data))
            .catch((err) => failCallback(err))
    },
    loading:<ActivityIndicator style={{marginTop: 20}}/>,
    getTeamLogo: (name) => {
        let source
        switch (name) {
            case 'ATL' : source = require('../imgs/group-logo-png/ATL.png')
                break;
            case 'BKN': source = require('../imgs/group-logo-png/BKN.png')
                break;
            case 'BOS': source = require('../imgs/group-logo-png/BOS.png')
                break;
            case 'CHA': source = require('../imgs/group-logo-png/CHA.png')
                break;
            case 'CHI': source = require('../imgs/group-logo-png/CHI.png')
                break;
            case 'CLE': source = require('../imgs/group-logo-png/CLE.png')
                break;
            case 'DAL': source = require('../imgs/group-logo-png/DAL.png')
                break;
            case 'DEN': source = require('../imgs/group-logo-png/DEN.png')
                break;
            case 'DET': source = require('../imgs/group-logo-png/DET.png')
                break;
            case 'GSW': source = require('../imgs/group-logo-png/GSW.png')
                break;
            case 'HOU': source = require('../imgs/group-logo-png/HOU.png')
                break;
            case 'IND': source = require('../imgs/group-logo-png/IND.png')
                break;
            case 'LAC': source = require('../imgs/group-logo-png/LAC.png')
                break;
            case 'LAL': source = require('../imgs/group-logo-png/LAL.png')
                break;
            case 'MEM': source = require('../imgs/group-logo-png/MEM.png')
                break;
            case 'MIA': source = require('../imgs/group-logo-png/MIA.png')
                break;
            case 'MIL': source = require('../imgs/group-logo-png/MIL.png')
                break;
            case 'MIN': source = require('../imgs/group-logo-png/MIN.png')
                break;
            case 'NOP': source = require('../imgs/group-logo-png/NOP.png')
                break;
            case 'NYK': source = require('../imgs/group-logo-png/NYK.png')
                break;
            case 'OKC': source = require('../imgs/group-logo-png/OKC.png')
                break;
            case 'ORL': source = require('../imgs/group-logo-png/ORL.png')
                break;
            case 'PHI': source = require('../imgs/group-logo-png/PHI.png')
                break;
            case 'PHX': source = require('../imgs/group-logo-png/PHX.png')
                break;
            case 'POR': source = require('../imgs/group-logo-png/POR.png')
                break;
            case 'SAC': source = require('../imgs/group-logo-png/SAC.png')
                break;
            case 'SAS': source = require('../imgs/group-logo-png/SAS.png')
                break;
            case 'TOR': source = require('../imgs/group-logo-png/TOR.png')
                break;
            case 'UTA': source = require('../imgs/group-logo-png/UTA.png')
                break;
            case 'WAS': source = require('../imgs/group-logo-png/WAS.png')
                break;

        }
        return source
    },
    getTeamRelate: (name) => {
        let color
        let stadium
        switch (name) {
            case 'hawks': color = '#ff353a';stadium = '菲利浦体育馆' // 老鹰
                break;
            case 'celtics': color = '#0a9b5a'; stadium = 'TD北岸花园球馆' // 凯尔特人
                break;
            case 'nets': color = '#373737'; stadium = '巴克莱中心' // 篮网
                break;
            case 'cavaliers': color = '#a50347'; stadium = '速贷球馆' // 骑士
                break;
            case 'hornets': color = '#02a1c1'; stadium = '时代华纳中心球馆' // 黄蜂
                break;
            case 'bulls': color = '#d31145'; stadium = '联合中心球馆' // 公牛
                break;
            case 'pistons': color = '#f8285b'; stadium = '奥本山宫殿球馆' // 活塞
                break;
            case 'bucks': color = '#076e2e'; stadium = '布拉德利中心' // 雄鹿
                break;
            case 'heat': color = '#c1063e'; stadium = '美航球馆' // 热火
                break;
            case 'pacers': color = '#084b98'; stadium = '银行家生活球馆' // 步行者
                break;
            case 'magic': color = '#0087d5'; stadium = '安利中心' // 魔术
                break;
            case 'raptors': color = '#d31145';stadium = '加拿大航空中心体育馆' // 猛龙
                break;
            case 'warriors': color = '#fdb927';stadium = '奥克兰体育馆' // 勇士
                break;
            case 'timberwolves': color = '#023a56'; stadium = '标靶中心球馆' // 森林狼
                break;
            case 'kings': color = '#885ac0';stadium = '阿科球馆' // 国王
                break;
            case 'nuggets': color = '#f6b220'; stadium = '丹佛百事中心' // 掘金
                break;
            case 'grizzlies': color = '#0540a4';stadium = '联邦快递球馆' // 灰熊
                break;
            case 'blazers': color = '#e1383d'; stadium = '摩达中心' // 开拓者
                break;
            case 'knicks': color = '#ff9c49'; stadium = '麦迪逊广场花园' // 尼克斯
                break;
            case 'mavericks': color = '#0278cb';stadium = '美国航线中心' // 独行侠
                break;
            case 'lakers': color = '#652a9c';stadium = '斯台普斯中心' // 湖人
                break;
            case 'suns': color = '#f1590f';stadium = '美航中心' // 太阳
                break;
            case 'wizards': color = '#014899'; stadium = 'Verizon威瑞森中心球馆' // 奇才
                break;
            case 'rockets': color = '#d31145'; stadium = '丰田中心球馆'// 火箭
                break;
            case 'pelicans': color = '#03438a';stadium = '新奥尔良球馆' // 鹈鹕
                break;
            case 'spurs': color = '#052535'; stadium = 'AT&T中心球馆' // 马刺
                break;
            case 'sixers': color = '#ef1c51'; stadium = '瓦乔维亚中心球场' // 76人
                break;
            case 'clippers': color = '#037fd6';stadium = '斯台普斯中心' // 快船
                break;
            case 'thunder': color = '#0083cc'; stadium = '切萨皮克能源球馆' // 雷霆
                break;
            case 'jazz': color = '#004490'; stadium = '能源方案球馆' // 爵士
                break;

        }
        return {
            color,
            stadium
        }
    }
}
export default Util;