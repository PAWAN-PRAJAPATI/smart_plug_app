/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    status:"Loading..."
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
      <Text style={{flex:1,justifyContent:'center'}}>
        {this.state.status}
      </Text>
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
