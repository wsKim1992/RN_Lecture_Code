import React,{useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
  const [enteredGoalText,setEnteredGoalText] = useState('');
  const [courseGoals,setCourseGoals] = useState([]);
  
  function goalInputHandler(enteredText){
    setEnteredGoalText(enteredText);
  } 

  function addGoalHandler(){
    setCourseGoals(prev=>[...prev,enteredGoalText]);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput onChangeText={goalInputHandler} style={styles.textInput} placeholder="Your course goal!"/>
        <Button onPress={addGoalHandler} title="Add Goal"/>
      </View>
      <View>
        {
          
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer:{
    paddingTop:50,
    paddingHorizontal:16,
  },
  inputContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  textInput:{
    borderWidth:1,
    borderWidth:1,
    borderColor:'#ccc',
    width:'70%',
    marginRight:0,
    padding:8 
  }
});
