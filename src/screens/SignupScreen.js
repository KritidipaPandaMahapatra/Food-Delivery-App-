import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {colors, titles, btn1, hr80} from '../globals/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {firebase} from '../firebase/FirebaseConfig';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const SignupScreen = ({navigation}) => {
  const [namefocus, setNamefocus] = useState(false);
  const [phonefocus, setPhonefocus] = useState(false);
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [customerror, setCustomError] = useState('');
  const [successmsg, setSuccessmsg] = useState(null);

  const handleSignup = () => {
    //    const FormData={
    //     name:name,
    //     email:email,
    //     password:password,
    //     //cpassword:cpassword,
    //     phone:phone,
    //     address:address
    //    }
    console.log('FormData-->', FormData);
    if (password != cpassword) {
      setCustomError("Password doesn't match");
      return;
    } else if (phone.length != 10) {
      setCustomError('Phone number should be 10 digit ');
      return;
    }
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          console.log('Usercredentials', userCredentials?.user.uid);
          console.log('User Created');
          if (userCredentials?.user.uid) {
            const userRef = firebase.firestore().collection('UserData');
            userRef
              .add({
                name: name,
                email: email,
                password: password,
                phone: phone,
                address: address,
                uid: userCredentials?.user.uid,
              })
              .then(() => {
                console.log('Data added to firestore');
                setSuccessmsg('User created successfully');
              })
              .catch(error => {
                console.log('Firestore error', error);
                console.log('Firestore ERROR');
              });
          }
        })
        .catch(error => {
          console.log('Sign up firebase error', error.message);
          if (
            error.message ==
            'Firebase: The email address is badly formatted. (auth/invalid-email).'
          ) {
            setCustomError('Invalid Email');
          } else if (
            error.message ==
            'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'
          ) {
            setCustomError('Email already exists');
          } else if (
            error.message ==
            'Firebase: Password should be at least 6 characters (auth/weak-password).'
          ) {
            setCustomError('Password should be at least 6 characters');
            console.log('ERRORRRR');
          } else {
            setCustomError(error.message);
            console.log('Eroooooooooor');
          }
        });
    } catch (error) {
      console.log('sign up system error', error.message);
    }
  };
  async function onGoogleButtonPress() {
    console.log('Google login');
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('GOOGLE ERROR', error);
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        {successmsg == null ? (
          <View style={styles.container}>
            <Text style={styles.head1}>Sign Up</Text>
            {customerror !== '' && (
              <Text style={styles.errormsg}>{customerror}</Text>
            )}
            <View style={styles.inputout}>
              <Feather
                name={'user'}
                size={24}
                color={namefocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={text => setName(text)}
                onFocus={() => {
                  setNamefocus(true);
                  setEmailfocus(false);
                  setPhonefocus(false);
                  setPasswordfocus(false);
                  setShowpassword(false);
                  setCustomError('');
                }}
              />
            </View>
            <View style={styles.inputout}>
              <MaterialCommunityIcons
                name={'email-outline'}
                size={24}
                color={emailfocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                onFocus={() => {
                  setEmailfocus(true);
                  setNamefocus(false);
                  setPhonefocus(false);
                  setPasswordfocus(false);
                  setShowpassword(false);
                  setCustomError('');
                }}
              />
            </View>
            <View style={styles.inputout}>
              <Feather
                name={'smartphone'}
                size={24}
                color={phonefocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={text => setPhone(text)}
                onFocus={() => {
                  setNamefocus(false);
                  setEmailfocus(false);
                  setPhonefocus(true);
                  setPasswordfocus(false);
                  setShowpassword(false);
                  setCustomError('');
                }}
              />
            </View>
            <View style={styles.inputout}>
              <AntDesign
                name={'lock'}
                size={24}
                color={passwordfocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                onFocus={() => {
                  setEmailfocus(false);
                  setPasswordfocus(true);
                  setNamefocus(false);
                  setPhonefocus(false);
                  setCustomError('');
                }}
                secureTextEntry={showpassword === false ? true : false}
              />
              <Octicons
                name={showpassword == false ? 'eye-closed' : 'eye'}
                size={24}
                color="black"
                onPress={() => setShowpassword(!showpassword)}
              />
            </View>
            <View style={styles.inputout}>
              <AntDesign
                name={'lock'}
                size={24}
                color={passwordfocus === true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={text => setCPassword(text)}
                onFocus={() => {
                  setEmailfocus(false);
                  setPasswordfocus(true);
                  setNamefocus(false);
                  setPhonefocus(false);
                  setCustomError('');
                }}
                secureTextEntry={showpassword === false ? true : false}
              />
              <Octicons
                name={showpassword == false ? 'eye-closed' : 'eye'}
                size={24}
                color="black"
                onPress={() => setShowpassword(!showpassword)}
              />
            </View>
            <Text style={styles.text}>Please enter your address</Text>
            <View style={styles.inputout}>
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                onChangeText={text => setAddress(text)}
                onFocus={() => {
                  setEmailfocus(false);
                  setPasswordfocus(false);
                  setShowpassword(false);
                  setNamefocus(false);
                  setPhonefocus(false);
                  setCustomError('');
                }}
              />
            </View>
            <TouchableOpacity style={btn1} onPress={() => handleSignup()}>
              <Text
                style={{
                  color: colors.col1,
                  fontSize: titles.btntxt,
                  fontWeight: 'bold',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
            {Platform.OS == 'android' ? (
              <>
                <Text style={styles.or}>OR</Text>
                <Text style={styles.gftxt}>Sign In With</Text>
                <View style={styles.gf}>
                  <TouchableOpacity
                    onPress={() =>
                      onGoogleButtonPress().then(() =>
                        navigation.navigate('Welcome'),
                      )
                    }>
                    <View style={styles.gficon}>
                      <AntDesign name="google" size={24} color="#EA4335" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.gficon}>
                      <FontAwesome5
                        name="facebook-f"
                        size={24}
                        color="#4267B2"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
            <View style={hr80} />
            {/* <View style={{marginVertical:10}}>
    <Text>Don't have an account?
        <Text style={styles.signup} > Sign Up</Text> 
    </Text>
    </View> */}
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.successmsg}>{successmsg}</Text>
            <TouchableOpacity
              style={btn1}
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: colors.col1,
                  fontSize: titles.btntxt,
                  fontWeight: 'bold',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={btn1} onPress={() => setSuccessmsg(null)}>
              <Text
                style={{
                  color: colors.col1,
                  fontSize: titles.btntxt,
                  fontWeight: 'bold',
                }}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    elevation: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: '80%',
  },
  forgot: {
    color: colors.text2,
    marginTop: 20,
    marginBottom: 10,
  },
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  gftxt: {
    color: colors.text2,
    marginVertical: 10,
    fontSize: 15,
  },
  gf: {
    flexDirection: 'row',
  },
  gficon: {
    backgroundColor: 'white',
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 20,
  },
  signup: {
    color: colors.text1,
  },
  text: {
    color: colors.text2,
    fontSize: 16,
  },
  errormsg: {
    color: colors.text1,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  successmsg: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default SignupScreen;
