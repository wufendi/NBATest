import React, {Component} from 'react';
import {StyleSheet, ScrollView, ListView, TouchableOpacity, View, Text,} from 'react-native';
const styles = StyleSheet.create({
    // Container
    container: {
        flex: 21,
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
        width: 880
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
        width: 880
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
function getContentTime(time) {
    if (time) {
        const date = new Date(Number(time));
        const year = date.getFullYear();
        let M = date.getMonth() + 1;
        let d = date.getDate();
        M = M > 9 ? M : `0${M}`;
        d = d > 9 ? d : `0${d}`;
        return `${year}-${M}-${d}`;
    }
}

export default class SeasonGames extends Component {
    constructor(props){
        super(props);
        this.state = {
            splitType: 'average', // 职业生涯数据
            titleTextData: ['日期', '对手', '分钟', '得分', '篮板', '助攻', '抢断', '盖帽', '命中', '出手', '%','三分命中', '三分出手', '三分%', '罚球命中', '罚球出手', '罚球%', '进攻', '防守', '失误', '犯规'],
            titleKeyData:['date', 'oppTeamName', 'mins', 'points', 'rebs', 'assists', 'steals', 'blocks', 'fgm', 'fga', 'fgpct', 'tpm', 'tpa', 'tppct', 'ftm', 'fta', 'ftpct', 'offRebs', 'defRebs', 'turnovers', 'fouls']
        }
    }
    teamDetail (data) {
        this.props.navigation.navigate('TeamDetail', { name: data })
    }
    renderTitle = () => {
        const titleData = this.state.titleTextData;
        return (
            <View style={[styles.titleBox,{backgroundColor: `${this.props.themeColor}dd`}]}>
                {
                    titleData.map((item, index) => (
                        <View style={[styles.p1, {flex: ((item === '日期') || (item === '对手')) ? 2:1}]} key={index}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.title}>{item}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        )
    }
    renderRow = (data, rowId, index) => {
        const keys = this.state.titleKeyData;
        const _data = Object.assign(
            {
                date: getContentTime(data.profile.utcMillis),
                oppTeamName: data.profile.oppTeamProfile.name
            },
            data.statTotal
        );
        return (
            <View style={ [styles.playerBox] } key={index}>
                {keys.map((item, i) => {
                    if (item === 'oppTeamName') {
                        return (
                            <TouchableOpacity style={[styles.p1, {flex: 2}]} key={i} onPress={()=> this.teamDetail(data.profile.oppTeamProfile.code)}>
                                <View style={{flexDirection: 'column', flex: 1}}>
                                    <Text style={[styles.dataBox,{color: '#0064bb'}]}>{_data[item]}</Text>
                                </View>
                            </TouchableOpacity>)
                    }
                    return (
                        <View style={[styles.p1,{flex: item === 'date' ? 2:1}]} key={i}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.dataBox}>{_data[item]}</Text>
                            </View>
                        </View>)
                })}
            </View>
        )
    }
    render() {
        const horizontal = true;
        const originData = this.props.data || [];
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const currentData = dataSource.cloneWithRows(originData);

        return (
            <View style={{flex: 1,backgroundColor: '#fff'}}>
                <View style={{flex: 1}}>
                    <View style={styles.container}>
                       <ScrollView
                            automaticallyAdjustContentInsets={false}
                            horizontal={horizontal}
                            style={styles.scrollView}>
                            <View style={{flex: 1}}>
                                {this.renderTitle()}
                                <ListView
                                    dataSource={currentData}
                                    renderRow={(data) => this.renderRow(data)}
                                    style={styles.listView} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}