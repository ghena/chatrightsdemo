import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image,ActivityIndicator, Alert } from 'react-native';
import {NativeBaseProvider } from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {base_api_endpoint} from '../components/Api';
export default class CaptureImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        picSource: null,
        showPic:false,
        working:false
        }
    }

    async componentDidMount() {

        this.storage = this.props.storage;

    }

    callLambda =  async (name) => {
  
        try {

            const url = base_api_endpoint+'textract?name='+name;
         
            const response = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
      
            const json = await response.json();
            return json;

        } catch (error) {

            console.error(error);
            return false;

        }

    }
      
    showPic = () =>{

        this.setState({showPic:true});

    };

    _takePic =  () => {

        const _this = this;
 
        launchCamera({mediaType: 'photo',quality:1}, (response) => {
    
                this.setState({
                    picSource: response.uri,
                    fileInfo: response,
                    imgUrl: response.uri,
                    imageUpload: true
                }, function(){ 

                        if(typeof(response.assets[0]) == 'object'){
         
                            try {

                                _this.setState({working:true}, async function(){

                                    const photo = await fetch(response.assets[0]['uri']);
                                    const photoBlob = await photo.blob();

                                    var result =  await this.storage.put(response.assets[0]['fileName'],photoBlob, {
                                        'level': 'public',
                                        'contentType': 'image/jpg'
                                    });

                                    var result = await this.callLambda(result.key);
                                   _this.props.setPic(result.data);

                                });

                            } catch (err) {
                                console.log('error creating todo:', err);
                                Alert.alert('Error', err, [{ text: 'OK' }]);
                            }

                        }else{

                            Alert.alert('Error', 'An error occurred', [{ text: 'OK' }]);

                        }
                      

                });
    
          });

    
      }

    getContent (){

        return (
            <NativeBaseProvider>
                <View style={{flex:1,width:'100%'}}>

                    <View style={{
                        flex:1,
                        width:'100%',
                        padding:40, 
                        textAlign: 'center',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <TouchableOpacity onPress={() => this._takePic()}><Text style={{fontSize:18,textAlign:'center'}}>Clicca qui per scannerizzare il tuo documento</Text></TouchableOpacity>
                    </View>
                </View>
            </NativeBaseProvider>
        )
    }
    
    render() {

        if(this.state.working){
            return <View style={{
                width:'100%',
                flex:1, 
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}><ActivityIndicator size="large" /></View>;
        }

           
        return(  
            <View style={{width:'100%',flex:1}}>
                     {this.getContent()}
            </View>
        )
    
      }


}