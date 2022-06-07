import React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';

export default class ItemList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }

    }

    toggleCheckbox = () => {
        this.setState({
            isActive: !this.state.isActive
        });
        
    }

    getActiveCheckbox = () => {
        if(this.state.isActive) {
            return(
                <Circle  />
            )
        }
    }

    render() {
        return(
            <TouchableOpacity onPress={() => this.toggleCheckbox()}>
                <Item>
                    <Checkbox>
                        {this.getActiveCheckbox()}
                    </Checkbox>
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

const Checkbox = styled.View`
    width: 20px;
    height: 20px;
    border-radius: 12px;
    border: 1px solid #58b893;
    background: #f7f7f7;
    justify-content: center;
    align-items: center;
`;

const Circle = styled.View`
    /* background: #2b4294; */
    background: #58b893;
    width: 14px;
    height: 14px;
    border-radius: 7px;
`;

const Title = styled.Text`
    width: 90%;
    margin-left: 5px;
    font-weight: bold;
    font-size: 16px;
    color: #666666;
`;