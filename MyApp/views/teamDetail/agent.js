import React, {Component} from 'react';
import {StyleSheet, ScrollView, SectionList, View, Text,} from 'react-native';
import Util from '../../common/util';
const mainColor = '#006bb7';
const style = StyleSheet.create({
    mainColor: {
        color: mainColor
    },
    fontWhite: {
        color: '#fff'
    },
    top: {
        backgroundColor: '#032f4f',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    },
    sectionTop: {
        backgroundColor: '#356da0',
        padding: 10
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
    }
});
function getContentTime(time) {
    if (time) {
        const date = new Date(Number(time));
        const year = date.getFullYear();
        let M = date.getMonth() + 1;
        let d = date.getDate();
        let H = date.getHours();
        let m = date.getMinutes();
        M = M > 9 ? M : `0${M}`;
        d = d > 9 ? d : `0${d}`;
        H = H > 9 ? H : `0${H}`;
        m = m > 9 ? m : `0${m}`;
        return `${year}-${M}-${d}  ${H}:${m}`;
    }
}
export default class Agent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const originData = this.props.data || [];
        let sectionData = [];
        if (originData.length > 0) {
            originData.forEach((v, i) => {
                sectionData.push({title: v.name, data: v.games})
            });
        }
        return (
            <View style={{flex:1,paddingBottom:20,backgroundColor:'#fff'}}>
                <View style={[style.top]}>
                    <View style={[{width: '25%'},style.centerContainer]}><Text style={style.fontWhite}>时间</Text></View>
                    <View style={[{width: '8%'},style.centerContainer]}><Text style={style.fontWhite}>主客</Text></View>
                    <View style={[{width: '15%'},style.centerContainer]}><Text style={style.fontWhite}>对手</Text></View>
                    <View style={[{width: '15%'},style.centerContainer]}><Text style={style.fontWhite}>比分</Text></View>
                    <View style={[{width: '37%'},style.centerContainer]}><Text style={style.fontWhite}>地点</Text></View>
                </View>
                <View style={{flex:1}}>
                    {!sectionData ? Util.loading : (
                        <ScrollView>
                            <SectionList
                                renderItem={({item, index}) => {
                                    return (
                                        <View style={[style.item]} key={index}>
                                            <View style={[{width: '25%'},style.centerContainer]}><Text>{getContentTime(item.profile.utcMillis)}</Text></View>
                                            <View style={[{width: '8%'},style.centerContainer]}><Text>{item.isHome === 'true' ? '主' : '客'}</Text></View>
                                            <View style={[{width: '15%'},style.centerContainer]}><Text style={{color: '#0064bb'}} onPress={() => {this.props.teamDetail(item.isHome === 'true' ? item.awayTeam.profile : item.homeTeam.profile)}}>{item.isHome === 'true' ? item.awayTeam.profile.name : item.homeTeam.profile.name}</Text></View>
                                            <View style={[{width: '15%'},style.centerContainer]}><Text>{item.boxscore.homeScore}-{item.boxscore.awayScore}{item.winOrLoss}</Text></View>
                                            <View style={[{width: '37%'},style.centerContainer]}><Text>{item.profile.arenaName}</Text></View>
                                        </View>
                                    )
                                }}
                                renderSectionHeader = {({section: {title}}) => {
                                    return ( <View style={[style.sectionTop]}><Text style={style.fontWhite}>{title}</Text></View>)
                                }}
                                sections = {sectionData}
                                keyExtractor={(item, index) => index}
                            />
                        </ScrollView>
                    )}
                </View>
            </View>
        )
    }
}