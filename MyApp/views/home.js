import React, {Component} from 'react';
import { StyleSheet, ScrollView, ListView, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TeamDetail from './teamDetail'
import Util from '../common/util';
import api from '../common/api';
const mainColor = '#006bb7';
const style = StyleSheet.create({
    conferenceView: {
        backgroundColor: mainColor
    },
    mainColor: {
        color: mainColor
    },
    conferenceItem: {
        flexDirection: 'row',
        height: 60,
        padding: 10
    },
    conferenceImage: {
        width: 36,
        height: 36
    },
    conferenceTitle: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold'
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
    image: {
        width: 30,
        height: 30
    },
    bigSize: {
        fontSize: 16
    },
    widthLarge: {
        width: '25%'
    },
    widthMiddle: {
        width: '20%'
    },
    widthSmall: {
        width: '13%'
    },
    rankBg: {
        backgroundColor: mainColor,
        color: '#fff',
        padding: 5,
    }
});
export default class Home extends Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({focused}) => {
            return (
                <Icon name='home' size={20} color= {focused ? mainColor : 'black'} />
            );
        },
    }
    constructor(props){
        super(props);
        const eastSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const westSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loadingShow: true,
            eastSource,
            westSource
        };
        this.renderRow = (data, rowId, index) => {
            return (
                <TouchableOpacity style={style.item} onPress={() => {this.teamDetail(data)}}>
                    <View  style={[style.centerContainer, style.widthSmall]}>
                        <Text style={[{textAlign: 'center'}, Number(index) < 8 ? style.rankBg: '' ]}> {Number(index) + 1} </Text>
                    </View>
                    <View style={[style.item, style.widthLarge]}>
                        <View style={[style.centerContainer]}>
                            <Image  style={[style.image,{marginRight: 8}]} source={Util.getTeamLogo(data.abbr)}/>
                        </View>
                        <View  style={[style.centerContainer]}>
                            <Text style={[style.bigSize, style.mainColor]}> {data.name}</Text>
                        </View>
                    </View>
                    <View  style={[style.centerContainer, style.widthSmall]}>
                        <Text> {data.wins} </Text>
                    </View>
                    <View  style={[style.centerContainer, style.widthSmall]}>
                        <Text> {data.losses} </Text>
                    </View>
                    <View  style={[style.centerContainer, style.widthMiddle]}>
                        <Text> {data.winPct} % </Text>
                    </View>
                    <View  style={[style.centerContainer, style.widthSmall]}>
                        <Text> {data.confGamesBehind} </Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    teamDetail (data) {
        this.props.navigation.navigate('TeamDetail', { name: data.nameEn })
    }
    getData() {
        this.setState({
            loadingShow: true
        });
        Util.getRequest(api.getTeamRankData,{},(data)=>{
            const eastSource = this.state.eastSource;
            const westSource = this.state.westSource;
            let eastData = [];
            let westData = [];
            data.forEach((v, i) => {
                if (v.conference === 'Eastern') {
                    eastData.push(v)
                } else {
                    westData.push(v);
                }
            });
            eastData.sort((a, b) => b.wins - a.wins);
            westData.sort((a, b) => b.wins - a.wins);
            this.setState({
                loadingShow: false,
                eastSource: eastSource.cloneWithRows(eastData),
                westSource: westSource.cloneWithRows(westData)
            });
        },error => {
            alert(error)
        })
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{height: '50%'}}>
                    <View style={[style.conferenceItem, style.conferenceView]}>
                        <View style={style.centerContainer}>
                            <Image  style={style.conferenceImage} source={require('../imgs/eastern_logo.png')}/>
                        </View>
                        <View style={style.centerContainer}>
                            <Text style={style.conferenceTitle}>东部联盟排行榜</Text>
                        </View>
                    </View>
                    <View style={style.item}>
                        <View  style={[style.centerContainer, style.widthSmall]}>
                            <Text style={{textAlign: 'center'}}> 排名 </Text>
                        </View>
                        <View style={[style.centerContainer, style.widthLarge]}>
                            <Text style={{textAlign: 'center'}}> 球队 </Text>
                        </View>
                        <View  style={[style.centerContainer, style.widthSmall]}>
                            <Text> 胜 </Text>
                        </View>
                        <View  style={[style.centerContainer, style.widthSmall]}>
                            <Text> 负 </Text>
                        </View>
                        <View  style={[style.centerContainer, style.widthMiddle]}>
                            <Text> 胜率 </Text>
                        </View>
                        <View  style={[style.centerContainer, style.widthSmall]}>
                            <Text> 胜差 </Text>
                        </View>
                    </View>
                    <ScrollView>
                        <ListView dataSource={this.state.eastSource}
                                  renderRow={this.renderRow}
                        />
                    </ScrollView>
                </View>
                <View style={{height: '50%'}}>
                    <View style={[style.conferenceItem, style.conferenceView]}>
                        <View style={style.centerContainer}>
                            <Image  style={style.conferenceImage} source={require('../imgs/western_logo.png')}/>
                        </View>
                        <View style={style.centerContainer}>
                            <Text style={style.conferenceTitle}>西部联盟排行榜</Text>
                        </View>
                    </View>
                    <View style={style.item}>
                        <View  style={[style.centerContainer, style.widthSmall]}>
                            <Text style={{textAlign: 'center'}}> 排名 </Text>
                        </View>
                        <View style={[style.centerContainer, style.widthLarge]}>
                            <Text style={{textAlign: 'center'}}> 球队 </Text>
                        </View>
                        <View  style={[style.centerContainer, style.widthSmall]}>
                            <Text> 胜 </Text>
                        </View>
                        <View  style={[style.centerContainer, style.widthSmall]}>
                            <Text> 负 </Text>
                        </View>
                        <View  style={[style.centerContainer, style.widthMiddle]}>
                            <Text> 胜率 </Text>
                        </View>
                        <View  style={[style.centerContainer, style.widthSmall]}>
                            <Text> 胜差 </Text>
                        </View>
                    </View>
                    <ScrollView>
                        <ListView dataSource={this.state.westSource}
                                  renderRow={this.renderRow}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}