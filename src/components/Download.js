import React from 'react';
import { ScrollView,Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import {base_api_endpoint} from '../components/Api';

export default class Download extends React.Component {
    
    constructor(props) {
        super(props);
    }

    openPdf = () => {

        var url = base_api_endpoint+'download?pdf=' +this.props.pdf;

        console.log(url);

        Linking.openURL(url).catch((err) => {
            console.log(err);
        });

    };

    render() {
        return(
            <TouchableOpacity onPress={() => this.openPdf() }>
                <Item>
                    <Title>{this.props.title}</Title>
                </Item>
            </TouchableOpacity>
        )
    }
}

const Item = styled.View`
    flex-direction: row;
    /* background: #58b893; */
    background: #f7f7f7;
    padding: 20px 10px;
    width: 90%;
    align-self: center;
    margin: 4px 0px;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #f7f7f7;
`;

const Title = styled.Text`
    width: 90%;
    margin-left: 5px;
    font-weight: bold;
    font-size: 16px;
    color: #666666;
`;