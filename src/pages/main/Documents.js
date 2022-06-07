import React from 'react';

import styled from 'styled-components';

import { ScrollView,View } from 'react-native';

import CardDocument from '../../components/CardDocument';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomBar from '../../components/common/BottomBar';
import {  I18n  } from 'aws-amplify'

export default class Documents extends React.Component {


    render() {
        return(
            <Container >
                <ScrollView showsHorizontalScrollIndicator={true} style={{marginBottom:30}}>
                <Title>{I18n.get('Necessary documents')}</Title>
                <Subtitle>{I18n.get('Click on the arrow for more details.')}</Subtitle>
                <TextIntro>{I18n.get('All documents presented here must be in your possession for the application.')}</TextIntro>
                <Wrapper>
                <CarouselDocuments>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <CardDocument
                            title = "Passaporto o documento equivalente"
                            subtitle = "Documento identificativo e titolo di viaggio rilasciato dall'Ambasciata o dalla Questura del tuoStato, oppure documento equivalente."

                        >
                        </CardDocument>
                        <CardDocument
                            title = "Codice Fiscale"
                            subtitle = "Codice alfanumerico di 16 caratteri, utilizzato ai fini fiscali e sanitari."
                        ></CardDocument>
                        <CardDocument
                            title = "Allegato 1"
                            subtitle = "Titolo che legittima la tua presenza nella casa/abitazione in cui richiedi la residenza."
                        ></CardDocument>
                        <CardDocument
                            title = "Dichiarazione ai fini TARI"
                            subtitle = "Documento per la denuncia della tassa TARI."
                        ></CardDocument>
                        <CardDocument
                            title = "Informativa al trattamento dei dati personali."
                            subtitle = "Consenso al trattamento dei dati sensibili."
                        ></CardDocument>
                        <CardDocument
                            title = "Permesso di soggiorno."
                            subtitle = "Titolo che ti permette di vivere in Italia per più di 90 giorni."
                        ></CardDocument>
                        <CardDocument
                            title = "Dichiarazione di ospitalità"
                            subtitle = "Titolo che ti permette di vivere in Italia per più di 90 giorni."
                        ></CardDocument>                        
                    </ScrollView>
                </CarouselDocuments>
                <TouchableOpacity 
                    style = {{
                        alignSelf:"center",
                        marginTop: 40
                    }}
                    onPress={() => this.props.navigation.push('ChatBot')}
                >
                    <View style={{alignSelf:'center',maxWidth:340}}>
                        <ButtonPrimary 
                            text = {I18n.get('Fill in the registration application')}
                            border = "#f7f7f7"
                            color = "#f7f7f7"
                        />
                    </View>
                </TouchableOpacity>
                </Wrapper>
                </ScrollView>
                <BottomBar updateAuth={this.props.updateAuth} />
            </Container>
        );
    }
}

const Container = styled.View`
    background: #f7f7f7;
    flex: 1;
  
`;
const Title = styled.Text`
    font-size: 20px;
    color: #666666;
    font-weight: bold;
    padding: 20px 20px 0px;
    
`;
const Subtitle = styled.Text`
    font-size: 16px;
    color: #666666;
    padding: 0px 20px;
`;
const TextIntro = styled.Text`
    color: #666666;
    padding: 0px 20px;
`;

const Wrapper = styled.View`
    margin-top:10;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px; 
    background: #2b4294;
    padding-bottom:30px;
`;
    
const CarouselDocuments = styled.View`
    /* flex: 1; */
    padding-left: 20px;
    margin-top: 20px;
`;

