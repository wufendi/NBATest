import React, {Component} from 'react';
import {StyleSheet, ScrollView, ListView, TouchableOpacity, View, Text,} from 'react-native';
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
    },
});

export default class Splits extends Component {
    constructor(props){
        super(props);
        this.state = {
            splitType: 'average', // 职业生涯数据
            titleTextData: {
                average:['分类', '场数', '先发', '分钟', '%', '三分%', '罚球%', '进攻', '防守', '场均篮板', '场均助攻', '场均抢断', '场均盖帽','场均得分'],
                total:['分类', '场数', '先发', '分钟', '%', '三分%', '罚球%', '进攻', '防守', '篮板', '助攻', '抢断', '盖帽','得分']
            },
            titleKeyData: {
                average: ['displayName', 'games', 'gamesStarted', 'minsPg', 'fgpct', 'tppct', 'ftpct', 'offRebsPg', 'defRebsPg', 'rebsPg', 'assistsPg', 'stealsPg', 'blocksPg', 'pointsPg'],
                total: ['displayName', 'games', 'gamesStarted', 'mins', 'fgpct', 'tppct', 'ftpct', 'offRebs', 'defRebs', 'rebs', 'assists', 'steals', 'blocks', 'points']
            }
        }
    }
    renderTitle = (type) => {
        const titleData = this.state.titleTextData[type];
        return (
            <View style={[styles.titleBox,{backgroundColor: `${this.props.themeColor}dd`}]}>
                {
                    titleData.map((item, index) => (
                        <View style={[styles.p1,{flex: item === '分类' ? 2 : 1 }]} key={index}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.title}>{item}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }
    renderRow = (currentKey, type, data, rowId, index) => {
        const keys = this.state.titleKeyData[type];
        const _type = type === 'average' ? 'statAverage' : 'statTotal';
        const _data = Object.assign(
            {
                displayName: data.displayName,
                games: data.statAverage ? data.statAverage.games : '-',
                gamesStarted: data.statAverage ? data.statAverage.gamesStarted : '-'
            },
            data[_type]
        );
        return (
            <View style={ [styles.playerBox] } key={index}>
                {keys.map((item, i) => {
                    return (
                        <View style={[styles.p1,{flex: item === 'displayName' ? 2 : 1}]} key={i}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.dataBox}>{_data[item]}</Text>
                            </View>
                        </View>)
                })}
            </View>
        )
    }
    changeType = (type,seasonType) => { // type :regularSeasonStatType / playoffStatType /allStarStatType
        if (this.state[type] !== seasonType) {
            this.setState({
                [type]: seasonType
            });
        }
    }
    render() {
        const horizontal = true;
        const originData = this.props.data || [];
        const themeColor = this.props.themeColor || '#0f6db4';
        const activeClass = {backgroundColor: themeColor};
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let currentData = originData; // 分类
        let allData = []
        if (currentData.length > 0) {
            currentData = dataSource.cloneWithRows(currentData);
            allData.push({
                title: '分类数据',
                currentKey: 'splitType',
                data: currentData,
                type: this.state.splitType
            });
        }
        return (
            <View style={{flex: 1,backgroundColor: '#fff'}}>
                {
                    allData.length > 0 ? allData.map((item, i) => (
                        <View key={i} style={{flex: 1}}>
                            <View style={{flexDirection: 'row',justifyContent:'space-between',backgroundColor: themeColor,padding: 5}}>
                                <View>
                                    <Text style={{color: '#fff',padding:5}}>{item.title}</Text>
                                </View>
                                <View style={{backgroundColor: `rgba(255, 255, 255, 0.15)`,flexDirection: 'row',alignItems: 'center',padding:2,borderRadius: 3}}>
                                    <View style={[item.type === 'average' ? activeClass: '',{padding: 3,borderRadius: 3}]}>
                                        <Text style={{color: '#fff'}}  onPress={()=> {this.changeType(item.currentKey,'average')}}>平均</Text>
                                    </View>
                                    <View style={[item.type === 'total' ? activeClass: '',{padding: 3,borderRadius: 3}]}>
                                        <Text  style={{color: '#fff'}}  onPress={()=> {this.changeType(item.currentKey,'total')}}>总计</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.container}>
                                {item.data.length === 0 ? Util.loading : ( <ScrollView
                                    automaticallyAdjustContentInsets={false}
                                    horizontal={horizontal}
                                    style={styles.scrollView}>
                                    <View style={{flex: 1}}>
                                        {this.renderTitle(item.type)}
                                        <ListView
                                            dataSource={item.data}
                                            renderRow={(data) => this.renderRow(item.currentKey, item.type, data)}
                                            style={styles.listView} />
                                    </View>
                                </ScrollView>)}
                            </View>
                        </View>
                    )) : (<View style={{flex: 1}}><Text style={{textAlign: 'center',marginTop: 20}}>暂无数据</Text></View>)
                }
            </View>
        )
    }
}