import React from 'react';
import { 
  View, 
  ImageBackground, 
  TouchableOpacity, 
  SafeAreaView,
  
} from 'react-native';

import styled from 'styled-components';

//components
import ButtonPrimary from '../../components/common/ButtonPrimary';
import LogoLight from '../../assets/LogoLight';



export default class Welcome extends React.Component {

  constructor(props) {
    
    super(props);

  }

  async componentDidMount(){


  }


    render() {

        return (
          <ImageBackground
            source = {require("../../assets/images/splash.png")}
            resizeMode="cover"
            style = {{
              flex: 1,
            }}
          >
            <SafeAreaView>
            
            <LogoWrapper>
              <LogoLight 
                width = {100}
                height = {100}
              />
            </LogoWrapper>
            <TextWelcome>Benvenuto</TextWelcome>
            <TouchableOpacity 
              style={{
                alignSelf: "center",
                marginTop: 20
              }}
                onPress={() => this.props.navigation.navigate("Documents")}
              >
              <ButtonPrimary 
                text = "Continua"
                // background = "#2b4294"
                background = "#2b4294"
                border = "#f7f7f7"
                color = "#f7f7f7"
              />
            </TouchableOpacity>
            </SafeAreaView>
          </ImageBackground>
        );
    }
}

const LogoWrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const TextWelcome = styled.Text`
  color: #f7f7f7;
  font-size: 38px;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
  font-weight: bold;
`;