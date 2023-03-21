import React, { useEffect, useState } from 'react'
import { View ,Text,StyleSheet ,Image, TouchableOpacity} from 'react-native'
import {colors , hr80} from '../globals/style'
import {firebase} from '../firebase/FirebaseConfig'
const WelcomeScreen = ({navigation}) => {
  const [userlogged,setUserlogged]=useState(null)
  useEffect(()=>{
   const checklogin=()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        //console.log(user)
        setUserlogged(user);
      }
      else{
        setUserlogged(null)
        console.log("No user Logged in")
      }
    })
   }
   checklogin()
  },[])
  const handleLogout =()=>{
    firebase.auth().signOut()
    .then(()=>{
      setUserlogged(null)
      console.log("User Logged out")
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to FoodOx</Text>
        <View style={styles.logout}>
        <Image
        style={styles.logo}
        source={require('../assets/foodlogo.jpg')}
      />
        </View>
        <View style={hr80}/>
        <Text style={styles.text}>
         Find the best food around you at lowest price.
        </Text>
        <View style={hr80}/>
        {userlogged == null?
        <View style={styles.btnout}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
             <Text style={styles.btn}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btn}>Log In</Text>
            </TouchableOpacity>
        </View>
        :
        <View style={styles.log}>
          <Text style={styles.txtlog}>Signed in as &nbsp;<Text style={styles.txtlogin}>{userlogged.email}</Text></Text>
            <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
             <Text style={styles.btn}>Go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
            <Text style={styles.btn}>Log Out</Text>
            </TouchableOpacity>
        </View>
        }
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#ff4242',
      width:'100%',
      alignItems:'center',
      justifyContent:'center'
    },
    logout:{
        height:'30%',
        width:'80%',
        backgroundColor:'#fff',
        alignItems:'center'
    },
    title:{
     fontSize:50,
     color:colors.col1,
     textAlign:'center',
     marginVertical:10,
     fontWeight:'200'
    },
    logo:{
        width:'100%',
        height:'100%'
    },
    text:{
        width:'80%',
        fontSize:18,
        color:colors.col1,
        textAlign:'center'
    },
    btnout:{
        flexDirection:'row'
    },
    btn:{
        fontSize:20,
        color:colors.text1,
        textAlign:'center',
        marginVertical:30,
        marginHorizontal:10,
        fontWeight:'700',
        backgroundColor:'#fff',
        borderRadius:10,
        padding:10,
        paddingHorizontal:20
    },
    log:{
      alignItems:'center',
    },
    txtlog:{
      fontSize:18,
      color:colors.col1
    },
    txtlogin:{
      fontSize:19,
      color:colors.col1,
      fontWeight:'bold',
      textDecorationStyle:'solid',
      textDecorationLine:'underline'
    }
  });
export default WelcomeScreen