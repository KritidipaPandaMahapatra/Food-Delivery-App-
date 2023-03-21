import { View, Text ,StatusBar, TextInput,StyleSheet,ScrollView, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../globals/style'
import {firebase} from '../firebase/FirebaseConfig'
import CardSlider from '../components/CardSlider'
import BottomNav from '../components/BottomNav'
//import AntDesign from 'react-native-vector-icons/AntDesign'
const HomeScreen = ({navigation}) => {
  const [foodData,setfoodData]=useState([]);
  const [vegData,setVegData]=useState([]);
  const [nonVegData,setNonVegData]=useState([]);
  const [search,setSearch]=useState('')
  const foodRef=firebase.firestore().collection('FoodData')
  useEffect(()=>{
    foodRef.onSnapshot(snapshot=>{
      setfoodData(snapshot.docs.map(doc=>doc.data()))
    })
  },[])
  useEffect(()=>{
    foodRef.onSnapshot(snapshot=>{
      setVegData(foodData.filter(item=>item.foodtype == 'veg'))
      setNonVegData(foodData.filter(item=>item.foodtype == 'non-veg'))
    })
  },[foodData])
  //console.log("FoodData",foodData);
  return (
    <View style={styles.container}>
        <StatusBar/>
        <HomeHeadNav navigation={navigation}/>
        <View style={styles.bottomnav}>
          <BottomNav navigation={navigation}/>
        </View>
        <ScrollView>
        <View style={styles.searchbox}>
        <AntDesign name="search1" size={24}  style={styles.searchicon}/>
        <TextInput style={styles.textinput} placeholder='Search'
        onChangeText={(text)=>setSearch(text)}/>
        </View>
        {search !='' && 
        <View style={styles.searchouterresult}>
        <Text>Your typed something</Text>
        <FlatList style={styles.searchresultinner}
        data={foodData}
        renderItem={({item})=>{
          if(item.foodname.toLowerCase().includes(search.toLocaleLowerCase())){
           return(
            <View style={styles.searchresult}>
                <AntDesign name="arrowright" size={24} color='#fff'/>
                <Text style={styles.searchresulttext}>{item.foodname}</Text>
            </View>
           )
          }
        }}
        />
        </View>
       }
        <Categories/>
        <OfferSlider/>
        <CardSlider  data={foodData} title={"Today's Special"} navigation={navigation}/>
        <CardSlider  data={nonVegData} title={"NonVeg Love"} navigation={navigation}/>
        <CardSlider  data={vegData} title={"Veg Hunger"} navigation={navigation}/>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.col1,
    //alignItems:'center',
    width:'100%'
  },
  searchbox:{
    flexDirection:'row',
    width:'90%',
    backgroundColor:colors.col1,
    borderRadius:30,
    alignItems:'center',
    padding:8,
    margin:15,
    elevation:10
  },
  textinput:{
    marginLeft:10,
    width:'90%',
    fontSize:18,
    color:colors.text1
  },
  searchicon:{
    color:colors.text1
  },
  searchouterresult:{
    width:'100%',
    marginHorizontal:30,
    //height:'100%',
    backgroundColor:colors.col1
  },
  searchresultinner:{
    width:'100%',
  },
  searchresult:{
    width:'100%',
    flexDirection:'row',
    padding:5,
    alignItems:'center'
  },
  searchresulttext:{
    marginLeft:10,
    fontSize:15,
    color:colors.text1
  },
  bottomnav:{
    position:'absolute',
    bottom:0,
    width:'100%',
    backgroundColor:colors.col1,
    zIndex:20
  }
})