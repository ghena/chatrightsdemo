import React from 'react'

import CountrySelect from './CountrySelect'
import Home from './Home'
import MyChatBot from './MyChatBot'
import Documents from './Documents'
import TodoList from './TodoList'
import Appointment from './Appointment'
import Feedback from './Feedback'


import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

function MainNav(props) {
  

  return (

    <Stack.Navigator>
      <Stack.Screen name="Select Languages"  options={{headerShown: false}} >
        { screenProps => <CountrySelect {...screenProps} updateAuth={props.updateAuth} currentView={props.currentView} />}
      </Stack.Screen>
      <Stack.Screen name="Welcome" options={{ title: 'Benvenuto',headerShown: false }}  >
        { screenProps => <Welcome {...screenProps} updateAuth={props.updateAuth} />}
      </Stack.Screen>
      <Stack.Screen name="Documents"  options={{ title: 'Documenti necessari',headerShown: false}}>
        { screenProps => <Documents {...screenProps} updateAuth={props.updateAuth}  />}
      </Stack.Screen>
      <Stack.Screen name="ChatBot" options={{ title: 'Compilazione domanda' }}>
        { screenProps => <MyChatBot {...screenProps} updateAuth={props.updateAuth} voiceLibs={props.voiceLibs} />}
      </Stack.Screen>
      <Stack.Screen name="TodoList"  options={{ title: 'Riepilogo' }}>
        { screenProps => <TodoList {...screenProps} updateAuth={props.updateAuth} />}
      </Stack.Screen>
      <Stack.Screen name="Appointment"  options={{ title: 'Prenota un appuntamento' }}>
        { screenProps => <Appointment {...screenProps} updateAuth={props.updateAuth} />}
      </Stack.Screen>
      <Stack.Screen name="Feedback"  options={{ title: 'Feedback ?' }}>
        { screenProps => <Feedback {...screenProps} updateAuth={props.updateAuth}  />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default MainNav;