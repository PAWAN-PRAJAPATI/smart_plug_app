/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import TimerCountdown from 'react-native-timer-countdown';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { Button } from 'react-native'
import { Dialog } from 'react-native-simple-dialogs';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
type Props = {};
export default class App extends Component<Props> {
  state = {
    status:"Loading...",
    dialogVisible:false,
    hh:0,
    mm:0,
    ss:0
  }
  url = "https://pure-dawn-31060.herokuapp.com/"
  componentWillMount(){

    try{
      fetch(this.url+"status")
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson.status==1){
          this.setState({status:"ON",ison:true})
        }
        else{
          this.setState({status:"OFF",ison:false})
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    catch{
      this.state({status:"Network error!"})
    }

  }

  onToggle =(isOn)=>{
    this.setState({ison:isOn})
    console.log(isOn)
    
    try{

      if(isOn==true){
        fetch(this.url+"on")
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.status=="on"){
            this.setState({status:"ON"})
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
      else{
        fetch(this.url+"off")
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.status=="off"){
            this.setState({status:"OFF"})
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }
    catch{
      this.state({status:"Network error!"})
    }
  }
  render() {
    console.log(this.state)

    return (
      <View style={styles.container}>
        <View style={{flex:1,justifyContent:'center'}}>
        <ToggleSwitch
          isOn={this.state.ison}
          onColor='green'
          offColor='red'
          labelStyle={{color: 'black', fontWeight: '900'}}
          size='large'
          onToggle={ (isOn) => {this.onToggle(isOn)} } 
          >;
      </ToggleSwitch>
      </View>
      <Text style={{flex:1,justifyContent:'center',fontSize:35,fontWeight:'bold'}}>
        {this.state.status}
      </Text>

      <View style = {{flexDirection:'row',justifyContent:'space-around',alignContent:'space-around',width:'100%',height:'5%'}}>
      <Button title={"Set Timer"} onPress={()=>this.setState({dialogVisible:true})}></Button>
      <Button title={"Reset Timer"} onPress={()=>{
        time = 1000*60*this.state.mm + 60*60*1000*this.state.hh +1000*this.state.ss
        this.setState({time:time})
      }}></Button>
      </View>

      <View style={{height:'10%',margin:50}}>
       <TimerCountdown
            initialSecondsRemaining={this.state.time}
            onTimeElapsed={() => {
              console.log('complete')
              this.setState({time:0})
              this.onToggle(false)}
            }
            allowFontScaling={true}
            style={{ fontSize: 30 }}
        />
        </View>
         <Dialog
            visible={this.state.dialogVisible}
            title="Set Time"
            onTouchOutside={() => this.setState({dialogVisible: false})} >
            <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center'}}>

              <TextInput
              style={{flex:1}}
              placeholder="HH"
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(hh) => this.setState({hh:parseInt(hh)})}
               />
               <TextInput
              style={{flex:1}}
              placeholder="MM"
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(mm) => this.setState({mm:parseInt(mm)})}
               />
              <TextInput
              style={{flex:1}}
              placeholder="SS"
              maxLength={2}
              keyboardType="numeric"
              onChangeText={(ss) => this.setState({ss:parseInt(ss)})}
               />
               <Button title="save" onPress={() => {
                 
                 var time =  1000*60*this.state.mm + 60*60*1000*this.state.hh +1000*this.state.ss
                 this.setState({dialogVisible: false,time:time})
                 
                 }}/>
            </View>
        </Dialog>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
