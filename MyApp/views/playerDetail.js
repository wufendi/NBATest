import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Util from '../common/util';
import api from '../common/api';
import Career from './playerDetail/career';
import Splits from './playerDetail/splits';
import SeasonGames from './playerDetail/seasonGames';
import Contrast from './playerDetail/contrast';
const mainColor = '#006bb7';
const style = StyleSheet.create({
    mainColor: {
        color: mainColor
    },
    textCenter: {
        textAlign: 'center'
    },
    fontLarge: {
        fontSize: 18
    },
    fontSmall: {
        fontSize: 12
    },
    fontWhite: {
        color: '#fff'
    },
    marginBottom10: {
        marginBottom: 10
    },
    marginRight10: {
        marginRight: 10
    },
    top: {
        padding: 10
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: 'white'
    },
    item:{
        flexDirection: 'row',
        height: 40,
        padding: 5
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigSize: {
        fontSize: 16
    },
    rankBg: {
        backgroundColor: mainColor,
        color: '#fff',
        padding: 5,
    },
    tabText: {
        padding: 10,
    },
    tabTextActive: {
        borderBottomWidth: 3,
        borderBottomColor: mainColor,
        color: mainColor
    }
});
export default class PlayerDetail extends Component {
    constructor(props){
        super(props)
        const playerName = props.navigation.state.params.name.toLowerCase()
        this.state = {
            name: playerName,
            themeColor: mainColor,
            loadingShow: true,
            currentTab: 'career',
            tabs: [
                {
                    text: '职业生涯',
                    key: 'career'
                },
                {
                    text: '分类',
                    key: 'splits'
                },
                {
                    text: '比赛日志',
                    key: 'seasonGames'
                },
                {
                    text: '对比',
                    key: 'contrast'
                },
            ],
            tabComponent: {
                career: Career,
                splits: Splits,
                seasonGames: SeasonGames,
                contrast: Contrast
            },
            tabsContentData: {
                career: {},
                splits: {},
                seasonGames: {},
                contrast: {}
            },
            info: {}
        }
    }
    changeTab(key) {
        if (key !== this.state.currentTab) {
            this.setState({currentTab: key});
        }
    }
    getData() {
        this.setState({
            loadingShow: true
        });
        Util.getRequest(api.getPlayerDetailData+`?name=${this.state.name}`,{},(data)=>{
            if (data) {
                this.setState({
                    loadingShow: false,
                    tabsContentData: {
                        career: data.stats.regularSeasonStat.playerTeams,
                        splits: data.stats.playerSplit.splits,
                        seasonGames: data.stats.seasonGames,
                        contrast: data.stats
                    },
                    themeColor: Util.getTeamRelate(data.teamProfile.code).color,
                    info: {
                        displayName: data.playerProfile.displayName,
                        playerId: data.playerProfile.playerId,
                        jerseyNo: data.playerProfile.jerseyNo,
                        assistsPg:  data.stats.currentSeasonTypeStat.currentSeasonTypePlayerTeamStats[0].statAverage.assistsPg,
                        pointsPg:  data.stats.currentSeasonTypeStat.currentSeasonTypePlayerTeamStats[0].statAverage.pointsPg,
                        rebsPg:  data.stats.currentSeasonTypeStat.currentSeasonTypePlayerTeamStats[0].statAverage.rebsPg
                    }
                });
            }
            console.log(data);
        },error => {
            alert(error)
        })
    }
    componentWillReceiveProps(nextProps) {
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const {currentTab, tabs, themeColor, tabComponent, info, tabsContentData} = this.state;
        const CurrentTabContent = tabComponent[currentTab]
        const currentData = tabsContentData[currentTab]
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.loadingShow ? Util.loading : (
                        <View style={{ flex: 1 }}>
                            <View style={[style.top,{ backgroundColor: themeColor}]}>
                                <View style={[style.marginBottom10]}>
                                    <View style={{textAlign: 'center'}}>
                                        <Image  style={style.topImg} source={{uri: `http://china.nba.com/media/img/players/head/260x190/${info.playerId}.png`}}/>
                                    </View>
                                    <Text style={[style.textCenter, style.fontSmall, style.fontWhite]}>{info.displayName}</Text>
                                    <Text style={[style.textCenter, style.fontSmall, style.fontWhite]}>{info.jerseyNo}</Text>
                                </View>
                                <View style={style.topContent}>
                                    <View style={style.centerContainer}>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>场均得分</Text>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>{info.pointsPg}</Text>
                                    </View>
                                    <View>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>场均篮板</Text>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>{info.rebsPg}</Text>
                                    </View>
                                    <View>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>场均助攻</Text>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>{info.assistsPg}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around',  backgroundColor: '#fff'}}>
                                {tabs.map((v, i)=> <Text style={[style.tabText,v.key === currentTab ? style.tabTextActive : '']} key={i} onPress={() => {this.changeTab(v.key)}}> {v.text} </Text>)}
                            </View>
                            <View style={{flex: 1}}>
                                <CurrentTabContent navigation={this.props.navigation} data={currentData} />
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}