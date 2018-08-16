import React, {Component} from 'react';
import {StyleSheet, ScrollView, ListView, View, Text, Image} from 'react-native';
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
        height: 40,
        borderStyle: 'solid'
    },
    playerBox: {
        alignItems: 'stretch',
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        height: 40
    },
    titleBox: {
        alignItems: 'stretch',
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 40,
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
        flex: 1,
        flexDirection: 'row'
    },
    p2: {
        alignItems: 'center',
        flex: 2,
        flexDirection: 'row'
    },
    p3: {
        alignItems: 'center',
        flex: 3,
        flexDirection: 'row'
    },
    p5: {
        alignItems: 'center',
        flex: 5,
        flexDirection: 'row'
    },
    img: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderColor: '#dadada',
        borderWidth: 1
    }
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
export default class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            loadingShow: !props.data,
            currentTab: 'info'
        };
    }
    renderTitle = (type) => {
        const infoTitle = ['姓名', '位置', '身高', '体重', '球号', '生日', '经验','进入NBA之前', '国籍'];
        const dataTitle = ['姓名', '场数', '先发', '分钟', '%', '三分%', '罚球%', '进攻', '防守', '场均篮板', '场均助攻', '场均抢断', '场均盖帽', '失误', '犯规', '场均得分'];
        const currentTitle = type === 'info' ? infoTitle : dataTitle;
        return (
            <View style={[styles.titleBox,{backgroundColor: '#032f4f'}]}>
                {
                    currentTitle.map((item, index) => {
                        let currentStyle = type === 'info' ? styles.p2 : styles.p1;
                        if (item === '姓名') {
                            currentStyle = type === 'info' ? styles.p3 : styles.p2;
                        } else if (item === '进入NBA之前') {
                            currentStyle = styles.p5;
                        }
                        return (
                        <View style={currentStyle} key={index}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.title}>{item}</Text>
                            </View>
                        </View>
                    )})
                }
            </View>
        )
    }
    renderRow = (type, data, rowId, index) => { // /media/img/players/head/260x190/2738.png
        const rowData = type === 'info' ? data.profile : data.statAverage;
        const infoKey = [ 'position', 'height', 'weight', 'jerseyNo', 'dob', 'experience', 'displayAffiliation', 'country'];
        const dataKey = ['games', 'gamesStarted', 'minsPg', 'fgpct', 'tppct', 'ftpct', 'offRebsPg', 'defRebsPg', 'rebsPg', 'assistsPg', 'stealsPg', 'blocksPg', 'turnoversPg', 'foulsPg', 'pointsPg'];
        const keys = type === 'info' ? infoKey : dataKey;
        return (
            <View style={ [styles.playerBox] } key={index}>
                <View style={[type === 'info' ? styles.p3 : styles.p2,{marginLeft: 5}]}>
                    <View style={{flexDirection: 'column'}}>
                        <Image style={styles.img} source={{uri: `http://china.nba.com/media/img/players/head/260x190/${data.profile.playerId}.png`}}/>
                    </View>
                    <View style={{flexDirection: 'column',marginLeft: 5}}>
                        <Text style={[styles.dataBox,{alignSelf: 'flex-start', color: '#0064bb'}]}>{data.profile.firstName}</Text>
                        <Text style={[styles.dataBox,{alignSelf: 'flex-start', color: '#0064bb'}]}>{data.profile.lastName}</Text>
                    </View>
                </View>
                {keys.map((item, i) => {
                    let currentStyle = styles.p2;
                    if (type === 'info' && item === 'displayAffiliation') {
                        currentStyle = styles.p5
                    } else if (type === 'data') {
                        currentStyle = styles.p1
                    }
                    return (
                        <View style={currentStyle} key={i}>
                            <View style={{flexDirection: 'column', flex: 1}}>
                                <Text style={styles.dataBox}>{item === 'dob' ? getContentTime(rowData[item]): rowData[item]}</Text>
                            </View>
                        </View>)
                })}
            </View>
        )
    }
    render() {
        const {currentTab, loadingShow} = this.state;
        const horizontal = true;
        const originData = this.props.data || [];
        const activeClass = {backgroundColor: '#0f6db4'};
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        dataSource = dataSource.cloneWithRows(originData);
        return (
            <View style={{flex: 1,backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',backgroundColor:'#0f6db4',padding: 5}}>
                    <View>
                        <Text style={{color: '#fff',padding:5}}>季前赛阵容</Text>
                    </View>
                    <View style={{backgroundColor:'#032f4f',flexDirection: 'row',alignItems: 'center',padding:2,borderRadius: 3}}>
                        <View style={[currentTab === 'info' ? activeClass: '',{padding: 3,borderRadius: 3}]}>
                            <Text style={{color: '#fff'}}  onPress={()=> {this.setState({currentTab: 'info'})}}>信息</Text>
                        </View>
                        <View style={[currentTab === 'data' ? activeClass: '',{padding: 3,borderRadius: 3}]}>
                            <Text  style={{color: '#fff'}}  onPress={()=> {this.setState({currentTab: 'data'})}}>数据</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    {loadingShow ? Util.loading : (
                        <ScrollView
                        automaticallyAdjustContentInsets={false}
                        horizontal={horizontal}
                        style={styles.scrollView}>
                        <View style={{flex: 1}}>
                            {this.renderTitle(currentTab)}
                            <ListView
                                dataSource={dataSource}
                                renderRow={(data) => this.renderRow(currentTab,data)}
                                style={styles.listView} />
                        </View>
                    </ScrollView>)}
                </View>
            </View>
        )
    }
}