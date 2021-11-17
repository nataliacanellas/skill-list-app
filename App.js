import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import image from './images/empty.png'
import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [skill,setSkill]=useState()
  const [skillList,setSkillList]=useState([])
  const [isSelected, setIsSelected]=useState(false)
  function handleAddSkill (){
    if (skill !== '') {
      setSkillList([...skillList,{text:skill, id:skillList.length}])
      setSkill('')
    } else {Alert.alert('Attention','You are trying to add an invalid skill!')}
    
  }
  function handleRemoveSkill (pressedItem){
    setSkillList(skillList.filter((item)=>item.id!==pressedItem.id))

  }
  function handleInput (){
    setIsSelected(true)
  }
  function blurInput () {
    setIsSelected(false)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Natalia</Text>
      <Text style={styles.subtitle}>Good Afternoon</Text>
      <TextInput 
        onBlur={blurInput} 
        onPressIn={handleInput} 
        style={[styles.input, isSelected ? styles.inputSelected : {}]} 
        placeholder='New Skill' 
        onChangeText={setSkill} 
        value={skill} 
        placeholderTextColor='#4A494B'
      />
      <TouchableOpacity style={styles.button} onPress={handleAddSkill}>
        <Text style={styles.buttonText}>Add Skill</Text>
      </TouchableOpacity>
      <Text style={styles.title}>My Skills</Text>
      <FlatList 
        ListEmptyComponent={<View style={styles.emptyView}><Image style={styles.image} source={image} /><Text style={styles.emptyText}>Empty List :(</Text></View>}
        contentContainerStyle={{flexGrow: 1}}
        style={styles.list} data={skillList} 
        renderItem={
          ({item})=>(
          <TouchableOpacity key={item.id} onPress={()=>handleRemoveSkill(item)} style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
          </TouchableOpacity>
        )}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#120F15',
    padding: 30,
  
  },
  title:{
    color:'white',
    fontSize: 28,
    fontWeight: 'bold',

  },
  subtitle:{
    color:'white',
    fontSize: 15,
  },
  input:{
    backgroundColor: '#201E25',
    height: 50,
    width: 350,
    marginTop: 16,
    borderRadius: 8,
    color:'white',
    padding: 16,
  },
  inputSelected:{
    borderColor:'#A370F7',
    borderWidth: 1,
  },
  button:{
    backgroundColor: '#A370F7',
    height: 50,
    width: 350,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color:'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  list:{
    backgroundColor: '#201E25',
    marginTop: 16,
    borderRadius: 8,
    padding: 16,

  },
  item:{
    backgroundColor: '#7953B8',
    height: 50,
    width: 318,
    marginBottom: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText:{
    color:'white',
    fontSize: 15,
  },
  emptyText:{
    color: '#4A494B',
    fontSize: 15,
    
  },
  emptyView:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,

  },
  image:{
    marginTop: -400,
    resizeMode: 'center',
    flex: 1,
  
  }

});
