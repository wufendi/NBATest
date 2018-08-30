import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Picker, TextInput, ScrollView, ListView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Util from '../common/util';
import api from '../common/api';
const mainColor = '#006bb7';
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
export default class Players extends Component {
    static navigationOptions = {
        tabBarLabel: '球员',
        tabBarIcon: ({focused}) => {
            return (
                <Icon name='users' size={20} color= {focused ? mainColor : 'black'} />
            );
        },
    }
    constructor(props) {
        super(props);
        this.state = {
            loadingShow: true,
            hasMore: true,
            buttonDisabled: false,
            loadMoreText: '加 载 更 多',
            englishNameArray: ['请选择','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            countryArray: [],
            teamArray: [],
            playersArray: [],
            queryData: {
                englishName: '',
                searchName: '',
                page: 1,
                limit: 20,
                country: '',
                team: ''
            }
        }
    }
    renderTitle = () => {
        const titleArray = ['姓名', '球队', '位置', '身高', '体重', '球号', '生日', '经验', '选秀', '进入NBA之前', '国籍'];
        return (
            <View style={[styles.titleBox,{backgroundColor: '#032f4f'}]}>
                {
                    titleArray.map((item, index) => {
                        let currentStyle =  styles.p2;
                        if (item === '姓名') {
                            currentStyle = styles.p3;
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
    renderRow = (data, rowId, index) => { // /media/img/players/head/260x190/2738.png
        const keys = ['teamName', 'position', 'height', 'weight', 'jerseyNo', 'dob', 'experience', 'draftYear', 'displayAffiliation', 'country'];
        const rowData = Object.assign({}, data.playerProfile, {teamName: data.teamProfile.name})
        return (
            <View style={ [styles.playerBox] } key={index}>
                <TouchableOpacity style={[styles.p3,{marginLeft: 5}]} onPress={() => this.playerDetail(rowData.code)}>
                    <View style={{flexDirection: 'column'}}>
                        <Image style={styles.img} source={{uri: `http://china.nba.com/media/img/players/head/260x190/${rowData.playerId}.png`}}/>
                    </View>
                    <View style={{flexDirection: 'column',marginLeft: 5}}>
                        <Text style={[styles.dataBox,{alignSelf: 'flex-start', color: '#0064bb'}]}>{rowData.firstName}</Text>
                        <Text style={[styles.dataBox,{alignSelf: 'flex-start', color: '#0064bb'}]}>{rowData.lastName}</Text>
                    </View>
                </TouchableOpacity>
                {keys.map((item, i) => {
                    let currentStyle = styles.p2;
                    if (item === 'displayAffiliation') {
                        currentStyle = styles.p5;
                    }
                    if (item === 'teamName') {
                        return (
                            <TouchableOpacity style={currentStyle} key={i} onPress={() => this.teamDetail(data.teamProfile.nameEn)}>
                                <View style={{flexDirection: 'column', flex: 1}}>
                                    <Text style={[styles.dataBox, {color: '#0064bb'}]}>{rowData[item]}</Text>
                                </View>
                            </TouchableOpacity>)
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
    teamDetail (data) {
        this.props.navigation.navigate('TeamDetail', { name: data })
    }
    playerDetail (data) {
        this.props.navigation.navigate('PlayerDetail', { name: data })
    }
    getNbaTeamData () {
        Util.getRequest(api.getNbaTeamData,{},(data)=>{
            const _data = [{name: '请选择球队'}].concat(data);
            this.setState({
                teamArray: _data,
            });
        },error => {
            alert(error)
        })
    }
    getAllCountryData () {
        Util.getRequest(api.getAllCountryData,{},(data)=>{
            const _data = ['请选择国家'].concat(data)
            this.setState({
                countryArray: _data,
            });
        },error => {
            alert(error)
        })
    }
    getPlayersListData () {
        this.setState({
            loadingShow: this.state.queryData.page === 1,
            loadMoreText: '加载中...'
        });
        let queryData = {};
        Object.keys(this.state.queryData).forEach((item, i) => {
            queryData[item] = this.state.queryData[item]
            if (this.state.queryData[item] === '请选择' || this.state.queryData[item] === '请选择球队' || this.state.queryData[item] === '请选择国家') {
                queryData[item] = ''
            }
        });
        Util.getRequest(api.getPlayersListData, {
            method: "POST",
            body: JSON.stringify(queryData)
        }, (_data)=> {
            const data = _data.data;
            const hasMore = data.length >= this.state.queryData.limit;
            const playersArray = this.state.queryData.page === 1 ? data: this.state.playersArray.concat(data);
            this.setState({
                hasMore,
                loadMoreText: '加 载 更 多',
                loadingShow: false,
                buttonDisabled: false,
                playersArray
            });
        })
    }
    onValueChange (value, v) {
        let queryData = this.state.queryData;
        queryData[v] = value;
        queryData.page = 1;
        this.setState({
            hasMore: true,
            queryData
        });
        this.getPlayersListData();
    }
    loadMore () {
        if (this.state.hasMore) {
            let queryData = this.state.queryData;
            queryData.page = queryData.page + 1;
            this.setState({
                queryData,
                buttonDisabled: true
            });
            this.getPlayersListData();
        } else {
            return false;
        }
    }
    componentDidMount() {
      this.getNbaTeamData();
      this.getAllCountryData();
      this.getPlayersListData();
    }
    render() {
        const {loadingShow, hasMore, buttonDisabled, loadMoreText, englishNameArray, countryArray, teamArray, queryData, playersArray} = this.state;
        const horizontal = true;
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        dataSource = dataSource.cloneWithRows(playersArray);
        return (
            <View style={{ flex: 1 ,backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: mainColor}}>
                    <View style={{width: '18%'}}>
                        <Picker
                            selectedValue={queryData.englishName}
                            style={{ height: 36, backgroundColor: mainColor,color: 'white'}}
                            onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue, 'englishName')}>
                            {
                                englishNameArray.map((v, i) => <Picker.Item label={v} value={v} key={i}/>)
                            }
                        </Picker>
                    </View>
                    <View style={{width: '27%'}}>
                        <Picker
                            selectedValue={queryData.country}
                            style={{ height: 36, backgroundColor: mainColor,color: 'white'}}
                            onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue, 'country')}>
                            {
                                countryArray.map((v, i) => <Picker.Item label={v} value={v} key={i}/>)
                            }
                        </Picker>
                    </View>
                    <View style={{width: '25%'}}>
                        <Picker
                            selectedValue={queryData.team}
                            style={{ height: 36, backgroundColor: mainColor,color: 'white'}}
                            onValueChange={(itemValue, itemIndex) => this.onValueChange(itemValue, 'team')}>
                            {
                                teamArray.map((v, i) => <Picker.Item label={v.name} value={v.name} key={i}/>)
                            }
                        </Picker>
                    </View>
                    <View style={{width: '20%'}}>
                        <TextInput
                            style={{height: 36, borderColor: 'gray', borderWidth:1,color: 'white'}}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.onValueChange(text, 'searchName')}
                            placeholder = '请输入'
                            placeholderTextColor = 'white'
                            value={this.state.queryData.searchName}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    {
                        loadingShow ? Util.loading : playersArray.length > 0 ? ( <ScrollView
                            automaticallyAdjustContentInsets={false}
                            horizontal={horizontal}
                            style={styles.scrollView}>
                            <View style={{flex: 1}}>
                                {this.renderTitle()}
                                <ListView
                                    dataSource={dataSource}
                                    renderRow={(data) => this.renderRow(data)}
                                    style={styles.listView} />
                            </View>
                        </ScrollView>) : (<View style={{flex: 1}}><Text style={{textAlign: 'center',marginTop: 20}}>暂无符合条件的球员</Text></View>)
                    }
                    {
                        (hasMore && (!loadingShow)) ?  ( <View>
                            <Button  title={loadMoreText}
                                     color={mainColor}
                                     disabled = {buttonDisabled}
                                     onPress={() => this.loadMore()}/>
                        </View>) : null
                    }
                </View>
            </View>
        )
    }
}