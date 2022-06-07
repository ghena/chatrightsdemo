
import React, { Component } from 'react';

import { StyleSheet, Text, SafeAreaView, Alert} from 'react-native';
import CaptureImage from '../../components/CaptureImage';
import Amplify, { Storage } from 'aws-amplify';
import { ChatBot } from 'aws-amplify-react-native';
const botAvatar = require('../../assets/images/logo-icon.png');
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import {base_api_endpoint} from '../../components/Api';
import BottomBar from '../../components/common/BottomBar';

//https://docs.amplify.aws/lib/interactions/chatbot/q/platform/js/#send-messages-to-bot

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1
  }
});

class MyChatBot extends React.Component {

  static navigationOptions = {
    title: 'ChatBot'
  }

  constructor(props){
    super(props);
    this.state = {
      mypic: false,
      userData:false,
      botName: 'mydemobotting_dev',
      imageData:{},
      welcomeMessage: 'Benvenuto @tizio @caio. il tuo numero di documento risulta @documentNumber e il tuo stato di riferimento risulta @state. La tua data di nascita risulta @DOB. Se i dati ti sembrano corretti sei pronto per iniziare la registrazione ?'
    } 
 
  }
 
  componentDidMount(){

  }

  setPic= (imageData) => {

    this.setState({mypic:true,imageData:imageData});

  };

  callLambda =  (body) =>{

    try {

         console.log(body);

          let data = {
            method: 'POST',
            body: body,
            headers: {
              'Content-Type': 'application/json',
            }
          }
     
          fetch(base_api_endpoint+"getpdf",data)

            .then((response) => response.json())
            .then(async (json) => {

                if(json.status){
                  
                    this.props.navigation.push('TodoList',json.data);

                }else{
                   Alert.alert('Error', 'An error occurred', [{ text: 'OK' }]);
                }
       
            }).catch((error) =>{
              console.error(error);
          }) 


    } catch (error) {

      console.error(error);

    }

  };

   handleComplete = (err, confirmation) => {

    const _this = this;

      if (err) {
        Alert.alert('Error', 'Bot conversation failed', [{ text: 'OK' }]);
        return;
      }

       var body = JSON.stringify({slots:confirmation.slots,imageData:this.state.imageData});
       this.callLambda(body);
          
       return 'Abbiamo terminato, a breve genereremo il pdf con i tuoi dati';

  };

  render() {

      const { botName, welcomeMessage,imageData } = this.state;
      var wMessage =  welcomeMessage;

      if(!this.state.mypic){
          return (
            <SafeAreaView style={styles.container}>
                <CaptureImage storage={Storage} setPic={this.setPic} 
                style="{{
                  flex:1,
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center'
                }}" 
              />
             <BottomBar updateAuth={this.props.updateAuth} />
          </SafeAreaView>
          );
      }

      if(typeof(imageData.name) == 'undefined'){

         Alert.alert('Error', 'An error occurred', [{ text: 'OK' }]);

          return (
            <SafeAreaView style={styles.container}>
                <CaptureImage storage={Storage} setPic={this.setPic} 
                style="{{
                  flex:1,
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center'
                }}" 
              />
            <BottomBar updateAuth={this.props.updateAuth} />
          </SafeAreaView>
          );

      }

      wMessage = wMessage.replace(/@tizio/g,imageData.name);
      wMessage = wMessage.replace(/@caio/g,imageData.lastname);
      wMessage = wMessage.replace(/@state/g,imageData.state);
      wMessage = wMessage.replace(/@documentNumber/g,imageData.document_number);
      wMessage = wMessage.replace(/@DOB/g,imageData.birth_date);
   
       return (
      <SafeAreaView style={styles.container}>
        <ChatBot
          voiceEnabled={false}
          //  voiceLibs={voiceLibs}
          conversationModeOn={true}
          botName={botName}
          welcomeMessage={wMessage}
          onComplete={this.handleComplete}
          clearOnComplete={false}
          textEnabled={true}
          language={'it'}
          styles={StyleSheet.create({
            itemMe: {
              color: 'red'
            }
          })}
        />
      <BottomBar updateAuth={this.props.updateAuth} />
      </SafeAreaView>
    );

  }

}


export default MyChatBot;