import { StyleSheet, ImageBackground,SafeAreaView } from 'react-native';
import StartGameScreen from './screen/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import GameScreen from './screen/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screen/GameOverScreen';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';


export default function App() {
  const [userNumber,setUserNumber]=React.useState();
  const [gameIsOver,setGameIsOver] = React.useState(true);

  const [fontsLoaded] = useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  let screen =<StartGameScreen onPickNumber={pickedNumberHandler}/>
  //console.log(userNumber)
  if(userNumber){
    screen = <GameScreen gameOverHandler={gameOverHandler} userNumber={userNumber}/>
  }

  if(gameIsOver&&userNumber){
    screen=<GameOverScreen/>
  }

  function gameOverHandler(){
    setGameIsOver(true);
  }

  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent]} style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
          </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.35
  }
});
