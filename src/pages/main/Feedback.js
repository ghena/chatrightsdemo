import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import IconCalendar from '../../components/icons/IconCalendar';
import { Auth as AmplifyAuth,  I18n } from 'aws-amplify';
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Alert, Keyboard} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Predictions from '@aws-amplify/predictions';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from "./../../models";
import { Stack, FormControl ,NativeBaseProvider,TextArea } from 'native-base';
import BottomBar from '../../components/common/BottomBar';

export default class Feedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null
          } 

    }

    async componentDidMount(){

        this.user = await AmplifyAuth.currentUserInfo();

        // create subscribtion able to listen when a new items is added
        const subscription = DataStore.observe(Todo).subscribe((msg) => {
            console.log(msg.model, msg.opType, msg.element,"creato nuovo messaggio");
        });

    }

    saveData =  async (txt) =>{

        try {

            var test = await DataStore.save(
                new Todo({
                    name: this.user.id,
                    description: txt
                })
            );

            //    const messages = await DataStore.query(Messages, Predicates.ALL);
            //    console.log(JSON.stringify(messages));

            console.log("Post saved successfully!");

          } catch (error) {

            console.log("Error saving post", error);

          }

    };
    
    submit = ( ) =>{

        Keyboard.dismiss();

        const textToInterpret = this.state.message;

        this.saveData(textToInterpret);

        Predictions.interpret({
                text: {
                    language:'it',
                    source: {
                        text: textToInterpret
                    },
                    type: "ALL"
                }
            }
          )
          .then(function(result){


                    switch(result.textInterpretation.sentiment.predominant){
                        case "NEGATIVE":
                        var res = 'Ci dispiace che non sei rimasto soddifatto :(. Cercheremo di migliorare ancora';
                        break;

                        case "POSITIVE":
                            var res = 'Siamo contenti che sei soddisfatto :)';
                        break;

                        case "NEUTRAL":
                            var res = 'Sei indeciso sulla qualità del nostro servizio. Riprova in seguito.';
                        break;

                        case "MIXED":
                            var res = 'Non sei in grado di darci una valido apprezzamento. Riprova in seguito.';
                        break;
                    }

                    Alert.alert(
                        "Grazie !",
                        res,
                        [
                        
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                      );
                }
            )

    };

    render() {

        return(
            <Container>
                <Header>
                    <TextHeader>Lasciaci un feedback</TextHeader>
                </Header>
                <Wrapper>
                    <IconWrap>
                        <IconCalendar />
                    </IconWrap>
                   
                        <NativeBaseProvider>
                            <FormControl>
                            <Stack space={5} >
                                    <Stack alignItems="center" w="100%">
                                    <FormControl.Label style={{marginTop:20}} color={'#ffffff'}>Messaggio</FormControl.Label>
                                        <TextArea 
                                            h={20} 
                                            placeholder="Inserisci il tuo messaggio"  
                                            onChangeText={value => this.setState({message:value})} 
                                            color={'#ffffff'} 
                                            w="100%" 
                                            maxW="300"  
                                            style={{alignContent:'center',fontSize:13}}
                                            />
                                    </Stack>

                            </Stack>
                                <TouchableOpacity 
                                    style = {{
                                        alignSelf:"center",
                                        marginTop: 40
                                    }}
                                    onPress={() => this.submit()}
                                >
                                <ButtonWrap>
                                    <ButtonPrimary 
                                        color = "#f7f7f7"
                                        background = "#2b4294"
                                        border = "#f7f7f7"
                                        text = "continua"
                                    />
                                </ButtonWrap>
                            </TouchableOpacity> 
                            </FormControl>
                </NativeBaseProvider>
                <BottomBar updateAuth={this.props.updateAuth} />
                </Wrapper>
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
`;
const Header = styled.View``;
const TextHeader = styled.Text`
    width: 100%;
    font-size: 26px;
    color: #666666;
    font-weight: bold;
    padding: 10px 20px 0px;
`;

const Wrapper = styled.View`
    background: #2b4294;
    flex: 1;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    padding-top: 30px;
    margin-top: 20px;
    justify-content: center;
`;

const IconWrap = styled.View`
    align-self: center;
`;

const DataText = styled.Text`
    text-align: center;
    color: #f7f7f7;
    margin-top: 20px;
`;

const ButtonWrap = styled.View`
    margin-top: 60px;
    align-self: center;
`;