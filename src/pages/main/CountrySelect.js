
import React from 'react';
import { 
  View,
  ImageBackground, 
  SafeAreaView,
  Text,
  Button
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import {  I18n  } from 'aws-amplify'

//components
import ButtonPrimary from '../../components/common/ButtonPrimary';
import ModalCountry from '../../components/common/ModalCountry';
import ModalLanguage from '../../components/common/ModalLanguage';
import ButtonSecondary from '../../components/common/ButtonSecondary';
import BottomBar from '../../components/common/BottomBar';
import WelcomeScreen from './Welcome';

export default class CountrySelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalCountryVisible: false,
            isModalLanguageVisible: false,
            countrySelected: I18n.get('Not selected'),
            countryCode: null,
            langSelected:I18n.get('Not selected')
        }
    }

    toggleModalCountry = (country) => {

        this.setState({
            isModalCountryVisible: !this.state.isModalCountryVisible,
            countrySelected:country
        });

    };

    toggleModalLanguage = (lang) => {

        I18n.setLanguage(lang);


        this.setState({
            isModalLanguageVisible: !this.state.isModalLanguageVisible,
            langSelected:lang
        });

    };

    getModalCountry = () => {

        if (this.state.isModalCountryVisible) {
            return <ModalCountry 
                isOpen={this.toggleModalCountry} 
                visible = {this.state.isModalCountryVisible}   
            />;
        }

    };
    
    getModalLanguage = () => {

        if (this.state.isModalLanguageVisible) {
            return <ModalLanguage 
                isOpen={this.toggleModalLanguage} 
                visible = {this.state.isModalLanguageVisible}   
            />;
        }

    };

    componentDidMount(){

    }

    render() {

        if(this.props.currentView == 'mainNav'){
            return <WelcomeScreen props={this.props} navigation={this.props.navigation}></WelcomeScreen>
        }

        return (
            <React.Fragment>
            <Container>
            <Header>
                <Welcome>{I18n.get("Hi")},</Welcome>
                <BigText>{I18n.get('where are you from?')}</BigText>
                <BigText>{I18n.get('what language do you prefer?')}</BigText>
            </Header>
            <Content>
                <TouchableOpacity onPress={() => this.toggleModalCountry()}>
                <ButtonPrimary 
                    text={I18n.get('Select your country')}
                    color="#666666"
                    border="#666666"
                    background="#ffffff"
                ></ButtonPrimary>
                </TouchableOpacity>

                <LangSpan>
                    <Text>{this.state.countrySelected}</Text>
                </LangSpan>

                <TouchableOpacity style={{marginTop: 40}} onPress={() => this.toggleModalLanguage()}>
                    <ButtonPrimary 
                        text="Select your language"
                        color="#666666"
                        border="#666666"
                        background="#ffffff"
                    ></ButtonPrimary>
                </TouchableOpacity>

                <LangSpan>
                    <Text>{this.state.langSelected}</Text>
                </LangSpan>

                <ContinueButton>
                <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Documents')}><ButtonSecondary text = {I18n.get("continue")} ></ButtonSecondary></TouchableOpacity>
                </ContinueButton>
            </Content>
            </Container>
            {this.getModalCountry()}
            {this.getModalLanguage()}
            <BottomBar updateAuth={this.props.updateAuth} />
        </React.Fragment>
        );
    }
}

const Container = styled.View`
  flex: 1;
  background: #58b893;
`;

const Header = styled.View`
  padding: 20px;
`;
const Welcome = styled.Text`
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`;

const BigText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const LangSpan = styled.Text`
  height:30;
  margin-top:10;
`;

const Content = styled.View`
  flex: 1;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  background: #f7f7f7;
  justify-content: center;
  align-items: center;
`;

const ContinueButton = styled.View`
    margin-top: 80px;
`;





