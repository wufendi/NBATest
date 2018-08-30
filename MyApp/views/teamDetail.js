import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Util from '../common/util';
import api from '../common/api';
import Agent from './teamDetail/agent';
import Data from './teamDetail/data';
import Datace from './teamDetail/datace';
import Contrast from './teamDetail/contrast';
import Player from './teamDetail/player';
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
        width: 80,
        height: 80,
        marginRight:10
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
    }
});
export default class TeamDetail extends Component {
    constructor(props){
        super(props)
        const teamName = props.navigation.state.params.name.toLowerCase();
        this.state = {
            name: teamName,
            themeColor: Util.getTeamRelate(teamName).color,
            stadium: Util.getTeamRelate(teamName).stadium,
            loadingShow: true,
            currentTab: 'agent',
            tabs: [{
                    text: '赛程',
                    key: 'agent'
                },
                {
                    text: '数据',
                    key: 'data'
                },
                {
                    text: '数据王',
                    key: 'datace'
                },
                {
                    text: '阵容',
                    key: 'player'
                },
                // {
                //     text: '对比',
                //     key: 'contrast'
                // }
                ],
            tabComponent: {
                agent: Agent,
                data: Data,
                datace: Datace,
                player: Player,
                contrast: Contrast
            },
            tabsContentData: {
                agent: {},
                data: {},
                datace: {},
                player: {},
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
    getData(teamName) {
        this.setState({
            loadingShow: true
        });
        Util.getRequest(api.getTeamDetailData+`?team=${teamName}`,{},(data)=>{
            if (data) {
                this.setState({
                    loadingShow: false,
                    tabsContentData: {
                        agent: data.monthGroups,
                        data: data.data,
                        datace: data.datace,
                        player: data.players,
                        contrast: data.contrast
                    },
                    info: data.info
                });
            } else {
                this.setState({
                    loadingShow: false,
                    info: null
                });
            }
          console.log(data);
        },error => {
            alert(error)
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params.name.toLowerCase() !== this.state.name) {
            const teamName = nextProps.navigation.state.params.name.toLowerCase();
            this.setState({
                name: teamName,
                themeColor: Util.getTeamRelate(teamName).color,
                stadium: Util.getTeamRelate(teamName).stadium,
            });
            this.getData(teamName);
        }
    }
    componentDidMount() {
        this.getData(this.state.name);
    }
    render() {
        const {currentTab, tabs, themeColor, tabComponent, info, tabsContentData, stadium} = this.state;
        const CurrentTabContent = tabComponent[currentTab]
        const currentData = tabsContentData[currentTab]
        const tabTextActive = {
            borderBottomWidth: 3,
                borderBottomColor: themeColor,
                color: themeColor
        }
        return (
            <View style={{ flex: 1 }}>
                {
                   this.state.info ? this.state.loadingShow ? Util.loading : (
                        <View style={{ flex: 1 }}>
                            <View style={[style.top,{ backgroundColor: themeColor}]}>
                                <View style={style.marginBottom10}>
                                    <Text style={[style.textCenter, style.fontLarge, style.fontWhite]}>{info.profile.city}{info.profile.name}</Text>
                                    <Text style={[style.textCenter, style.fontSmall, style.fontWhite]}>{info.profile.cityEn}  {info.profile.nameEn}</Text>
                                </View>
                                <View style={style.topContent}>
                                    <View style={style.centerContainer}>
                                        <Image  style={style.topImg} source={Util.getTeamLogo(info.profile.abbr)}/>
                                    </View>
                                    <View>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>战&nbsp;&nbsp;&nbsp;&nbsp;绩：{info.standings.wins}胜{info.standings.losses}负 {info.profile.displayConference}第{info.standings.confRank}</Text>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>排&nbsp;&nbsp;&nbsp;&nbsp;名：场均得分第{info.rank.ppg}  场均助攻第{info.rank.apg}</Text>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;场均篮板第{info.rank.rpg}  对手得分第{info.rank.oppg}</Text>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>球&nbsp;&nbsp;&nbsp;&nbsp;馆：{stadium}</Text>
                                        <Text style={[ style.fontSmall, style.fontWhite]}>主教练：{info.coach.headCoach}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around',  backgroundColor: '#fff'}}>
                                {tabs.map((v, i)=> <Text style={[style.tabText,v.key === currentTab ? tabTextActive : '']} key={i} onPress={() => {this.changeTab(v.key)}}> {v.text} </Text>)}
                            </View>
                            <View style={{flex: 1}}>
                                <CurrentTabContent navigation={this.props.navigation} data={currentData} themeColor = {themeColor}/>
                            </View>
                        </View>
                    ) : (<View style={{flex: 1}}><Text style={{textAlign: 'center',marginTop: 20}}>该球队不存在或者解散了</Text></View>)
                }
            </View>
        )
    }
}