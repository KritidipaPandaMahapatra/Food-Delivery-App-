import React, { useState } from 'react'
import { View ,Text,StyleSheet ,TextInput, TouchableOpacity, Platform} from 'react-native'
import {colors, titles ,btn1 ,hr80} from '../globals/style'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {firebase} from '../firebase/FirebaseConfig'
//import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({navigation}) => {
    const [emailfocus,setEmailfocus]=useState(false)
    const [passwordfocus,setPasswordfocus]=useState(false)
    const [showpassword,setShowpassword]=useState(false)
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[customerror,setCustomError]=useState('')
    const handleLogin=()=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((userCredential)=>{
            var user=userCredential.user;
            console.log(user)
            console.log("Logged In Successfully..")
            navigation.navigate('Welcome')
        })
        .catch((error)=>{
            var errormsg=error.message
            console.log(errormsg)
            if(errormsg==='Firebase: The email address is badly formatted. (auth/invalid-email).'){
                setCustomError("Please enter a valid email address")
            }
            else{
                setCustomError('Incorrect email or password')
            }
        })
    }
    async function onGoogleButtonPress() {
        console.log("Google login")
        try{
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
      }catch(error){
   console.log("GOOGLE ERROR",error)
      }}
  return (
    <View style={styles.container}>
    <Text style={styles.head1}>Sign In</Text>
    {customerror !== '' && <Text style={styles.errormsg}>{customerror}</Text>}
    <View style={styles.inputout}>
        <AntDesign name={'user'} size={24} color={emailfocus === true? colors.text1 : colors.text2}/>
        <TextInput style={styles.input} placeholder='Email' 
        onChangeText={(text)=>setEmail(text)}
         onFocus={()=>{setEmailfocus(true)
         setPasswordfocus(false)
         setShowpassword(false)
         setCustomError('')}} />
    </View>
    <View style={styles.inputout}>
    <AntDesign name={'lock'} size={24} color={passwordfocus === true? colors.text1 : colors.text2}/>
        <TextInput style={styles.input} placeholder='Password' 
        onChangeText={(text)=>setPassword(text)}
        onFocus={()=>{setEmailfocus(false)
            setPasswordfocus(true)
            setCustomError('')}} 
            secureTextEntry={showpassword=== false? true : false}/>
     <Octicons name={showpassword== false ? 'eye-closed' : 'eye'} 
     size={24} color='black' onPress={()=>setShowpassword(!showpassword)}/>      
    </View>
    <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
    <Text style={{color:colors.col1,fontSize:titles.btntxt,fontWeight:'bold'}} >Sign in</Text>
    </TouchableOpacity>
    <Text style={styles.forgot}>Forgot Password?</Text>
    { 
    Platform.OS=== 'android' ?(
    <><Text style={styles.or}>OR</Text><Text style={styles.gftxt}>Sign In With</Text><View style={styles.gf}>
                  <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Welcome'))}>
                      <View style={styles.gficon}>
                          <AntDesign name="google" size={24} color='#EA4335' />
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                      <View style={styles.gficon}>
                          <FontAwesome5 name="facebook-f" size={24} color='#4267B2' />
                      </View>
                  </TouchableOpacity>
              </View></>
    ): null}
    <View style={hr80}/>
    <Text>Don't have an account?
        <Text style={styles.signup} onPress={() => navigation.navigate('Signup')}> Sign Up</Text> 
    </Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      width:'100%',
      alignItems:'center',
      justifyContent:'center'
    },
    head1:{
        fontSize:titles.title1,
        color:colors.text1,
        textAlign:'center',
        marginVertical:10
    },
    inputout:{
        flexDirection:'row',
        width:'80%',
        marginVertical:10,
        backgroundColor:colors.col1,
        paddingHorizontal:10,
        paddingVertical:10,
        elevation:20,
        borderRadius:10,
        alignItems:'center'
    },
    input:{
        fontSize:18,
        marginLeft:10,
        width:'80%'
    },
    forgot:{
        color:colors.text2,
        marginTop:20,
        marginBottom:10
    },
    or:{
        color:colors.text1,
        marginVertical:10, 
        fontWeight:'bold'
    },
    gftxt:{
        color:colors.text2,
        marginVertical:10, 
        fontSize:15
    },
    gf:{
        flexDirection:'row'
    },
    gficon:{
        backgroundColor:'white',
        width:50,
        margin:10,
        borderRadius:10,
        padding:10,
        alignItems:'center',
        elevation:20
    },
    signup:{
       color:colors.text1
    },
    errormsg:{
        color:colors.text1,
        fontSize:18,
        textAlign:'center',
        marginTop:10,
        borderColor:colors.text1,
        borderWidth:1,
        borderRadius:10,
        padding:10
    },
  });
  
export default LoginScreen