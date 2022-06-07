import React from 'react';

import styled from 'styled-components';

class ButtonSecondary extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return(
            <Container>
                <Text>{this.props.text}</Text>
            </Container>
        )
    }
}

export default ButtonSecondary;

const Container = styled.View`
    background-color: #58b893;
    padding: 10px 20px;
    border: 2px solid #2b4924;
    border-radius: 40px;
    min-width: 200px;
`;

const Text = styled.Text`
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;