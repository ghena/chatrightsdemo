import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import {ImageBackground,Text} from 'react-native';
import ItemList from '../../components/ItemList';
import Download from '../../components/Download';
import ButtonPrimary from '../../components/common/ButtonPrimary';

export default class ToDoList extends React.Component {


    constructor(props) {
        super(props);

    }

    render() {
        return(
                <Container>
                    <Header>
                        <TitleHeader>Questi sono i documenti necessari per finalizzare la tua pratica</TitleHeader>
                        <Text style={{color:'#ffff',fontSize:15,paddingLeft:20}}>E' necessario selezionare ogni documento</Text>
                    </Header>
                    <Content>
                   <ScrollView style={{height:350}}>
                        <Download
                            title = "Scarica il tuo pdf"
                            pdf={this.props.route.params.key_name}
                        >
                        </Download>
                        <ItemList
                            title = "Passaporto o documento equivalente"
                        ></ItemList>

                        <ItemList
                            title = "Codice Fiscale"
                        ></ItemList>
                    
                        <ItemList
                            title = "Allegato 1"
                        ></ItemList>
                 
                        <ItemList
                            title = "Dichiarazione ai fini TARI"
                        ></ItemList>
                         
                        <ItemList
                            title = "Informativa al trattamento dei dati personali."
                        ></ItemList>
                            
                        <ItemList
                            title = "Permesso di soggiorno."
                        ></ItemList>
                             
                        <ItemList
                            title = "Dichiarazione di ospitalità."
                        ></ItemList>
            
                        <ItemList
                            title = "Contratto di proprietà appartamento."
                        ></ItemList>
                                  
                        <ItemList
                            title = "Documento di identità proprietario."
                        ></ItemList> 
                    </ScrollView>
                    </Content>
                            <ButtonWrap>
                            <TouchableOpacity onPress={() => this.props.navigation.push("Feedback")}>
                                    <ButtonPrimary 
                                        color = "#f7f7f7"
                                        background = "#2b4294"
                                        border = "#f7f7f7"
                                        text = "continua"
                                    />
                                      </TouchableOpacity>
                            </ButtonWrap>
                </Container>
        )
    }
}

const Container = styled.View`
    padding: 20px 0px 0px;
    background: #2b4294;
    /* flex: 1; */
`;

const Header = styled.View``;

const TitleHeader = styled.Text`
    font-size: 20px;
    color: #f7f7f7;
    font-weight: bold;
    padding: 10px 20px 0px;
`;

const Content = styled.View`
    background: #58b893;
    /* flex: 1; */
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    padding-top: 30px;
    padding-bottom: 140px;
    margin-top: 20px;
`;

const ButtonWrap = styled.View`
    margin-top: 20px;
    padding-bottom: 40px;
    align-self: center;
    position:absolute;
    bottom:30px
`;