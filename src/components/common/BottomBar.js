import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { Auth as AmplifyAuth } from 'aws-amplify';

class BottomBar extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    signOut = async () => {
        try {
          await AmplifyAuth.signOut()
          console.log('signed out')
          this.props.updateAuth('auth')
        } catch (err) {
          console.log('error signing out...', err)
        }
      }

    render() {
        return(
            <Container
                style = {{
                  backgroundColor:  '#2b4294',
                }}
            >
                <TouchableOpacity onPress={() => this.signOut() }><Text>Logout</Text></TouchableOpacity>
            </Container>
        )
    }
}

export default BottomBar;

const Container = styled.View`
    /* background-color: #ffffff; */
    padding: 10px 15px;
    min-width: 200px;
    width:100%;
`;

const Text = styled.Text`
    /* color: #2b4294; */
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color:#ffffff
`;