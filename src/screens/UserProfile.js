import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {firebase} from '../firebase/FirebaseConfig'
import {colors, navbtn,navbtnin,navbtnout} from '../globals/style'
import AntDesign from 'react-native-vector-icons/AntDesign';
const UserProfile = ({navigation}) => {
    const [userloggeduid,setUserloggeduid]=useState(null)
    const [UserData,setUserData]=useState(null)
    useEffect(()=>{
        const checklogin=()=>{
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                    setUserloggeduid(user)
                }
                else{
                    setUserloggeduid(null)
                    //navigation.navigate('login')
                    
                }
            })
        }
        checklogin()
    },[])
console.log("userProfile-->",userloggeduid?.uid);
useEffect(()=>{
const getUserdata=async()=>{
    const docRef=firebase.firestore().collection(`UserData`).where('uid','==',userloggeduid?.uid)
    console.log("DocRef--->",docRef)
    const doc = await docRef.get()
    if(!doc.empty){
        doc.forEach((doc)=>{
            console.log(doc.data())
            setUserData(doc.data())
        })
    }
        else {
            console.log("No such data")
      //navigation.navigate('Login')
        }
    }
    getUserdata()
},[userloggeduid])
console.log("UserProfile!!",UserData)
  return (
    <View style={styles.containerout}>
        <TouchableOpacity style={navbtnout} onPress={()=>navigation.navigate('Dashboard')}>
            <View style={navbtn}>
                <AntDesign name={'back'} size={25} style={navbtnin}/>
            </View>
        </TouchableOpacity>
        {UserData==null || UserData==undefined
        ?
        <View style={styles.container}>
        <Text  style={styles.head1}>Profile</Text>
        <View style={styles.containerin}>
        <Text style={styles.head2}>Name:</Text>
        </View>
        </View>
        :
        <View  style={styles.container}>
        <Text  style={styles.head1}>Profile</Text>
        <View style={styles.containerin}>
        <Text style={styles.head2}>Name:
        {UserData?
        <Text style={styles.head2in}>{UserData.name}</Text>
        :'loading'}
        </Text>
        <Text style={styles.head2}>Email:
        {UserData?
        <Text style={styles.head2in}>{UserData.email}</Text>
        :'loading'}
        </Text>
         <Text style={styles.head2}>Phone:
        {UserData?
        <Text style={styles.head2in}>{UserData.phone}</Text>
        :'loading'}
        </Text>
        <Text style={styles.head2}>Address:
        {UserData?
        <Text style={styles.head2in}>{UserData.address}</Text>
        :'loading'}
        </Text>
        </View>
      </View>
      } 
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
    containerout:{
        flex:1,
        backgroundColor:'white',
        width:'100%'
    },
    container:{
        flex:1,
        backgroundColor:'white',
        width:'100%',
        alignItems:'center' 
    },
    head1:{
        fontSize:40,
        fontWeight:'400',
        marginVertical:20,
        color:colors.text1
    },
    containerin:{
        width:'90%',
        alignItems:'center',
        borderWidth:1,
        color:colors.text1,
        borderRadius:10,
        padding:20,
        marginTop:20
    },
    head2:{
        fontSize:20,
        fontWeight:'200',
        marginTop:20
    },
    head2in:{
        fontSize:20,
        fontWeight:'300'
    },
})