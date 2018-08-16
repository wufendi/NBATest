import React, {Component} from 'react';
import {StyleSheet, ScrollView, ListView, TouchableOpacity, View, Text, Image} from 'react-native';
import Util from '../../common/util';
const mainColor = '#006bb7';
const style = StyleSheet.create({
    mainColor: {
        color: mainColor
    },
    flex1: {
        flex:1
    },
    flex2: {
        flex: 2
    },
    flex3: {
        flex:3
    },
    flex4: {
        flex: 4
    },
    image: {
        width: 56,
        height: 56
    },
    firstRank: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: mainColor,
        padding: 5,
    },
    rank: {
        padding: 5,
        color: mainColor
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ebeef5'
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabText: {
        padding: 3,
        color: '#fff',
        fontSize: 12
    },
    tabTextActive: {
        borderRadius: 3,
        backgroundColor: mainColor
    }
});
export default class Datace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingShow: !props.data.pointLeader,
            currentTab: 'pts',
            tabs: [{
                    text: '场均得分',
                    key: 'pts'
                },
                {
                    text: '场均篮板',
                    key: 'reb'
                },
                {
                    text: '场均助攻',
                    key: 'ast'
                },
                {
                    text: '场均抢断',
                    key: 'stl'
                },
                {
                    text: '场均盖帽',
                    key: 'blk'
                },
                {
                    text: '三分%',
                    key: 'tpp'
                },
                {
                    text: '%',
                    key: 'fgp'
                },
                {
                    text: '罚球%',
                    key: 'ftp'
                },
                {
                    text: '分钟',
                    key: 'min'
                }
            ],
            tabsContentData: {
                pts: props.data.pointLeader,
                reb: props.data.reboundLeader,
                ast: props.data.assistLeader,
                stl: props.data.stealLeader,
                blk: props.data.blockLeader,
                tpp: props.data.threePtPctLeader,
                fgp: props.data.fgPctLeader,
                ftp: props.data.ftPctLeader,
                min: props.data.minLeader
            }
        }
        this.renderRow = (data, rowId, index) => {
            return (
                <TouchableOpacity style={[style.item, {flex: 10}]} key={rowId}>
                    <View style={[style.centerContainer, style.flex1]}>
                        <Text style={data.rank === '1' ? style.firstRank : style.rank}> {data.rank}</Text>
                    </View>
                    <View  style={[style.centerContainer,style.flex3]}>
                        <Image style={style.image} source={{uri: `http://china.nba.com/media/img/players/silos/220x350/${data.profile.playerId}.png`}}/>
                    </View>
                    <View  style={[style.centerContainer, style.flex4]}>
                        <Text> {data.profile.displayName} </Text>
                        <Text> {data.profile.jerseyNo} / {data.profile.position}</Text>
                    </View>
                    <View  style={[style.centerContainer, style.flex2]}>
                        <Text style={{fontWeight: 'bold'}}> {data.value} </Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    changeTab(key) {
        if (key !== this.state.currentTab) {
            this.setState({currentTab: key});
        }
    }
    componentWillReceiveProps(nextProps) {
        const tabsContentData = {
            pts: nextProps.data.pointLeader,
            reb: nextProps.data.reboundLeader,
            ast: nextProps.data.assistLeader,
            stl: nextProps.data.stealLeader,
            blk: nextProps.data.blockLeader,
            tpp: nextProps.data.threePtPctLeader,
            fgp: nextProps.data.fgPctLeader,
            ftp: nextProps.data.ftPctLeader,
            min: nextProps.data.minLeader
        }
        const loadingShow = !tabsContentData[this.state.currentTab]
        this.setState({
            tabsContentData,
            loadingShow
        })
    }
    render() {
        const {currentTab, tabsContentData, loadingShow, tabs} = this.state;
        const dataSource =  new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let currentTabData = dataSource.cloneWithRows([]);
        let seasonType = '常规赛';
        console.log(this.state)
        if (!loadingShow) {
            currentTabData = dataSource.cloneWithRows(tabsContentData[currentTab].players);
            seasonType = tabsContentData[currentTab].seasonType === '2' ? '常规赛' : '季后赛';
        }
        return (
            <View style={{flex:1,paddingBottom:20,backgroundColor:'#fff'}}>
                <View style={{ backgroundColor: mainColor, padding: 10}}>
                    <Text style={{color: '#fff'}}>{seasonType}数据王</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around',  backgroundColor: '#032f4f',padding: 2}}>
                    {tabs.map((v, i)=> <Text style={[style.tabText,v.key === currentTab ? style.tabTextActive : '']} key={i} onPress={() => {this.changeTab(v.key)}}> {v.text} </Text>)}
                </View>
                <View>
                {loadingShow ? Util.loading: (
                    <ScrollView>
                        <ListView dataSource={currentTabData}
                                  renderRow={this.renderRow}
                        />
                    </ScrollView>
                )}
                </View>
            </View>
        )
    }
}