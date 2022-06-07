import React from 'react';

import styled from 'styled-components';

class ButtonPrimary extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return(
            <Container
                style = {{
                    borderColor: this.props.border,
                    backgroundColor: this.props.background,
                }}
            >
                <Text
                    style = {{
                        color: this.props.color
                    }}
                >{this.props.text}</Text>
            </Container>
        )
    }
}

export default ButtonPrimary;

const Container = styled.View`
    /* background-color: #ffffff; */
    padding: 10px 15px;
    border-width: 2px;
    border-radius: 40px;
    min-width: 200px;
`;

const Text = styled.Text`
    /* color: #2b4294; */
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
`;