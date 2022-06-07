/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StatusBar,LogBox} from 'react-native';
import Amplify from '@aws-amplify/core';
import { Auth as AmplifyAuth, AuthModeStrategyType, I18n } from 'aws-amplify';
import {Authenticator} from 'aws-amplify-react-native';
import {AmplifyTheme} from './src/components/amplifyTheme';
import MainNav from './src/pages/main/MainNav';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import dict from './src/data/translations/dict';
import awsconfig from './src/aws-exports';

LogBox.ignoreAllLogs(true);

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  }
});

I18n.setLanguage('it');
I18n.putVocabularies(dict);

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
    },
  ],
}

// export default App

class App extends React.Component {


  constructor(props){

    super(props);
    Amplify.addPluggable(new AmazonAIPredictionsProvider());

    this.state = {
      currentView: 'initializing'
    }

  }
  
  componentDidMount() {

    this.checkAuth();

  }

  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
      console.log('user is signed in')
      this.setState({ currentView: 'mainNav' })
    } catch (err) {
      console.log('user is not signed in')
      this.setState({ currentView: 'auth' })
    }
  }

  handleAuthStateChange = (state) => {

    if (state === 'signedIn') {
        /* Do something when the user has signed-in */
        this.updateAuth(state);
    }
  
  }

  updateAuth = (currentView) => {
    this.setState({ currentView })
  }

  showComponents = () =>{

      if(this.state.currentView == 'signedIn'){
          return (
            <MainNav updateAuth={this.updateAuth} currentView={this.state.currentView}  />
          );
      }

      // not logged
      return (

          <Authenticator  
            usernameAttributes="email"   
            signUpConfig={signUpConfig}
            theme={AmplifyTheme}
            onStateChange={this.handleAuthStateChange}
          />

      );

  }
  
  render() {

    const { currentView } = this.state;

    console.log('currentView: ', currentView)
    return (
      <>
        <StatusBar barStyle="light-content" />
        {this.showComponents()}
      </>
    )

  }
}

export default App
