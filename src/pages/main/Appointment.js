import React from 'react';

import styled from 'styled-components';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import IconCalendar from '../../components/icons/IconCalendar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Amplify, { Predictions } from 'aws-amplify';
import Voice from '@react-native-voice/voice';
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";



export default class Appointment extends React.Component {

    constructor(props) {
       super(props);
      
     }

     componentDidMount(){


     }


    render() {
        return(
            <Container>
                <Header>
                    <TextHeader>Prenota un appuntamento</TextHeader>
                </Header>
                <Wrapper>
                    <IconWrap>
                        <IconCalendar />
                    </IconWrap>
                    <DataText>24 marzo 2021 alle ore 10:45</DataText>
                    <TouchableOpacity 
                                    style = {{
                                        alignSelf:"center",
                                        marginTop: 40
                                    }}
                                    onPress={() => this.props.navigation.push('Feedback')}
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