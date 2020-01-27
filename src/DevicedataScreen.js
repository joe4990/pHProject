import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Linking, AppRegistry, Image, FontSize, ScrollView, Alert, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

var status = 0;

class DevicedataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      age: '',
      area: '',
      humidity_low: '',
      humidity_hight: '',
      name: '',
      ph_low: '',
      ph_hight: '',
      soil_type: ''
    };
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _retrieveData = async () => {
    status += 1;
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        var data = JSON.parse(value);
        this.setState({ token: data.token });
        if (this.state.token != '') {
          status = 0;
          axios.get('http://165.22.250.24:3030/config/device_config', {
            params: {
              serialDevice: this.props.navigation.state.params.serialDevice
            }
          })
            .then(response => {
              const device_config = response.data;
              //console.log(device_config);
              this.setState({
                age: device_config.age,
                area: device_config.area,
                humidity_low: device_config.humidity_low,
                humidity_hight: device_config.humidity_hight,
                name: device_config.name,
                ph_low: device_config.pH_low,
                ph_hight: device_config.pH_hight,
                soil_type: device_config.soil_type
              });
            })
            .catch(function (error) {
              // console.log(error);
            })
        } else {
          if (status == 2) {
            status = 0;
            Alert.alert(
              'Error',
              'หมดอายุเข้าใช้งาน',
              [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
              ],
              { cancelable: false }
            )
          }
        }
      } else {
        console.log("test3");
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this._retrieveData();
    });
  }

  onEditdevice() {
    this.props.navigation.navigate('Editdevice', {
      serialDevice: this.props.navigation.state.params.serialDevice
    })
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#FAFAFA' }}>
        <View style={{ faex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
          <View style={{ faex: 1, flexDirection: 'row', justifyContent: 'flex-start', }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <Image style={{ padding: 10, width: 27, height: 27, resizeMode: 'contain', margin: 10, marginTop: 21 }}
              source={require('../img/back.png')}></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>{this.props.navigation.state.params.serialDevice}</Text>
          <TouchableOpacity >
            <Text style={{ fontSize: 17, color: '#00000', margin: 10, marginTop: 21, fontWeight: 'bold' }} onPress={this.onEditdevice.bind(this)}>แก้ไข</Text>
          </TouchableOpacity>
        </View>


        <View style={{ justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
          <View style={{
            flexDirection: 'column', width: 343, borderRadius: 6, backgroundColor: '#FFFBE9',
            margin: 5, justifyContent: 'flex-start', alignItems: 'flex-start',
          }}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 343, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 343, }}>
                <View style={{ flexDirection: 'row', faex: 1, margin: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Image style={{ padding: 5, width: 25, height: 25, resizeMode: 'contain', margin: 2, }}
                    source={require('../img/h3.png')}></Image>
                  <Text style={styles.txtHea}> pH</Text>
                </View>
                <View style={{ flexDirection: 'row', faex: 1, margin: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Image style={{ padding: 5, width: 72, height: 24, resizeMode: 'contain', margin: 2, }}
                    source={require('../img/normal.png')}></Image>
                </View>
              </View>
              <View style={{
                flexDirection: 'row', justifyContent: 'flex-start', width: 343, marginLeft: 25, marginBottom: 10
              }}>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 151.5, borderEndWidth: 1, borderEndColor: '#000000', marginEnd: 15 }}>
                  <Text style={styles.txtTitle}>ค่าตั้งต้น</Text>
                  <Text style={styles.txtData}>{this.state.ph_low} - {this.state.ph_hight}</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 171.5, marginBottom: 10 }}>
                  <Text style={styles.txtTitle}>ค่าที่ได้</Text>
                  <Text style={styles.txtData}>6</Text>
                </View>
              </View>
            </View>
            <Text style={styles.txtHea2}>
              การวิเคราะห์  </Text>
            <View style={{ height: 60 }}>
            </View>

          </View>
          <View style={{
            flexDirection: 'column', width: 343, borderRadius: 6, backgroundColor: '#E0F3FF',
            margin: 5, justifyContent: 'flex-start', alignItems: 'flex-start',
          }}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 343, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 343, }}>
                <View style={{ flexDirection: 'row', faex: 1, margin: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Image style={{ padding: 5, width: 25, height: 25, resizeMode: 'contain', margin: 2, }}
                    source={require('../img/h2.png')}></Image>
                  <Text style={styles.txtHea}> ความชื้น</Text>
                </View>
                <View style={{ flexDirection: 'row', faex: 1, margin: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                  <Image style={{ padding: 5, width: 72, height: 24, resizeMode: 'contain', margin: 2, }}
                    source={require('../img/normal.png')}></Image>
                </View>
              </View>
              <View style={{
                flexDirection: 'row', justifyContent: 'flex-start', width: 343, marginLeft: 25, marginBottom: 10
              }}>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 151.5, borderEndWidth: 1, borderEndColor: '#000000', marginEnd: 15 }}>
                  <Text style={styles.txtTitle}>ค่าตั้งต้น</Text>
                  <Text style={styles.txtData}>{this.state.humidity_low} - {this.state.humidity_hight}</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 171.5, marginBottom: 10 }}>
                  <Text style={styles.txtTitle}>ค่าที่ได้</Text>
                  <Text style={styles.txtData}>6</Text>
                </View>
              </View>
            </View>
            <Text style={styles.txtHea2}>
              การวิเคราะห์
                </Text>
            <View style={{ height: 60 }}>
            </View>
          </View>
          <View style={{
            flexDirection: 'column', width: 343, borderRadius: 6, backgroundColor: '#C0E1B9',
            margin: 5, justifyContent: 'flex-start', alignItems: 'flex-start',
          }}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: 343, alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 343, }}>
                <View style={{ flexDirection: 'row', faex: 1, margin: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Image style={{ padding: 5, width: 25, height: 25, resizeMode: 'contain', margin: 2, }}
                    source={require('../img/h4.png')}></Image>
                  <Text style={styles.txtHea}>่ที่ตั้งอุปกรณ์</Text>
                </View>

              </View>
              <View style={{
                flexDirection: 'row', justifyContent: 'flex-start', width: 343, marginLeft: 25, marginBottom: 10
              }}>

              </View>
            </View>

            <View style={{ height: 60 }}>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: '#5BB95A',
    fontWeight: 'bold',
    paddingVertical: 14,
    alignItems: 'center',
  },
  headerDevice: {
    fontSize: 17,
    color: '#000000',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  txtcanON: {
    fontSize: 15,
    color: '#51B1FB',
    alignItems: 'center',
    marginLeft: 10
  },
  txtcanOFF: {
    fontSize: 15,
    color: '#b7b7b7',
    alignItems: 'center',
    marginLeft: 10
  },
  txtTitle: {
    fontSize: 15,
    color: '#000000',

  },
  txtHea: {
    fontSize: 16,
    color: '#000000',

  },
  txtData: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 5
  },
  txtHea2: {
    fontSize: 16,
    color: '#5BB95A',
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 20
  },
  txtinput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    margin: 7,
    width: 300,
    borderColor: '#000000',
    borderWidth: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    marginRight: 20,
    marginTop: 5,
    marginLeft: 20
  },
  inputBorder: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    height: 40,
  },
  buttonContainer: {
    margin: 10
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txt: {
    backgroundColor: "#FFFFFF",
    padding: 7,
    height: 33,
    margin: 7,
    borderRadius: 20,
  },
  buttonContainer: {
    margin: 10,
    height: 50,
    width: 200,
    color: "#5BB95A"

  },
  box: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    // margin: 10 ,
    // marginRight:10, 
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff'
  }
});


export default withNavigation(DevicedataScreen);