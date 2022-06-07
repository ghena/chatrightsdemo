import React from 'react';

import {
    TouchableOpacity,
    Animated,
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';

import styled from 'styled-components';

import SwipeUpDownModal from 'react-native-swipe-modal-up-down';

const Italy = require('../../assets/images/flags/italy.png');
const france = require('../../assets/images/flags/france.png');

class ModalLanguage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            top: new Animated.Value(100),
            pan: new Animated.ValueXY(),
        };
    }

    componentDidMount() {
        Animated.spring(this.state.top, {
            toValue: 30,
            useNativeDriver: false
        })
    }

    closeModal = (lang) => {
        this.props.isOpen(lang);
    };

    render() {
        if(this.props.visible) {
            return (
                <SwipeUpDownModal
                modalVisible={this.props.visible}
                // PressToanimate={this.props.visible}
                
                
                //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
                ContentModal={
                    
                  <View style={styles.containerContent}>
                    <Wrapper>
                    <Header>
                      <Close />
                      <Title>what language do you prefer?</Title>
                    </Header>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      <Content>

                        <TouchableOpacity onPress={() => this.closeModal('en')}>
                            <LanguageWrap>
                                <Flag
                                    source = {require('../../assets/images/flags/united-kingdom.png')}
                                ></Flag>
                                <Country>United Kingdom</Country>
                            </LanguageWrap>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.closeModal('es')}>
                            <LanguageWrap>
                                <Flag
                                    source = {require('../../assets/images/flags/spain.png')}
                                ></Flag>
                                <Country>Spanish</Country>
                            </LanguageWrap>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.closeModal('fr')}>
                            <LanguageWrap>
                                <Flag
                                    source = {france}
                                ></Flag>
                                <Country>French</Country>
                            </LanguageWrap>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.closeModal('it')}>
                            <LanguageWrap>
                                <Flag
                                    source = {Italy}
                                ></Flag>
                                <Country>Italiano</Country>
                            </LanguageWrap>
                        </TouchableOpacity>

                      </Content>
                    </ScrollView>
                  </Wrapper>
                  </View>
                }
                HeaderStyle={styles.headerContent}
                ContentModalStyle={styles.Modal}
                HeaderContent={
                  <View style={styles.containerHeader}>
                      <Close />
                  </View>
                }
                onClose={() => {
                  this.props.isOpen()
                }}
              />
            )
        }
    }
}

export default ModalLanguage;

const styles = StyleSheet.create({
    containerHeader: {
    //   flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    headerContent:{
      marginTop: 100,
    },
    Modal: {
      backgroundColor: '#FFFFFF',
      marginTop: 100,
      borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
    }
  });

const Container = styled.View`
  height: 100%;
  width: 100%;
  /* position: absolute; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #ffffff;
  z-index: 99;
  padding-bottom: 140px;
`;

const Wrapper = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;
const Header = styled.View`
  padding-top: 15px;
  margin-bottom: 20px;
`;

const Close = styled.View`
  width: 47px;
  height: 3px;
  background-color: #b0b0b0;
  align-self: center;
`;

const Title = styled.Text`
  margin-top: 30px;
  color: #000000;
  align-self: center;
  font-size: 20px;
`;

const Content = styled.View``;

const LanguageWrap = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 5px 0px;
`;

const Flag = styled.Image`
    width: 30px;
    height: 30px;
`;

const Country = styled.Text`
    font-size: 20px;
    margin-left: 20px;
`;

