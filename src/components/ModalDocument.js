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

class ModalDocument extends React.Component {
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

    closeModal = () => {
        this.props.isOpen();
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
                      <Title>{this.props.title}</Title>
                    </Header>
                    <ScrollView showsVerticalScrollIndicator={false} style={{height:500}}>
                      <Content>
                      <TextBig>Documento identificativo e titolo di viaggio rilasciato dall'Ambasciata o dalla Questura del tuoStato, oppure documento equivalente.</TextBig>
                            <TextStrong>Per richiedere la residenza all'ufficio del Comune, porta con te il passaporto in originale +1fotocopia.</TextStrong>
                            <TextSmall>Il passaporto può essere ottenuto da tutti i cittadini dello stato di appartenenza. E' rilasciato nel tuo Stato di origine, dalle questure e all'estero dall'Ambasciata e consolato del tuoStato.</TextSmall>
                            <TextSmall>Attualmente si rilascia il passaporto cartaceo con microchip elettronico inserito nella copertina.Se sei in Italia e il tuo passaporto è in scadenza, contatta l'Ambasciata o il Consolato del tuo Stato inItalia almeno 6 mesi prima della scadenza.</TextSmall>
                            <TextSmall>Qui trovi tutti i contatti e gli indirizzi delle Ambasciate estere in Italia: https://www.esteri.it/mae/it/servizi/stranieri/rapprstraniere.</TextSmall>
                            <TextSmall>In alternativa al Passaporto puoi esibire un documento equivalente tra quelli qui indicati: titolo di viaggio per apolidi; documento di viaggio per rifugiati, titolo di viaggio per stranieri,libretto di navigazione, documento di navigazione aerea, lasciapassare delle Nazioni Unite, documento rilasciato dalla NATO, carta identità solo per cittadini U.E., lasciapassare.</TextSmall>
                            <TextStrong>Se non hai nessun documento basta il permesso di soggiorno anche scaduto con la lettera di convocazione in Questura.</TextStrong>
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

export default ModalDocument;

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

const Content = styled.View`
padding-top:20px;
`;

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

const TextBig = styled.Text`
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    color: #666666;
  `;
  const TextSmall = styled.Text`
    width: 100%;
    font-size: 14px;
    color: #666666;
    margin-top: 2px;
  `;
  const TextStrong = styled.Text`
    width: 100%;
    font-size: 14px;
    color: #333333;
    margin-top: 2px;
  `;
