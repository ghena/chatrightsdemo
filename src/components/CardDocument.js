import React from 'react';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import {  TouchableOpacity } from "react-native";

import styled from 'styled-components';

import ArrowRight from './icons/arrowRight';
import ModalDocument from './ModalDocument';

export default class CardDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        }
    }

    toggleModal = () => {

        this.setState({
            isModalVisible: !this.state.isModalVisible,
        });
    };

    getModal = () => {
        if (this.state.isModalVisible) {
            return <ModalDocument
                isOpen={this.toggleModal} 
                visible = {this.state.isModalVisible}  
                title = {this.props.title} 
            />;
        }
    };

    render() {
        return(
            <React.Fragment>
                <Container>
                    <Title>{this.props.title}</Title>
                    <Subtitle>{this.props.subtitle}</Subtitle>
                    <TextIntro>{this.props.textIntro}</TextIntro>
                    <TouchableOpacity onPress={() => this.toggleModal()}>
                        <IconWrap>
                            <ArrowRight
                                fill="#ffffff"
                                width="24"
                                height="24"
                            ></ArrowRight>
                        </IconWrap>
                    </TouchableOpacity>
                </Container>
                {this.getModal()}
            </React.Fragment>

        );
    }
}

const Container = styled.View`
    background: #58b893;
    overflow: hidden;
    border-radius: 20px;
    padding: 20px;
    flex-wrap: wrap;
    width: 100%;
    max-width: 300px;
    margin-left: 10px;
    justify-content: space-between;
    border: 2px solid #f7f7f7;
`;
const Title = styled.Text`
    width: 100%;
    font-size: 24px;
    font-weight: bold;
`;
const Subtitle = styled.Text`
    margin-top: 20px;
    width: 100%;
    font-size: 16px;
    color: #ffffff;
`;
const TextIntro = styled.Text``;

const IconWrap = styled.View`
    align-items: flex-end;
`;



