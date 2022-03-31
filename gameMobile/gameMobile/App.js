import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Button } from 'react-native';
// import react navigation container
import { NavigationContainer, validatePathConfig } from '@react-navigation/native';
// import navigation stack constructor
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import Questions from './Questions';
import addPlayer from './modules/storage';
//import questions
import questionsList from './assets/questions.json';


// rename APP to HomeScreen
function HomeScreen( { navigation }) {
  const [player, setPlayer] = React.useState('enter your username');
  

  // start button event handler
  // navigate to the questions screen
  async function handleStart(e){
    console.log(player);
    let score = 0;
    try {
      score = await addPlayer(player);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Questions', {
      questionslist: questionsList,
      player: player,
      points:score,
    });
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
      onChangeText={setPlayer}
      value={player}
      />
      <Button
       title='Start'
       onPress={(e) => handleStart(e) }
      />
      <StatusBar style="auto" />
    </View>
  );
}

// the app component will configure the screens and the routes

// create a navigation stack
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Questions" component={Questions} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});