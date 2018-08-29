import React, {Component} from 'react';
import {StyleSheet, ScrollView, ListView, View, Text,} from 'react-native';
import Util from '../../common/util';
const styles = StyleSheet.create({
    // Container
    container: {
        flex: 13,
        position: 'relative'
    },
    // Scroll
    scrollView: {
        flex: 1
    },
    // List
    listView: {
        flex: 1,
        flexDirection: 'column',
        width: 860
    },
    // Player box (tr)
    titleRow: {
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 2,
        height: 30,
        borderStyle: 'solid'
    },
    playerBox: {
        alignItems: 'stretch',
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        height: 30
    },
    titleBox: {
        alignItems: 'stretch',
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 30,
        width: 860
    },
    playerBoxLast: {
        borderBottomWidth: 0
    },
    // Every box (td)
    title: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 12
    },
    dataBox: {
        alignSelf: 'center',
        color: '#222',
        fontSize: 11
    },
    p1: {
        alignItems: 'center',
        borderRightColor: '#c2c2c2',
        borderRightWidth: 1,
        flex: 1,
        flexDirection: 'row'
    }
});

export default class Data extends Component {
    constructor(props){
        super(props);
        this.state = {
            season2Type: 'average', // 常规赛
            season4Type: 'average' // 季后赛
        }
    }
    renderTitle = (type) => {
        const averageData = ['年度', '场数', '%', '三分%', '罚球%', '进攻', '防守', '场均篮板', '场均助攻', '场均抢断', '场均盖帽', '失误', '犯规', '场均得分'];
        const totalData = ['年度', '场数','命中','出手', '三分命中', '三分出手','罚球命中', '罚球出手', '进攻', '防守', '篮板', '助攻', '抢断', '盖帽', '失误', '犯规', '得分'];
        const titleData = type === 'total' ? totalData : averageData;
        return (
            <View style={[styles.titleBox,{backgroundColor: `${this.props.themeColor}dd`}]}>
                {
                    titleData.map((item, index) => (
                        <View style={styles.p1} key={index}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                            <Text style={styles.title}>{item}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }
    renderRow = (type, data, rowId, index) => {
        const rowData = type === 'average' ? data.team.statAverage : data.team.statTotal;
        const games = data.team.statAverage.games;
        const averageKey = ['fgpct', 'tppct', 'ftpct', 'offRebsPg', 'defRebsPg', 'rebsPg', 'assistsPg', 'stealsPg', 'blocksPg', 'turnoversPg', 'foulsPg', 'pointsPg'];
        const totalKey = ['fgm', 'fga', 'tpm', 'tpa', 'ftm', 'fta', 'offRebs', 'defRebs', 'rebs', 'assists', 'steals', 'blocks', 'turnovers', 'fouls', 'points'];
        const keys = type === 'average' ? averageKey : totalKey;
        return (
                <View style={ [styles.playerBox] } key={index}>
                    <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{data.year}</Text></View></View>
                    <View style={styles.p1}><View style={{flexDirection: 'column', flex: 1}}><Text style={styles.dataBox}>{games}</Text></View></View>
                    {keys.map((item, i) => {
                        return (
                            <View style={styles.p1} key={i}>
                                <View style={{flexDirection: 'column', flex: 1}}>
                                    <Text style={styles.dataBox}>{rowData[item]}</Text>
                                </View>
                            </View>)
                    })}
                    </View>
        )
    }
    changeType = (type,seasonType) => {
        if (this.state[type] !== seasonType) {
            if (type === 'season2Type') {
                this.setState({
                    season2Type: seasonType
                });
            } else {
                this.setState({
                    season4Type: seasonType
                });
            }
        }
    }
    render() {
        const horizontal = true;
        const originData = this.props.data || [];
        const themeColor = this.props.themeColor;
        const activeClass = {backgroundColor: themeColor};
        const seasonType2DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const seasonType4DataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let seasonType2Data = []; // 常规赛/平均
        let seasonType4Data = []; // 季后赛/平均
        if (originData.length > 0) {
            originData.forEach((v, i) => {
                if (v.seasonType === '2') {
                    seasonType2Data.push(v);
                } else if(v.seasonType === '4') {
                    seasonType4Data.push(v)
                }
            });
            seasonType2Data.reverse();
            seasonType4Data.reverse();
        }
        seasonType2Data = seasonType2DataSource.cloneWithRows(seasonType2Data);
        seasonType4Data = seasonType4DataSource.cloneWithRows(seasonType4Data);
        return (
            <View style={{flex: 1,backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',backgroundColor:themeColor,padding: 5}}>
                    <View>
                        <Text style={{color: '#fff',padding:5}}>常规赛数据</Text>
                    </View>
                    <View style={{backgroundColor:`rgba(255, 255, 255, 0.15)`,flexDirection: 'row',alignItems: 'center',padding:2,borderRadius: 3}}>
                        <View style={[this.state.season2Type === 'average' ? activeClass: '',{padding: 3,borderRadius: 3}]}>
                            <Text style={{color: '#fff'}}  onPress={()=> {this.changeType('season2Type','average')}}>平均</Text>
                        </View>
                        <View style={[this.state.season2Type === 'total' ? activeClass: '',{padding: 3,borderRadius: 3}]}>
                            <Text  style={{color: '#fff'}}  onPress={()=> {this.changeType('season2Type','total')}}>总计</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    {originData.length === 0 ? Util.loading : ( <ScrollView
                        automaticallyAdjustContentInsets={false}
                        horizontal={horizontal}
                        style={styles.scrollView}>
                        <View style={{flex: 1}}>
                            {this.renderTitle(this.state.season2Type)}
                            <ListView
                                dataSource={seasonType2Data}
                                renderRow={(data) => this.renderRow(this.state.season2Type,data)}
                                style={styles.listView} />
                        </View>
                    </ScrollView>)}
                </View>
                <View style={{flexDirection: 'row',justifyContent:'space-between',backgroundColor:themeColor,padding: 5}}>
                    <View>
                        <Text style={{color: '#fff',padding:5}}>季后赛数据</Text>
                    </View>
                    <View style={{backgroundColor:`rgba(255, 255, 255, 0.15)`,flexDirection: 'row',alignItems: 'center',padding:2,borderRadius: 3}}>
                        <View style={[this.state.season4Type === 'average' ? activeClass: '',{padding: 3,borderRadius: 3}]}>
                            <Text style={{color: '#fff'}}  onPress={()=> {this.changeType('season4Type','average')}}>平均</Text>
                        </View>
                        <View style={[this.state.season4Type === 'total' ? activeClass: '',{padding: 3,borderRadius: 3}]}>
                            <Text  style={{color: '#fff'}}  onPress={()=> {this.changeType('season4Type','total')}}>总计</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    {originData.length === 0 ? Util.loading : ( <ScrollView
                        automaticallyAdjustContentInsets={false}
                        horizontal={horizontal}
                        style={styles.scrollView}>
                        <View style={{flex: 1}}>
                            {this.renderTitle(this.state.season4Type)}
                            <ListView
                                dataSource={seasonType4Data}
                                renderRow={(data) => this.renderRow(this.state.season4Type,data)}
                                style={styles.listView} />
                        </View>
                    </ScrollView>)}
                </View>
            </View>
        )
    }
}